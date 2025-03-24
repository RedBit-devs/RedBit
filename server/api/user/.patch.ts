import {
    type CustomErrorMessage,
    errorExpectedFroms,
    errorReasons,
  } from "~/types/customErrorMessage";
import { hashPassword, isEmailValid, isNameValid, isPasswordValid, isUsernameValid, } from "~/shared/utils/userValidation";
import updateRecord from "~/lib/prisma/databaseOperations/updateRecord";
import prisma from "~/lib/prisma";
/*
 * URL template http://localhost:3000/api/user
 * A route to update a user in the database
 */

export default defineEventHandler(async (event) => {
    const customErrorMessages: CustomErrorMessage[] = [];
    const apiResponse = {} as ApiResponse;
   
    apiResponse.context = "User/Patch";
    apiResponse.method = "Patch";
  
    event.context.apiResponse = apiResponse;
  
    // Check if the user is not logged in
    // If so, throw an error
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
    let updateUserData = await readBody(event);
    apiResponse.params = {
      id: userId,
      email: updateUserData.email,
      username: updateUserData.username,
      first_name: updateUserData.first_name,
      last_name: updateUserData.last_name,
      password: updateUserData.password,
      birthdate: updateUserData.birthdate,
      description: updateUserData.description,
      profile_picture: updateUserData.profile_picture
    };
    updateUserData = apiResponse.params

    // Check if the user data is valid and present
    // If not, throw an error
    // if it's not present nothing happens
    if(updateUserData.email && !(await isEmailValid(updateUserData.email))) {
      customErrorMessages.push({
          expectedFrom: errorExpectedFroms.User,
          reason: errorReasons.EmailValidationFailed
      })
    }
    // If the email is valid, set email_verified to false because the user needs to verify their email
    if(updateUserData.email && (await isEmailValid(updateUserData.email))) {
        updateUserData.email_verified = false
    }

    // Check if the username is valid and present
    // If not, throw an error
    // if it's not present nothing happens
    if(updateUserData.username && !(await isUsernameValid(updateUserData.username))) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.UsernameValidationFailed
        })
    }

    // Check if the first name is valid and present
    // If not, throw an error
    // if it's not present nothing happens
    if(updateUserData.first_name && !(await isNameValid(updateUserData.first_name))) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.FirstNameValidationFailed
        })
    }

    // Check if the last name is valid and present
    // If not, throw an error
    // if it's not present nothing happens
    if(updateUserData.last_name && !(await isNameValid(updateUserData.last_name))) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.LastNameValidationFailed
        })
    }

    // Check if the password is valid and present
    // If not, throw an error
    // if it's not present nothing happens
    
    if(updateUserData.password && !(await isPasswordValid(updateUserData.password))) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.PasswordValidationFailed
        })
    }
    updateUserData.password = await hashPassword(updateUserData.password,customErrorMessages);

    // set the api response in the event context so it can be used in the error handler
    event.context.apiResponse = apiResponse;

    // if there are custom error messages, throw an error
    if(customErrorMessages.length > 0) {
        const {errors} = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);  
    }
    
    // update the user data 
    const data: User  = await updateRecord("user", updateUserData, userId,customErrorMessages);  
    data.password = "SuperSecretPassword";
    // if there are custom error messages, throw an error else return the updated user data
    const {errors} = apiResponseHandler(event,customErrorMessages,{totalItems:1,items:[data]});
  
    if (customErrorMessages.length > 0) {
      throw createError(errors);  
    }
    return apiResponse;
});