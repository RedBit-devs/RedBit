import prisma from "~/lib/prisma";
const checkTable = async (
  table: string,
  apiResponse: ApiResponse
): Promise<ApiResponse> => {
  if (!prisma[table]) {
    console.log(prisma[table]);
    apiResponse.error = {
      code: "400",
      message: `Can't read from the ${table} table because it doesn't exist`,
      errors: [
        {
          domain: "Prisma",
          reason: "TableNotFound",
          message: `Can't read from the ${table} table because it doesn't exist`,
        },
      ],
    };
    return apiResponse;
  }
};
export default checkTable;
