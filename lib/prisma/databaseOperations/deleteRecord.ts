import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";

/**
 * Deletes a record in the given table with the given id.
 * @param table The name of the table to delete from.
 * @param id The id of the record to be deleted.
 * @param {ApiResponse} apiResponse The ApiResponse to populate with error or data information.
 * @returns {Promise<void>}
 */
const deleteRecord = async <T>(
  table: string,
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
    dbResponse = await prisma[table].delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return prismaErrorHandler(error, apiResponse, table, id);
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
