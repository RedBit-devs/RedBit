import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const readRecord = async (
    prisma: PrismaClient,
    table: string,
    id: string,
    apiResponse: ApiResponse
  ): Promise<ApiResponse> => {
    let data;
    try {
        data = await prisma[table].findFirst({
            where:{
                id : id
            }
        })
    } catch (error) {
      console.log(error.code)
      if (error instanceof Prisma.PrismaClientValidationError) {
          apiResponse.error = {
            code: "400",
            message: `Something was not in the correct format`,
            errors: [
              {
                domain: "Prisma",
                reason: "ValidationError",
                message: `Something was not in the correct format`,
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
        return apiResponse;
      }
      if (!data) {
        apiResponse.error = {
          code: "400",
          message: `Can't read from ${table} table because the record with  id: ${id} doesn't exist`,
          errors: [
            {
              domain: "Prisma",
              reason: "identifierNotFound",
              message: `Can't read from ${table} table because the record with  id: ${id} doesn't exist`,
            },
          ],
        };
        return apiResponse
      }
    apiResponse.data = {
    fields: prisma[table].fields,
    totalItems: 1,
    items: [data],
  };
    return apiResponse
  }

export default readRecord