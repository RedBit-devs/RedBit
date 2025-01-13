import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

/**
 * Creates a new record in the given table with the given data.
 *
 * If the table does not exist creates a new custom error.
 *
 * @param {string} table - The name of the table to create in.
 * @param {T} data - The data to be used for the create.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @returns {Promise<any>}
 */
const createRecord = async <T>(
  table: string,
  data: T,
  customErrorMessages: CustomErrorMessage[]
): Promise<any> => {
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
    dbResponse = await prisma[table].create({
      data: data,
    });
  } catch (error) {
    prismaErrorHandler(error, table, customErrorMessages);
    return;
  }
  return dbResponse;
};

export default createRecord;
