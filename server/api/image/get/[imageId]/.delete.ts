import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";
import { paramsCheck } from "~/shared/utils/userValidation";
import {
  type CustomErrorMessage,
  errorExpectedFroms,
  errorReasons,
} from "~/types/customErrorMessage";

export default defineEventHandler(async (event) => {
  const customErrorMessages: CustomErrorMessage[] = [];
  const apiResponse = {} as ApiResponse;

  apiResponse.context = "Image/Delete";
  apiResponse.method = "DELTETE";
  event.context.apiResponse = apiResponse;

  if (!event.context.auth) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.User,
      reason: errorReasons.Unauthorized,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  let imageId = getRouterParam(event, "imageId");
  const userId = event.context.auth.user.id;
  if (!imageId) {
    imageId = "";
  }
  apiResponse.params = {
    imageId: imageId,
    userId: userId,
  };
  event.context.apiResponse = apiResponse;

  if (paramsCheck(apiResponse.params)) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.Image,
      reason: errorReasons.MissingParameters,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }

  const data = await prisma.image.delete({
    where: {
        id: imageId,
        author_id: userId
    }
  })
  if (!data) {
    customErrorMessages.push({
        expectedFrom: errorExpectedFroms.Prisma,
        reason: errorReasons.IdentifierNotFound,
        table: "image",
        target: imageId
    })

    const { errors } = apiResponseHandler(event, customErrorMessages);
      throw createError(errors);
  }

  if (!data) {
    customErrorMessages.push({
      expectedFrom: errorExpectedFroms.Prisma,
      reason: errorReasons.NoDatabaseResponse,
    });
    const { errors } = apiResponseHandler(event, customErrorMessages);
    throw createError(errors);
  }
  apiResponse.data.deleted = true;
  return apiResponse;
});
