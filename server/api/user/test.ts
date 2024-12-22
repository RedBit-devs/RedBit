import prisma from "~/lib/prisma";
import deleteRecord from "~/lib/databaseOperations/deleteDatabase";
import readRecord from "~/lib/databaseOperations/readDatabase";
import updateRecord from "~/lib/databaseOperations/updateDatabase";

export default defineEventHandler(async (event) => {
  const apiResponse = {} as ApiResponse
  const user = await readBody(event) as User
  const apiResponse2 = await updateRecord(prisma, 'User', user,"cm4zmliib0001zov733twcpbk", apiResponse)
  return apiResponse2
})
