import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client"


const createRecord = async <T>(prisma: PrismaClient, table: string, data: T): Promise<boolean> => {
    const response = {} as ApiResponse
    try {
        await prisma[table].create({
            data: data
        })
    } catch (error) {
    }

    return true
}

export default createRecord

/*
          apiResponse.error =  {
              code: "400",
              message: `Something was not in the correct format`,
              errors: [
                {
                  domain: "Prisma",
                  reason: "Prisma.PrismaClientValidationError",
                  message: `Something was not in the correct format`
                }
              ]
*/