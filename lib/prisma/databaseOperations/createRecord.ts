import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";

/**
 * Creates a new record in the given table with the given data.
 *
 * If the table does not exist creates a new custom error.
 *
 * @param {string} table - The name of the table to create in.
 * @param {T} data - The data to be used for the create.
 * @param {ApiResponse} apiResponse - The ApiResponse object to be populated with the data information on success.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @returns {Promise<void>}
 */
const createRecord = async <T>(
  table: string,
  data: T,
  apiResponse: ApiResponse,
  customErrorMessages: CustomErrorMessage[]
) => {
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
    dbResponse = await prisma[table].create({
      data: data,
    });
  } catch (error) {
    return prismaErrorHandler(error, table, customErrorMessages);
  }
  apiResponse.data = {
    fields: prisma[table].fields,
    totalItems: 1,
    items: [dbResponse],
  };
  return 
};

export default createRecord;
