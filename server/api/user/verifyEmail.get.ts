//URL template
//http://localhost:3000/api/user/verifyEmail?id={userId}&email={email}

import prisma from "~/lib/prisma";
import { paramsCheck } from "~/server/utils/userValidation";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
  let { id, email }: { id: string; email: string } = getQuery(event);

  const apiResponse = {} as ApiResponseV2;
  apiResponse.context = "user/verifyEmail";
  apiResponse.method = "GET";
  apiResponse.params = {
    id: id,
    email: email,
  };

  const errorMessages: CustomErrorMessage[] = [];
  event.context.customErrorMessages = errorMessages;
  event.context.apiResponse = apiResponse;

  if (paramsCheck(apiResponse.params)) {
    errorMessages.push({
      expectedFrom: errorExpectedFroms.User,
      reason: errorReasons.MissingParameters,
    });

      const {errors} = apiResponseHandler(event, errorMessages);
      throw createError(errors)
  }

  const findEmailResponse = await prisma.user.findFirst({
    where: { id },
    select: {
      email: true,
    },
  });

  if (!findEmailResponse) {
    errorMessages.push({
      expectedFrom: errorExpectedFroms.Prisma,
      reason: errorReasons.IdentifierNotFound,
      table: "User",
      target: id,
    });
  }

  if (findEmailResponse && findEmailResponse.email != email) {
    errorMessages.push({
      expectedFrom: errorExpectedFroms.User,
      reason: errorReasons.EmailDoesntMatch,
    });
  }

  if (errorMessages.length > 0) {
    const {errors} = apiResponseHandler(event, errorMessages);
    throw createError(errors)
  }

  const response = await prisma.user.update({
    where: { id },
    data: {
      email_verified: true,
    },
    select: {
      email_verified: true,
    },
  });

  apiResponseHandler(event, errorMessages, {
    totalItems: 1,
    items: [response],
  });

  return apiResponse;
  // Hello there
  //https://pm1.aminoapps.com/6525/10c214eab1fbae69c7b0d49df0aa4fd715e1a36d_hq.jpg
});
