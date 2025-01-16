import prisma from "~/lib/prisma";
import { compareHashes, isEmailValid, isPasswordValid } from "~/server/utils/userValidation";
import jwt from "jsonwebtoken"

export default eventHandler(async (event) => {
    const config = useRuntimeConfig()

    const { email, password } = await readBody(event);
    const apiResponse = {} as ApiResponseV2;
    apiResponse.context = "UserLogin";
    apiResponse.method = "POST";
    apiResponse.params = {
        email: email,
        password: password,
    };
const errors: CustomError[] = []

    if (!password || !email) {
        errors.push({
            domain: "user/login",
            message: "Not all required parmeters were provided",
            reason: "MissingParmeters"
        })
    }
    if (email && !(await isEmailValid(email))) {
        errors.push({
            domain: "user/login",
            message: "Provided email is not valid",
            reason: "EmailValidationFailed"
        })
    }
    if (password && !(await isPasswordValid(password))) {
        errors.push({
            domain: "user/login",
            message: "Provided password is not valid",
            reason: "PasswordValidationFailed"
        })
    }

    if (errors?.length > 0) {
        if (errors.length === 1) {
            throw createError({statusCode: 400, statusMessage :errors[0].message, data:errors})
        }
        throw createError({statusCode: 400, statusMessage :errors[0].message, data:errors})
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
        errors.push({
            domain: "user/login",
            message: "Databasa did not provide a response",
            reason: "NoDatabaseResponse"
        })
    }

    if (userCredentials && !(await compareHashes(password, userCredentials.password))) {
        errors.push({
            domain: "user/login",
            message: "Password does not match",
            reason: "ProvidedFalsePassword"
        })
    }

    if (errors.length > 0) {
        if (errors.length === 1) {
            throw createError({statusCode: 400, statusMessage :errors[0].message, data:errors})
        }
        throw createError({statusCode: 400, statusMessage :errors[0].message, data:errors})
    }


    const tokenData = {
        user: {
            id: userCredentials?.id,
            email: userCredentials?.email
        },
    }

    const token = `Bearer ${jwt.sign(
        tokenData,
        config.JWT_SECRET,
        {
            algorithm: "HS512",
            expiresIn: config.JWT_EXP_TIME,
        }
    )
        }`


apiResponse.data={
    totalItems:1,
    items:[
        {
            token
        }
    ]
}


return apiResponse
})