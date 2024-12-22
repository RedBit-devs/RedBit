import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const readRecord = async (
    prisma: PrismaClient,
    table: string,
    id: string,
    apiResponse: ApiResponse
  ): Promise<ApiResponse> => {
    let data;
    try {
        data = await prisma[table].findFirst({
            where:{
                id : id
            }
        })
        console.log(data)
    } catch (error) {
        return apiResponse
    }
    apiResponse.data = {
    fields: prisma[table].fields,
    totalItems: 1,
    items: [data],
  };
    return apiResponse
  }

export default readRecord