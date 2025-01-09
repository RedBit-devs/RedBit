import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";

/**
 * Updates a single record in the given table with the given data.
 * 
 * If the table does not exist creates a new custom error.
 * 
 * @param table The name of the table to update.
 * @param data The data to be used for the update.
 * @param id The id of the record to be updated.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @returns {Promise<any>}
 */
const updateRecord = async <T>(
  table: string,
  data: T,
  id: string,
  customErrorMessages: CustomErrorMessage[]
): Promise<any> => {
  if (!(await checkTable(table))){
    const error:CustomErrorMessage = {
      expectedFrom: "Prisma",
      reason: "TableNotFound",
      table: table
    };
    customErrorMessages.push(error)
    return
  }
  let dbResponse;
  try {
    dbResponse = await prisma[table].update({
      where: {
        id: id,
      },
      data: data,
    });
  } catch (error) {
    prismaErrorHandler(error, table, customErrorMessages,id);
    return
  }
  return dbResponse
};

export default updateRecord;
