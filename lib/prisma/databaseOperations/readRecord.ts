import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

/**
 * Reads a single record from the specified table by its ID.
 *
 * If the table does not exist creates a new custom error.
 *
 * @param {string} table - The name of the table to read from.
 * @param {string} id - The ID of the record to retrieve.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @param {string[]} [include] - An optional array of fields to include in the response.
 * @returns {Promise<any>} The result of the query or undefined.
 */
const readRecord = async (
  table: string,
  id: string,
  customErrorMessages: CustomErrorMessage[],
  include?: string[]
): Promise<any> => {
  // Check if the table exists in the database
  if (!(await checkTable(table))) {
    const error: CustomErrorMessage = {
      expectedFrom: errorExpectedFroms.Prisma,
      reason: errorReasons.TableNotFound,
      table: table,
    };
    customErrorMessages.push(error);
    return;
  }

  try {
    let select;
    const where = { id };

    // If include is provided, only include the specified fields
    if (include !== undefined) {
      select = include.reduce((acc, key) => ({ ...acc, [key]: true }), {});
    }

    const querry = { where, select };

    // Attempt to find the record in the specified table
    const result = await prisma[table].findUnique(querry);

  // return the result of the query
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    prismaErrorHandler(error, table, customErrorMessages);
    return;
  }
};

export default readRecord;
