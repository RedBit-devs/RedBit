import createRecord from "~/lib/prisma/databaseOperations/createRecord";
import { apiResponseHandler } from "~/server/utils/apiResponseHandler";
import { userValidation, hashPassword } from "~/server/utils/userValidation";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";
import Handlebars from "handlebars";
import fs from 'fs'

export default defineEventHandler(async (event) => {
  const newUser: User = await readBody(event);
  const apiResponse = {} as ApiResponse;
  apiResponse.context = "User/Create";
  apiResponse.method = "PUT";
  apiResponse.params = {
    username: newUser.username,
    email: newUser.email,
    birthdate: newUser.birthdate,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    password: newUser.password,
  };
  const customErrorMessages: CustomErrorMessage[] = [];
  event.context.apiResponse = apiResponse;

  if (!(await userValidation(apiResponse, customErrorMessages))) {
    const {errors} = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);  
  }

  newUser.birthdate = new Date(newUser.birthdate);
  newUser.password = await hashPassword(newUser.password, customErrorMessages);
  
  if (customErrorMessages.length > 0) {
    const {errors} = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);  
  }
  
  const data = await createRecord("user", newUser,customErrorMessages);
  const {errors} = apiResponseHandler(event,customErrorMessages,{totalItems:1,items:[data]});
  
  if (customErrorMessages.length > 0) {
    throw createError(errors);  
  }

    const { sendMail } = useNodeMailer()
    let htmlTeamplate = fs.readFileSync('./server/emailTemplates/layouts/verifyEmail.html', 'utf-8');
    htmlTeamplate = await Handlebars.compile(htmlTeamplate)({ name: `${newUser.first_name} ${newUser.last_name}`,verifyurl: `https://redbit.netlify.app/api/user/verifyEmail?id=${apiResponse.data.items[0].id}&email=${newUser.email}` });
    try {
      sendMail({ subject: `${newUser.first_name} ${newUser.last_name}`, html: htmlTeamplate, to: newUser.email})
    } catch (error) {
      customErrorMessages.push({
        expectedFrom: errorExpectedFroms.Mail,
        reason: errorReasons.FailedToSendEmail,
      })
      const {errors} = apiResponseHandler(event,customErrorMessages);
      throw createError(errors);  
    }
  return apiResponse

});
