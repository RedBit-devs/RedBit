import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";

/**
 * Deletes a single record in the given table with the given id.
 * @param table The name of the table to update.
 * @param id The id of the record to be updated.
 * @param {ApiResponse} apiResponse The ApiResponse to populate with error or data information.
 * @returns {Promise<ApiResponse>} A Promise that resolves with the ApiResponse that contains the error or data information
 */
const deleteRecord = async <T>(
  table: string,
  id: string,
  apiResponse: ApiResponse
) => {
  if ((await checkTable(table, apiResponse))) return 
  let dbResponse;
  try {
    dbResponse = await prisma[table].delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    prismaErrorHandler(error, apiResponse, table, id);
    return ;
  }
  apiResponse.data = {
    deleted: true,
    fields: prisma[table].fields,
    totalItems: 1,
    items: [dbResponse],
  };
  return ;
};

export default deleteRecord;
