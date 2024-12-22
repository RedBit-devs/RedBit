import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";
import checkTable from "../utils/databaseTableValidation";

/**
 * Updates a single record in the given table with the given data.
 * @param table The name of the table to update.
 * @param data The data to be used for the update.
 * @param id The id of the record to be updated.
 * @param {ApiResponse} apiResponse The ApiResponse to populate with error or data information.
 * @returns {Promise<ApiResponse>} A Promise that resolves with the ApiResponse that contains the error or data information
 */
const updateRecord = async <T>(
  table: string,
  data: T,
  id: string,
  apiResponse: ApiResponse
): Promise<ApiResponse> => {
  checkTable(table, apiResponse);
  if (apiResponse.error) return apiResponse;
  let dbResponse;
  try {
    dbResponse = await prisma[table].update({
      where: {
        id: id,
      },
      data: data,
    });
  } catch (error) {
    console.log(error.message);
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
    return apiResponse;
  }
  apiResponse.data = {
    fields: prisma[table].fields,
    totalItems: 1,
    items: [dbResponse],
  };
  return apiResponse;
};

export default updateRecord;