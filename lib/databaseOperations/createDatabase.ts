import prisma from "~/lib/prisma";
import { Prisma } from "@prisma/client";
import type { Type } from "typescript";
const createDatabaseOperation = async (newCreate: Type): Promise<ApiResponse> =>{
    const apiResponse = {} as ApiResponse
    try {
        prisma
        
    } catch (error) {
        
    }

    return apiResponse;
}


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