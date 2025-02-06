import readRecord from "~/lib/prisma/databaseOperations/readRecord";
import { type CustomErrorMessage, errorExpectedFroms, errorReasons } from "~/types/customErrorMessage";


export default defineEventHandler(async (event) =>{
    const customErrorMessages: CustomErrorMessage[] = [];
    const apiResponse = {} as ApiResponse;
  
    apiResponse.context = "Server/Get";
    apiResponse.method = "GET";
    event.context.apiResponse = apiResponse;

    if (!event.context.auth) {
        customErrorMessages.push(
          {
            expectedFrom: errorExpectedFroms.Server,
            reason: errorReasons.Unauthorized,
          }
        );
        const {errors} = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);  
      }

    let serverId = getRouterParam(event, 'id');
    if(!serverId){
      serverId = ""
    }
    apiResponse.params = {
      id: serverId,
    };
    event.context.apiResponse = apiResponse;

    if (paramsCheck(apiResponse.params)) {
        customErrorMessages.push(
          {
            expectedFrom: errorExpectedFroms.Server,
            reason: errorReasons.MissingParameters,
          }
        );
        const {errors} = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);  
      }
    
      const data = await readRecord("server", serverId, customErrorMessages);
      const {errors} = apiResponseHandler(event, customErrorMessages,data);
    
      if(!data){
        console.log("there")
        customErrorMessages.push(
          {
            expectedFrom: errorExpectedFroms.Prisma,
            reason: errorReasons.NoDatabaseResponse,
          }
        )
        const {errors} = apiResponseHandler(event, customErrorMessages,data);
        throw createError(errors);
      }

      if (customErrorMessages.length > 0) {
        throw createError(errors);
      }


      return apiResponse
})