import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

/**
 * Reads multiple records from the given table with the given where object.
 *
 * If the table does not exist creates a new custom error.
 *
 * @param {string} table The name of the table to read from.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @param {object} filterBY The object to filter records with like {visibility: "public"}.
 * @param {string[]} [include] - An optional array of fields to include in the response.
 * @param {number} limit An optional limit to the number of records to return.
 * @param {number} page An optional page number to return.
 * @returns {Promise<any>} The result of the query or undefined.
 */
const readRecords = async (
  table: string,
  customErrorMessages: CustomErrorMessage[],
  filterBY: { [key: string]: any },
  include?: string[],
  limit?: number,
  page?: number
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
    //
    const where = { ...filterBY };
    let select;
    let skip;
    let take;
    let query;
    
    // If include is provided, only include the specified fields
    if (include !== undefined && include.length > 0) {
      select = include.reduce((acc, key) => ({ ...acc, [key]: true }), {});
    }

    // If page is provided, only return data for the specified page
    if (page) {
      skip = (page - 1) * limit;
    }

    // If limit is provided, only return the specified number of records
    if (limit) {
      take = limit;
    }

    //construct the query
    query = { where, select, skip, take };
    
    // Attempt to read records from the specified table
    const result = await prisma[table].findMany(query);

    // return the result of the query
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    prismaErrorHandler(error, table, customErrorMessages);
  }
};

export default readRecords;
