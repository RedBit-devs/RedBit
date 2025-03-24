import { Prisma } from "@prisma/client";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

/**
 * Handles Prisma errors and converts them into custom error messages that can be
 * processed by the API response handler.
 *
 * @param {any} error The error to be handled.
 * @param {string} table The name of the table that the operation was performed on.
 * @param {CustomErrorMessage[]} customErrorMessages - An array to collect error messages for any error failures.
 * @param {string} [id] The id of the record that the operation was performed on.
 * @returns {Promise<void>} returns nothing
 */
const prismaErrorHandler = async (
  error: any,
  table: string,
  customErrorMessages: CustomErrorMessage[],
  id?: string
) => {
  // Check if the error is a Prisma error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      // Handle unique constraint failure
      const customError: CustomErrorMessage = {
        expectedFrom: errorExpectedFroms.Prisma,
        reason: errorReasons.UniqueConstraintFailed,
        table: table,
        target: error.meta?.target,
      };
      customErrorMessages.push(customError);
    }
    else if (error.code === "P2025") {
      // Handle identifier not found
      const customError: CustomErrorMessage = {
        expectedFrom: errorExpectedFroms.Prisma,
        reason: errorReasons.IdentifierNotFound,
        table: table,
        target: id,
      };
      customErrorMessages.push(customError);
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      // Handle validation error
      const customError: CustomErrorMessage = {
        expectedFrom: errorExpectedFroms.Prisma,
        reason: errorReasons.ValidationError,
        table: table,
      };
      customErrorMessages.push(customError);
    } else {
      // Handle unknown error
      const customError: CustomErrorMessage = {
        expectedFrom: errorExpectedFroms.Prisma,
        reason: errorReasons.UnknownError,
      };
      customErrorMessages.push(customError);
    }
  }
};

export default prismaErrorHandler;
