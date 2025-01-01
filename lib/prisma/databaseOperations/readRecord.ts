import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";

/**
 * Read a single record in the given table with the given id.
 * 
 * If the table does not exist creates a new custom error.
 * 
 * @param table The name of the table to update.
 * @param id The id of the record to be updated.
 * @param {ApiResponse} apiResponse - The ApiResponse object to be populated with the data information on success.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @returns {Promise<void>}
 */
const readRecord = async (
  table: string,
  id: string,
  apiResponse: ApiResponse,
  customErrorMessages: CustomErrorMessage[]
) => {
  if (!(await checkTable(table))){
    const error:CustomErrorMessage = {
      espectedFrom: "Prisma",
      message: "TableNotFound",
      table: table
    };
    customErrorMessages.push(error)
    return
  }
  let dbResponse;
  try {
    dbResponse = await prisma[table].findFirst({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return prismaErrorHandler(error, table, customErrorMessages,id);
  }
  if (!dbResponse) {
    const customError:CustomErrorMessage = {
      espectedFrom: "Prisma",
      message: "IdentifierNotFound",
      table: table,
      target: id
    };
    customErrorMessages.push(customError)
    return ;
  }
  apiResponse.data = {
    fields: prisma[table].fields,
    totalItems: 1,
    items: [dbResponse],
  };
  return ;
};

export default readRecord;
