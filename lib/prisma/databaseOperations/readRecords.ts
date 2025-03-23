import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";


/**
 * Reads multiple records from the given table with the given where object.
 *
 * If the table does not exist creates a new custom error.
 *
 * @param table The name of the table to read from.
 * @param customErrorMessages - An array to collect error messages for any error failures.
 * @param where The object to filter records with like {visibility: "public"}.
 * @param {string[]} [include] - An optional array of fields to include in the response.
 * @param limit An optional limit to the number of records to return.
 * @param page An optional page number to return.
 * @returns {Promise<any>} The result of the query or null.
 */
const readRecords = async (
    table: string,
    customErrorMessages: CustomErrorMessage[],
    filterBY: { [key: string]: any },
    include?: string[],
    limit?: number,
    page?: number
  ): Promise<any> => {
    if (!(await checkTable(table))) {
      const error: CustomErrorMessage = {
        expectedFrom: errorExpectedFroms.Prisma,
        reason: errorReasons.TableNotFound,
        table: table,
      };
      customErrorMessages.push(error);
      return null;
    }
  
    try {
      const where = { ...filterBY };
      let select;
      let skip;
      let take;
      let query;
      if (include !== undefined && include.length > 0) {
        select = include.reduce((acc, key) => ({ ...acc, [key]: true }), {});
      }

      if (page) {
        skip = (page-1) * limit;

      }
      if(limit)
      {
        take = limit;
      }
  
      query = { where, select, skip, take };
      const result = await prisma[table].findMany(query);
  
      return result;
    } catch (error) {
      prismaErrorHandler(error, table, customErrorMessages);
    }
  };

  export default readRecords