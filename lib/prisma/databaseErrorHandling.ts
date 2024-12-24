import { Prisma } from "@prisma/client";
const prismaErrorHandler = async (error: any,apiResponse: ApiResponse,table: string,id?: string) => {
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
              message: "An unexpected error occurred on the server.",
            },
          ],
        };
      }
}

export default prismaErrorHandler