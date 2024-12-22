import { PrismaClient } from "@prisma/client";
const checkTable = async (
  prisma: PrismaClient,
  table: string,
  apiResponse: ApiResponse
): Promise<ApiResponse> => {
    if (!prisma[table]) {
        console.log(prisma[table])
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
}
export default checkTable