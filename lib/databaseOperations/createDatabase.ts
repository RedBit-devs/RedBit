import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const createRecord = async <T>(
  prisma: PrismaClient,
  table: string,
  data: T,
  apiResponse: ApiResponse
): Promise<ApiResponse> => {
  try {
    await prisma[table].create({
      data: data,
    });
  } catch (error) {
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
      }
    }
    return apiResponse;
  }
  apiResponse.data = {
    fields: prisma[table].fields,
    totalItems: 1,
    items: [data],
  };
  return apiResponse;
};

export default createRecord;

/*
          apiResponse.error =  {
              code: "400",
              message: `Something was not in the correct format`,
              errors: [
                {
                  domain: "Prisma",
                  reason: "Prisma.PrismaClientValidationError",
                  message: `Something was not in the correct format`
                }
              ]
*/
