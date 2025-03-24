import createRecord from "~/lib/prisma/databaseOperations/createRecord";
import { apiResponseHandler } from "~/server/utils/apiResponseHandler";
import { userValidation, hashPassword } from "~/shared/utils/userValidation";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";
import Handlebars from "handlebars";
import fs from 'fs'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const mailConfig = config.mailer;
  const newUser: User = await readBody(event);
  const apiResponse = {} as ApiResponse;
  apiResponse.context = "User/Create";
  apiResponse.method = "PUT";
  const params:User = {
    username: newUser.username,
    email: newUser.email,
    birthdate: newUser.birthdate,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    password: newUser.password,
    profile_picture: newUser.profile_picture
  }
  apiResponse.params = params;
  const customErrorMessages: CustomErrorMessage[] = [];
  event.context.apiResponse = apiResponse;

  if (!(await userValidation(apiResponse, customErrorMessages))) {
    const {errors} = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);  
  }

  newUser.birthdate = new Date(newUser.birthdate);
  newUser.password = await hashPassword(newUser.password, customErrorMessages);
  params.password = "SuperSecretPassword";
  apiResponse.params = params;
  if (customErrorMessages.length > 0) {
    const {errors} = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);  
  }
  
  const data = await createRecord("user", newUser,customErrorMessages);
  const dataWithoutPassword = {...data, password: "SuperSecretPassword"}
  const {errors} = apiResponseHandler(event,customErrorMessages,dataWithoutPassword);
  
  if (customErrorMessages.length > 0) {
    throw createError(errors);  
  }

    let htmlTeamplate = fs.readFileSync('./server/emailTemplates/verifyEmail.html', 'utf-8');
    htmlTeamplate = await Handlebars.compile(htmlTeamplate)({ name: `${newUser.first_name} ${newUser.last_name}`,verifyurl: `https://redbit.netlify.app/api/user/verifyEmail?id=${apiResponse.data.items[0].id}&email=${newUser.email}` });
    try {      

        await mailConfig.sendMail({
          to: newUser.email,
          subject: `${newUser.first_name} ${newUser.last_name} verify your email`,
          html: htmlTeamplate,
        })

    } catch (error) {
      
    }
  return apiResponse

});
