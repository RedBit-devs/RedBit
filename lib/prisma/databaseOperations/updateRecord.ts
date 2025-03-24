import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

/**
 * updates a single record in the specified table with the provided data.
 *
 * If the table does not exist creates a new custom error.
 *
 * @param {string} table The name of the table to update.
 * @param {T} data The data to be used for the update.
 * @param {string} id The id of the record to be updated.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @returns {Promise<any>} The result of the query or undefined.
 */
const updateRecord = async <T>(
  table: string,
  data: T,
  id: string,
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
    // Attempt to update the record with the provided data
    dbResponse = await prisma[table].update({
      where: {
        id: id,
      },
      data: data,
    });
  } catch (error) {
    // Handle any errors that occur during the creation process
    prismaErrorHandler(error, table, customErrorMessages, id);
    return;
  }
  // Return the result of the database operation
  return dbResponse;
};

export default updateRecord;
