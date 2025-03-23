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
 * @param customErrorMessages - An array to collect error messages for any error failures.
 * @param {string[]} [include] - An optional array of fields to include in the response.
 * @returns {Promise<any>} The result of the query or null.
 */

const readRecord = async (
  table: string,
  id: string,
  customErrorMessages: CustomErrorMessage[],
  include?: string[]
): Promise<any> => {
  if (!(await checkTable(table))) {
    const error: CustomErrorMessage = {
      expectedFrom: errorExpectedFroms.Prisma,
      reason: errorReasons.TableNotFound,
      table: table,
    };
    customErrorMessages.push(error);
    return null;
  }

  try {
    let select:{ select: { [key: string]: boolean } };
    const filter = { where: { id } };


    if (include !== undefined) {
      select = {select: {}}
      select.select =   include.reduce((acc, key) => ({ ...acc, [key]: true }), {});
    }


    const querry = {...filter,...select};

    const result = await prisma[table].findUnique(
      querry
    );

    return result;
  } catch (error) {
    prismaErrorHandler(error,table, customErrorMessages);
    return null;
  }
};

export default readRecord;
