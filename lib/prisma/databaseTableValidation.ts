import prisma from "~/lib/prisma";

/**
 * Checks if a table exists in the database.
 *
 * If the table does not exist, an ApiResponse object is populated with an error message and the reason for the failure.
 *
 * @param {string} table - The name of the table to check.
 * @param {ApiResponse} apiResponse - The ApiResponse object to be populated with the error message if any of the checks fail.
 * @returns {Promise<Boolean>} - A promise that resolves to a boolean indicating if the table exists or not.
 */
const checkTable = async (
  table: string,
): Promise<boolean> => {
  let tableExists = true
  if (!prisma[table]) {
    tableExists = false
  }
  return tableExists;
};
export default checkTable;
