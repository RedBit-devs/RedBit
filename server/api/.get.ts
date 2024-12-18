export default defineEventHandler((event) => {
    
    const response: ApiResponse = {
        //ezeket lehet át kellene majd dobni middleware re a context-el együtt
        method: `${event.path.replace(/\//g,".")}${event.method}`,
        params: getRouterParams(event),

        
        data:{
            totalItems: 1,
            items: [
                "Hi mom"
            ]
        },
    }
    
    setResponseStatus(event, 418)
    return response

  })