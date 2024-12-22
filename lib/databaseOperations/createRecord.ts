import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";
import checkTable from "../utils/databaseTableValidation";

/**
 * Creates a record in the given table with the given data.
 * @param {string} table The name of the table to create the record in
 * @param {T} data The data to create the record with
 * @param {ApiResponse} apiResponse  The ApiResponse to populate with error or data information.
 * @returns {Promise<ApiResponse>} A Promise that resolves with the ApiResponse that contains the error or data information
 */
const createRecord = async <T>(
  table: string,
  data: T,
  apiResponse: ApiResponse
): Promise<ApiResponse> => {
  checkTable(table, apiResponse);
  if (apiResponse.error) return apiResponse;
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
    items: [data],
  };
  return apiResponse;
};

export default createRecord;
