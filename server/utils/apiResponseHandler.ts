

const ApiResponseHandler = (event: any, customErrorMessages: Error[]) => {
  const apiResponse = event.context.apiResponse;
  apiResponse.error = {
    
  }
  if (customErrorMessages.length == 0) 
  {
    return
  }
  if (customErrorMessages[0].name.startsWith("Prisma")) {
    //future prisma api response handling
  }else if(customErrorMessages[0].name.startsWith("User")){

  } else{
    apiResponse.error = {
      code: "500",
      message: `An unknown error occurred`,
      errors: [
        {
          domain: event.context.apiResponse.context,
          reason: "UnknownError",
          message: "An unknown error occurred",
        },
      ],
    };
  }
  event.context.apiResponse = apiResponse
}

export {
    ApiResponseHandler
}