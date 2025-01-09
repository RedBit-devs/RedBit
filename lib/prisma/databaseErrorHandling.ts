import { Prisma } from "@prisma/client";

/**
 * Handles Prisma errors and converts them into custom error messages that can be
 * processed by the API response handler.
 * 
 * @param {any} error The error to be handled.
 * @param {string} table The name of the table that the operation was performed on.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @param {string} [id] The id of the record that the operation was performed on.
 * @returns {Promise<void>}
 */
const prismaErrorHandler = async (
  error: any,
  table: string,
  customErrorMessages: CustomErrorMessage[],
  id?: string,
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const customError:CustomErrorMessage = {
        expectedFrom: "Prisma",
        reason: "UniqueConstraintFailed",
        table: table,
        target: error.meta?.target
      };
      customErrorMessages.push(customError)
    } else if (error.code === "P2025") {
      const customError:CustomErrorMessage = {
        expectedFrom: "Prisma",
        reason: "IdentifierNotFound",
        table: table,
        target: id
      };
      customErrorMessages.push(customError)
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    const customError:CustomErrorMessage = {
      expectedFrom: "Prisma",
      reason: "ValidationError",
      table: table,
    };
    customErrorMessages.push(customError)
  } else {
    const customError:CustomErrorMessage = {
      expectedFrom: "Prisma",
      reason: "UnknownError",
    };
    customErrorMessages.push(customError)
  }}
};

export default prismaErrorHandler;
