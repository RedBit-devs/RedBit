import prisma from "~/lib/prisma";
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  //const newUser: NewUser = await readBody(event);
  const newUserData: NewUser = {
    username: "johnDoe123",
    email: "johndoe@example.com",
    phone_number: "1234567890",
    profile_picture: "https://picsum.photos/200/300",
    birthdate: new Date("1990-02-12"),
    first_name: "John",
    last_name: "Doe",
    description: "This is a sample user description.",
    password: "password123"
  };

  try {
    await prisma.user.create({ data: newUserData })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email because it already exists'
        )
      }else{
        `${e.message}`
      }
    }
    throw e
  }



  return {
    message: "User created",
  };
});
