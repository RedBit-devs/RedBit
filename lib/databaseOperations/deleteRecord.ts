import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import checkTable from "../utils/databaseTableValidation";

/**
 * Deletes a single record in the given table with the given id.
 * @param prisma The instance of the Prisma Client.
 * @param table The name of the table to update.
 * @param id The id of the record to be updated.
 * @param {ApiResponse} apiResponse The ApiResponse to populate with error or data information.
 * @returns {Promise<ApiResponse>} A Promise that resolves with the ApiResponse that contains the error or data information
 */
const deleteRecord = async <T>(
  prisma: PrismaClient,
  table: string,
  id: String,
  apiResponse: ApiResponse
): Promise<ApiResponse> => {
  checkTable(prisma, table, apiResponse);
  if (apiResponse.error) return apiResponse;
  try {
    await prisma[table].delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        apiResponse.error = {
          code: "400",
          message: `Can't delete from ${table} table because the record with  id: ${id} doesn't exist`,
          errors: [
            {
              domain: "Prisma",
              reason: "identifierNotFound",
              message: `Can't delete from ${table} table because the record with  id: ${id} doesn't exist`,
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
  apiResponse.data = {
    deleted: true,
    fields: prisma[table].fields,
    totalItems: 1,
    items: [id],
  };
  return apiResponse;
};

export default deleteRecord;
