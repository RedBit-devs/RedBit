import prisma from "~/lib/prisma";

/**
 * Checks if a table exists in the database.
 *
 * If the table does not exist, an ApiResponse object is populated with an error message and the reason for the failure.
 *
 * @param {string} table - The name of the table to check.
 * @param {ApiResponse} apiResponse - The ApiResponse object to be populated with the error message if any of the checks fail.
 * @returns {Promise<ApiResponse>} - A promise that resolves with the ApiResponse that contains the error message if any of the checks fail.
 */
const checkTable = async (
  table: string,
  apiResponse: ApiResponse
): Promise<boolean> => {
  let tableExists = true
  if (!prisma[table]) {
    tableExists = false
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
    return tableExists;
  }
};
export default checkTable;
