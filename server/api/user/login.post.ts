import prisma from "~/lib/prisma";
import { compareHashes, isEmailValid, isPasswordValid } from "~/server/utils/userValidation";

export default eventHandler(async (event) => {

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
        message: "Not all required pameters were provided",
        errors: [

        ]

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
        return apiResponse
    }

    const userCredentials = await prisma.user.findFirst({
        where: { email },
        select: {
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
        return apiResponse
    } else {
        delete apiResponse.error
        setResponseStatus(event, 200)
    }


    const {email: emailField, password: passwordField} = prisma.user.fields

    apiResponse.data = {
        fields: {
            email: emailField,
            password: passwordField
        },
        totalItems: 1,
        items: [
            userCredentials,
            
        ]
    }

    return apiResponse
})