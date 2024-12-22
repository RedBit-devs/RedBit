import prisma from "~/lib/prisma";
import deleteRecord from "~/lib/databaseOperations/deleteDatabase";
import readRecord from "~/lib/databaseOperations/readDatabase";

export default defineEventHandler(async (event) => {
  const apiResponse = {} as ApiResponse
  const apiResponse2 = await deleteRecord(prisma, 'User', "cm4u7nsoh0000ix93uxobvnx3", apiResponse)
  return apiResponse2
})
