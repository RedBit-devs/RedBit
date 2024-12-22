import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const deleteRecord = async <T>(
    prisma: PrismaClient,
    table: string,
    id: T,
    apiResponse: ApiResponse
  ): Promise<ApiResponse> => {
    try {
        await prisma[table].delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        console.log(error)
        
    }
    apiResponse.data = {
        fields: prisma[table].fields,
        totalItems: 1,
        items: [id],
      };
    return apiResponse
  }