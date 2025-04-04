import createRecord from "~/lib/prisma/databaseOperations/createRecord";
import { apiResponseHandler } from "~/server/utils/apiResponseHandler";
import { userValidation, hashPassword } from "~/shared/utils/userValidation";
import {
  type CustomErrorMessage,
} from "~/types/customErrorMessage";
import nodemailer from "nodemailer";
import * as fs from 'fs/promises';
export default defineEventHandler(async (event) => {
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

  try {
    const config = useRuntimeConfig();
    const mailerConfig = config.mailer;

    const transporter = nodemailer.createTransport(mailerConfig);
    const filePath = "server/emailTemplates/verifyEmail.html"
    const html = await fs.readFile(filePath, 'utf-8')
    await transporter.sendMail({
      from: process.env.MAILER_EMAIL,
      to: newUser.email,
      subject: "Account Creation",
      html: html.replace("{{name}}", `${newUser.first_name} ${newUser.last_name}`).replace("{{verifyurl}}", `https://redbit.netlify.app/verifyemail?email=${newUser.email}&id=${data.id}` )
    })
  } catch (error) {
    
  }
  return apiResponse

});
