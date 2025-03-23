import prisma from "~/lib/prisma";
import checkTable from "../databaseTableValidation";
import prismaErrorHandler from "../databaseErrorHandling";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";



const readRecords = async (
    table: string,
    customErrorMessages: CustomErrorMessage[],
    where: { [key: string]: any },
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
      const filter = { where: { ...where } };
      let select;
      let skip;
      let take;
      let query;
      if (include !== undefined && include.length > 0) {
        select = { select:  include.reduce((acc, key) => ({ ...acc, [key]: true }), {}) };
      }

      if (page) {
        skip = {skip: (page-1) * limit};

      }
      if(limit)
      {
        take = {take: limit};
      }
  
      query = { ...filter, ...select, ...skip, ...take };
      const result = await prisma[table].findMany(query);
  
      return result;
    } catch (error) {
      prismaErrorHandler(error, table, customErrorMessages);
    }
  };

  export default readRecords