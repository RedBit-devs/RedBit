import prisma from "~/lib/prisma";
import { compareHashes, isEmailValid, isPasswordValid } from "~/server/utils/userValidation";
import jwt from "jsonwebtoken"

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


    setResponseStatus(event, 400)
    apiResponse.error = {
        code: "400",
        message: "Some errors happend while trying to login",
        errors: []

    }

    if (!password || !email) {
        apiResponse.error.errors?.push({
            domain: "user/login",
            message: "Not all required parmeters were provided",
            reason: "MissingParmeters"
        })
    }
    if (email && !(await isEmailValid(email))) {
        apiResponse.error.errors?.push({
            domain: "user/login",
            message: "Provided email is not valid",
            reason: "EmailValidationFailed"
        })
    }
    if (password && !(await isPasswordValid(password))) {
        apiResponse.error.errors?.push({
            domain: "user/login",
            message: "Provided password is not valid",
            reason: "PasswordValidationFailed"
        })
    }

    if (apiResponse.error.errors?.length) {
        if (apiResponse.error.errors.length === 1) {
            apiResponse.error.message = apiResponse.error.errors[0].message
        }
        return apiResponse
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
        apiResponse.error.errors?.push({
            domain: "user/login",
            message: "Databasa did not provide a response",
            reason: "NoDatabaseResponse"
        })
    }

    if (userCredentials && !(await compareHashes(password, userCredentials.password))) {
        apiResponse.error.errors?.push({
            domain: "user/login",
            message: "Password does not match",
            reason: "ProvidedFalsePassword"
        })
    }

    if (apiResponse.error.errors?.length) {
        if (apiResponse.error.errors.length === 1) {
            apiResponse.error.message = apiResponse.error.errors[0].message
        }
        return apiResponse
    } else {
        delete apiResponse.error
        setResponseStatus(event, 200)
    }

    apiResponse.params = {
        ...apiResponse.params,
        password: "",
    }
    apiResponse.data = {
        fields: {
            token: {
                name: "token",
                typeName: "String"
            }
        },
        totalItems: 1,
        items: [
            {
                token: `Bearer ${jwt.sign(
                    {
                        userId: userCredentials?.id,
                    },
                    config.JWT_SECRET,
                    {
                        algorithm: "HS512",
                        expiresIn: config.JWT_EXP_TIME,
                    }
                )
                    }`
            }
        ]
    }

    return apiResponse
})