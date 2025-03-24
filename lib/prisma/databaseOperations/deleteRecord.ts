import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

/**
 * Deletes a single record from the specified table with the provided ID.
 *
 * If the table does not exist creates a new custom error.
 *
 * @param {string} table The name of the table to delete from.
 * @param {string} id The id of the record to be deleted.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @returns {Promise<any>}
 */
const deleteRecord = async <T>(
  table: string,
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
    // Attempt to delete the record with the provided ID
    dbResponse = await prisma[table].delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    // Handle any errors that occur during the creation process
    prismaErrorHandler(error, table, customErrorMessages, id);
    return;
  }

  // return the result of the query
  return dbResponse;
};

export default deleteRecord;
