import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";

/**
 * Updates a single record in the given table with the given data.
 * @param table The name of the table to update.
 * @param data The data to be used for the update.
 * @param id The id of the record to be updated.
 * @param {ApiResponse} apiResponse The ApiResponse to populate with error or data information.
 * @returns {Promise<void>}
 */
const updateRecord = async <T>(
  table: string,
  data: T,
  id: string,
  apiResponse: ApiResponse
) => {
  if (!(await checkTable(table))){
    let error = new Error();
    error.name = "no table";
    return prismaErrorHandler(error, apiResponse, table);
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
    return prismaErrorHandler(error, apiResponse, table, id);
  }
  apiResponse.data = {
    fields: prisma[table].fields,
    totalItems: 1,
    items: [dbResponse],
  };
  return ;
};

export default updateRecord;
