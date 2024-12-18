import prisma from "~/lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const newUser: User = await readBody(event);
  if (!isPasswordValid(newUser.password)) {
    return {
      message:
        "Password is not valid - it must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
    };
  }
  if  (!isEmailValid(newUser.email)) {
    return {
      message:
        "Email is not valid - it must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
    };
  }

  try {
    await prisma.user.create({
      data: {
        username: newUser.username,
        email: newUser.email,
        phone_number: newUser.phone_number,
        profile_picture: newUser.profile_picture,
        birthdate: new Date(newUser.birthdate),
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        description: newUser.description,
        password: (await hashPassword(newUser.password)).toString(),
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email because it already exists"
        );
      } else {
        `${e.message}`;
      }
    }
    throw e;
  }

  return {
    message: "User created",
  };
});

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  try {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (e) {
    throw e;
  }
}

async function isPasswordValid(password: string): Promise<boolean> {
  const validPasswordPattern : RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const validPasswordCheck = validPasswordPattern.test(password);
  return validPasswordCheck;
}

async function isEmailValid(email: string): Promise<boolean> {
  const validEmailPattern : RegExp =
  /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validEmailCheck = validEmailPattern.test(email);
  return validEmailCheck;
}
