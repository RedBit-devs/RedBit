import {
    type CustomErrorMessage,
    errorExpectedFroms,
    errorReasons,
  } from "~/types/customErrorMessage";
import { isEmailValid, isNameValid, isPasswordValid, isUsernameValid, } from "~/shared/utils/userValidation";
import updateRecord from "~/lib/prisma/databaseOperations/updateRecord";

export default defineEventHandler(async (event) => {
    const customErrorMessages: CustomErrorMessage[] = [];
    const apiResponse = {} as ApiResponse;
   
    apiResponse.context = "User/Patch";
    apiResponse.method = "Patch";
  
    event.context.apiResponse = apiResponse;
  
    if (!event.context.auth) {
      customErrorMessages.push(
        {
          expectedFrom: errorExpectedFroms.User,
          reason: errorReasons.Unauthorized,
        }
      );
      const {errors} = apiResponseHandler(event, customErrorMessages);
      throw createError(errors);  
    }
  
    const userId = event.context.auth.user.id;
    const updateUserData: User = await readBody(event);
    apiResponse.params = {
      id: userId,
      email: updateUserData.email,
      username: updateUserData.username,
      first_name: updateUserData.first_name,
      last_name: updateUserData.last_name,
      password: "SuperSecretPassword",
      birthdate: updateUserData.birthdate,
      description: updateUserData.description,
      profile_picture: updateUserData.profile_picture
    };
    if(updateUserData.email && !(await isEmailValid(updateUserData.email))) {
      customErrorMessages.push({
          expectedFrom: errorExpectedFroms.User,
          reason: errorReasons.EmailValidationFailed
      })
    }
    if(updateUserData.email && (await isEmailValid(updateUserData.email)))
    {
      apiResponse.params = {
        ...apiResponse.params,
        email_verified: false
      }
    }
    event.context.apiResponse = apiResponse;

    if(updateUserData.username && !(await isUsernameValid(updateUserData.username))) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.UsernameValidationFailed
        })
    }
    if(updateUserData.first_name && !(await isNameValid(updateUserData.first_name))) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.FirstNameValidationFailed
        })
    }
    if(updateUserData.last_name && !(await isNameValid(updateUserData.last_name))) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.LastNameValidationFailed
        })
    }
    if(updateUserData.password && !(await isPasswordValid(updateUserData.password))) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.PasswordValidationFailed
        })
    }

    if(customErrorMessages.length > 0) {
        const {errors} = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);  
    }
      
    const data = await updateRecord("user", apiResponse.params, event.context.auth.user.id,customErrorMessages);

    const {errors} = apiResponseHandler(event,customErrorMessages,data);
  
    if (customErrorMessages.length > 0) {
      throw createError(errors);  
    }
    return apiResponse;
});