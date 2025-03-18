import prisma from "~/lib/prisma";
import { hashPassword } from "~/shared/utils/userValidation.js"
import type { CustomErrorMessage } from "~/types/customErrorMessage";

const main = async () => {

    const date = new Date()

    const cause: CustomErrorMessage[] = []
    const pwd = await hashPassword("Pass123@", cause)
    if (!pwd) {
        throw new Error("Could not hash password", { cause });
    }

    await prisma.user.upsert({
        where: { email: "nop@nop.nop", id: "deleteduser" },
        update: {},
        create: {
            birthdate: `${date.toISOString().replace("T", " ").substring(0, 19)}`,
            email: "nop@nop.nop",
            first_name: "Deleted",
            last_name: "User",
            password: pwd,
            username: "deleted_user",
            id: "deleteduser",
            email_verified: true
        }
    })

    console.log("'deleted_user' user was created with the id of 'deleteduser' and with the password 'Pass123@'");


    const lajos = await prisma.user.upsert({
        where: { email: "lajos@example.com" },
        update: {},
        create: {
            birthdate: `${date.toISOString().replace("T", " ").substring(0, 19)}`,
            email: "lajos@example.com",
            first_name: "Lajos",
            last_name: "Tesztelő",
            password: pwd,
            username: "Lajoska",
            email_verified: false
        }
    })

    console.log(`'lajos' user was created with the id of '${lajos.id}' and with the password 'Pass123@'`);


    console.log("Database seeded successfuly");

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });