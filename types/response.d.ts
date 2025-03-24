type CustomError = {
  domain: String; // Unique identifier for the service raising this error.
  reason: String; // {"reason": "ResourceNotFoundException"} Unique identifier for this error. Different from the error.code property in that this is not an http response code.
  message: string; // Human readable message
};

type ResponseData = {
  fields?: Object; // like primsma.[table].fields
  deleted?: boolean;
  updated?: Date;
  totalItems: Number; // items.length
  itemsPerPage?: Number;
  pageIndex?: Number;
  nextLink?: String;
  previousLink?: String;
  items: any[];
};

type ApiResponse =
  {
    context?: string;
    method?: string;
    params?: Object;
    data: ResponseData
  };
