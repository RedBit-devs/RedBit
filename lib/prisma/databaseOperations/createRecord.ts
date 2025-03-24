import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";


/**
 * Creates a new record in the specified table with the provided data.
 *
 * If the table does not exist, it creates a new custom error.
 *
 * @param {string} table The name of the table to create the record in.
 * @param {T} data The data to be used for creating the record.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @returns {Promise<any>} The result of the query or undefined.
 */
const createRecord = async <T>(
  table: string,
  data: T,
  customErrorMessages: CustomErrorMessage[]
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
  let dbResponse;
  try {
    // Attempt to create a new record in the specified table
    dbResponse = await prisma[table].create({
      data: data,
    });
  } catch (error) {
    // Handle any errors that occur during the creation process
    prismaErrorHandler(error, table, customErrorMessages);
    return;
  }
  // Return the result of the database operation
  return dbResponse;
};

export default createRecord;
