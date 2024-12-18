type Error = {
    domain: String; // Unique identifier for the service raising this error. 
    reason: String; // {"reason": "ResourceNotFoundException"} Unique identifier for this error. Different from the error.code property in that this is not an http response code.
    message: String // Human readable message
}

type ApiResponse = {
    context?: string;
    method?: string;
    params?: Object;
    data: {
        fields?: Object;            // like primsma.[table].fields
        deleted?: boolean;
        updated?: Date;
        totalItems: Number;         //allData.length
        currentItemCount?: Number;   //items.length
        itemsPerPage?: Number;
        pageIndex?: Number;
        totalPages?: Number;
        nextLink?: String;
        previousLink?: String;
        items: Array?;
    }
    error?: never;
} | {
    context?: string;
    method?: string;
    params?: Object;
    error: {
        code: Number;
        message: String; //A human readable message providing more details about the error. If there are multiple errors, message will be the message for the first error.
        errors?: Error[]
    };
    data?: never;
}