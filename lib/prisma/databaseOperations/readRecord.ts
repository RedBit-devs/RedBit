import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";

/**
 * Read a single record in the given table with the given id.
 * @param table The name of the table to update.
 * @param id The id of the record to be updated.
 * @param {ApiResponse} apiResponse The ApiResponse to populate with error or data information.
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
    apiResponse.error = {
      code: "400",
      message: `Can't read from ${table} table because the record with  id: ${id} doesn't exist`,
      errors: [
        {
          domain: "Prisma",
          reason: "identifierNotFound",
          message: `Can't read from ${table} table because the record with  id: ${id} doesn't exist`,
        },
      ],
    };
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
