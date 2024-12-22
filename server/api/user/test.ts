import prisma from "~/lib/prisma";
import deleteRecord from "~/lib/databaseOperations/deleteDatabase";
import readRecord from "~/lib/databaseOperations/readDatabase";

export default defineEventHandler(async (event) => {
  const apiResponse = {} as ApiResponse
  const apiResponse2 = await readRecord(prisma, 'User', "cm4zmjxrn00011kry4251ckwy", apiResponse)
  return apiResponse2
})
