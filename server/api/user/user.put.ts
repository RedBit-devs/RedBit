import prisma from "~/lib/prisma";
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  const newUser: NewUser = await readBody(event);

  try {
    await prisma.user.create({ data: {
      username: newUser.username, 
      email: newUser.email,
      phone_number: newUser.phone_number,
      profile_picture: newUser.profile_picture,
      birthdate: new Date(newUser.birthdate),
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      description: newUser.description,
      password: (await hashPassword(newUser.password)).toString()
    } })
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


async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  try
  {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  catch(e)
  {
    console.log(e);
  }
  return "";
}