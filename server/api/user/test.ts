import updateRecord from "~/lib/prisma/databaseOperations/updateRecord"
export default defineEventHandler(async (event) => {
  const user = await readBody(event)
  const apiResponse = {} as ApiResponse

  await updateRecord("user", user, user.id, apiResponse);
})
