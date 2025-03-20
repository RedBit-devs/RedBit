import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

/**
 * Read a single record in the given table with the given id.
 *
 * If the table does not exist creates a new custom error.
 *
 * @param table The name of the table to update.
 * @param id The id of the record to be updated.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @returns {Promise<any>}
 */


const readRecord = async (
  table: string,
  id: string,
  customErrorMessages: CustomErrorMessage[],
  tableData?: TableData,
  include?: string[]
): Promise<any> => {
  if (!(await checkTable(tableData.tableName))) {
    const error: CustomErrorMessage = {
      expectedFrom: errorExpectedFroms.Prisma,
      reason: errorReasons.TableNotFound,
      table: tableData.tableName,
    };
    customErrorMessages.push(error);
    return null;
  }

  try {
    let select:{ select: { [key: string]: boolean } };
    const filter = { where: { [tableData.idCloumnName]: tableData.id } };


    if (include !== undefined) {
      select = {select: {}}
      select.select =   include.reduce((acc, key) => ({ ...acc, [key]: true }), {});
    }


    const querry = {...filter,...select};

    const result = await prisma[tableData.tableName].findUnique(
      querry
    );

    return result;
  } catch (error) {
    console.log(error)
    prismaErrorHandler(error,tableData.tableName, customErrorMessages);
    return null;
  }
};

export default readRecord;
