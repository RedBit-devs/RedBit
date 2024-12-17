import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const newUser: User = (await readBody(event)) as User;

  if (await IsUserExist(newUser.email)) {
    return {
      message: "User already exist",
    };
  }
  return {
    message: "User created",
  };
});

async function IsUserExist(email: string): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return false;
  }

  return true;
}
