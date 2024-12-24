import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";

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
) => {
  checkTable(table, apiResponse);
  if (apiResponse.error) return 
  let dbResponse;
  try {
    dbResponse = await prisma[table].create({
      data: data,
    });
  } catch (error) {
    prismaErrorHandler(error, apiResponse, table);
    return 
  }
  apiResponse.data = {
    fields: prisma[table].fields,
    totalItems: 1,
    items: [dbResponse],
  };
  return 
};

export default createRecord;
