import { Prisma } from "@prisma/client";

/**
 * Handles Database specific errors and converts them into an ApiResponse object with an error that contains the error message and reason.
 *
 * @param {any} error The error to be handled.
 * @param {ApiResponse} apiResponse The ApiResponse object to be populated with the error message and reason.
 * @param {string} table The name of the table that the operation was performed on.
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
        espectedFrom: "Prisma",
        message: "UniqueConstraintFailed",
        table: table,
        target: error.meta?.target
      };
      customErrorMessages.push(customError)
    } else if (error.code === "P2025") {
      const customError:CustomErrorMessage = {
        espectedFrom: "Prisma",
        message: "IdentifierNotFound",
        table: table,
        target: id
      };
      customErrorMessages.push(customError)
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    const customError:CustomErrorMessage = {
      espectedFrom: "Prisma",
      message: "ValidationError",
      table: table,
    };
    customErrorMessages.push(customError)
  } else {
    const customError:CustomErrorMessage = {
      espectedFrom: "Prisma",
      message: "UnknownError",
    };
    customErrorMessages.push(customError)
  }}
};

export default prismaErrorHandler;
