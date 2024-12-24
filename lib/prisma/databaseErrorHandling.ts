import { Prisma } from "@prisma/client";

/**
 * Handles Database specific errors and converts them into an ApiResponse object with an error that contains the error message and reason.
 *
 * @param {any} error The error to be handled.
 * @param {ApiResponse} apiResponse The ApiResponse object to be populated with the error message and reason.
 * @param {string} table The name of the table that the operation was performed on.
 * @param {string} [id] The id of the record that the operation was performed on.
 * @param {boolean} isTableExist - If the table exists or not. 
 * @returns {Promise<void>}
 */
const prismaErrorHandler = async (
  error: any,
  apiResponse: ApiResponse,
  table: string,
  id?: string,
  isTableExist?: boolean
) => {
  if(isTableExist == false)
  {
    apiResponse.error = {
      code: "400",
      message: `Can't read from the ${table} table because it doesn't exist`,
      errors: [
        {
          domain: "Prisma",
          reason: "TableNotFound",
          message: `Can't read from the ${table} table because it doesn't exist`,
        },
      ],
    };
    return
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      apiResponse.error = {
        code: "400",
        message: `The unique constraint failed on the ${table} table with the following values: ${error.meta?.target}`,
        errors: [
          {
            domain: "Prisma",
            reason: "UniqueConstraintFailed",
            message: `The unique constraint failed on the ${table} table with the following values: ${error.meta?.target}`,
          },
        ],
      };
    } else if (error.code === "P2025") {
      apiResponse.error = {
        code: "400",
        message: `Oparation failed on ${table} table because the record with  id: ${id} doesn't exist`,
        errors: [
          {
            domain: "Prisma",
            reason: "identifierNotFound",
            message: `Oparation failed on ${table} table because the record with  id: ${id} doesn't exist`,
          },
        ],
      };
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    apiResponse.error = {
      code: "400",
      message: `Something was not in the correct format`,
      errors: [
        {
          domain: "Prisma",
          reason: "ValidationError",
          message: `Something was not in the correct format ${error.cause}`,
        },
      ],
    };
  } else {
    apiResponse.error = {
      code: "500",
      message: `An unknown error occurred: ${error.message}`,
      errors: [
        {
          domain: "Prisma",
          reason: "UnknownError",
          message: "An unknown error occurred",
        },
      ],
    };
  }
};

export default prismaErrorHandler;
