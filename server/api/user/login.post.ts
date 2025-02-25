import prisma from "~/lib/prisma";
import { compareHashes, isEmailValid, isPasswordValid } from "~/server/utils/userValidation";
import {
    errorExpectedFroms,
    errorReasons,
    type CustomErrorMessage,
} from "~/types/customErrorMessage";


export default eventHandler(async (event) => {
    const config = useRuntimeConfig()

    const { email, password } = await readBody(event);
    const apiResponse = {} as ApiResponse;
    apiResponse.context = "UserLogin";
    apiResponse.method = "POST";
    apiResponse.params = {
        email: email,
        password: password,
    };

    const customErrorMessages: CustomErrorMessage[] = [];
    event.context.customErrorMessages = customErrorMessages;
    event.context.apiResponse = apiResponse;

    if (paramsCheck(apiResponse.params)) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.MissingParameters,
        })
    }
    if (email && !(await isEmailValid(email))) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.EmailValidationFailed
        })

    }
    if (password && !(await isPasswordValid(password))) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.PasswordValidationFailed
        })
    }

    if (customErrorMessages.length > 0) {
        const { errors } = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);
    }

    const userCredentials = await prisma.user.findFirst({
        where: { email },
        select: {
            id: true,
            email: true,
            password: true
        }
    })


    if (!userCredentials) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.Prisma,
            reason: errorReasons.NoDatabaseResponse
        })
    }

    if (userCredentials && !(await compareHashes(password, userCredentials.password))) {
        customErrorMessages.push({
            expectedFrom: errorExpectedFroms.User,
            reason: errorReasons.FailedToLogin
        })
    }

    if (customErrorMessages.length > 0) {
        const { errors } = apiResponseHandler(event, customErrorMessages);
        throw createError(errors);
    }


    const tokenData = {
        user: {
            id: userCredentials?.id,
            email: userCredentials?.email
        },
    }



    const token = `Bearer ${await generateJWT(tokenData, "20d")}`


    apiResponse.data = {
        totalItems: 1,
        items: [
            {
                token
            }
        ]
    }


    return apiResponse
})