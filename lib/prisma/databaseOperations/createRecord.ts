import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";

/**
 * Creates a new record in the given table with the given data.
 *
 * If the table does not exist, an ApiResponse object is populated with an error message and the reason for the failure.
 *
 * @param {string} table - The name of the table to create in.
 * @param {T} data - The data to be used for the create.
 * @param {ApiResponse} apiResponse - The ApiResponse object to be populated with the error message if any of the checks fail.
 * @returns {Promise<void>}
 */
const createRecord = async <T>(
  table: string,
  data: T,
  apiResponse: ApiResponse
) => {
  if (!(await checkTable(table))){
    let error = new Error();
    error.name = "no table";
    return prismaErrorHandler(error, apiResponse, table);
  }
  let dbResponse;
  try {
    dbResponse = await prisma[table].create({
      data: data,
    });
  } catch (error) {
    return prismaErrorHandler(error, apiResponse, table);
  }
  apiResponse.data = {
    fields: prisma[table].fields,
    totalItems: 1,
    items: [dbResponse],
  };
  return 
};

export default createRecord;
