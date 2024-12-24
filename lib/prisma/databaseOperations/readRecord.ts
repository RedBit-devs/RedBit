import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";

/**
 * Read a single record in the given table with the given id.
 * @param table The name of the table to update.
 * @param id The id of the record to be updated.
 * @param {ApiResponse} apiResponse The ApiResponse to populate with error or data information.
 * @returns {Promise<ApiResponse>} A Promise that resolves with the ApiResponse that contains the error or data information
 */
const readRecord = async (
  table: string,
  id: string,
  apiResponse: ApiResponse
): Promise<ApiResponse> => {
  checkTable(table, apiResponse);
  if (apiResponse.error) return apiResponse;
  let dbResponse;
  try {
    dbResponse = await prisma[table].findFirst({
      where: {
        id: id,
      },
    });
  } catch (error) {
    prismaErrorHandler(error, apiResponse, table, id);
    return apiResponse;
  }
  if (!dbResponse) {
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
    return apiResponse;
  }
  apiResponse.data = {
    fields: prisma[table].fields,
    totalItems: 1,
    items: [dbResponse],
  };
  return apiResponse;
};

export default readRecord;
