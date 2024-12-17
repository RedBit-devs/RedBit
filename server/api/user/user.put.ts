import prisma from "~/lib/prisma";
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const newUser: NewUser = await readBody(event);

  try {
    await prisma.user.create({ data: newUser })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email because it already exists'
        )
      }
    }
    throw e
  }



  return {
    message: "User created",
  };
});
