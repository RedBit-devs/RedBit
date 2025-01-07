export default defineEventHandler(async (event) => {
    
    const { userId, email } = getQuery(event)
    
    const apiResponse = {} as ApiResponse;
    apiResponse.context = "UserCreate";
    apiResponse.method = "GET";
    
    //dont know if i should use the params in this case
    apiResponse.params = {
        userId,
        email
    };
    
    return "Hello people"
})