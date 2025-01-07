import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";

/**
 * Deletes a record in the given table with the given id.
 * 
 * If the table does not exist creates a new custom error.
 * 
 * @param table The name of the table to delete from.
 * @param id The id of the record to be deleted.
 * @param {ApiResponse} apiResponse - The ApiResponse object to be populated with the data information on success.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @returns {Promise<any>}
 */
const deleteRecord = async <T>(
  table: string,
  id: string,
  customErrorMessages: CustomErrorMessage[]
): Promise<any> => {
  if (!(await checkTable(table))){
    const error:CustomErrorMessage = {
      espectedFrom: "Prisma",
      reason: "TableNotFound",
      table: table
    };
    customErrorMessages.push(error)
    return
  }
  let dbResponse;
  try {
    dbResponse = await prisma[table].delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    prismaErrorHandler(error, table, customErrorMessages,id);
    return
  }
  return dbResponse
};

export default deleteRecord;
