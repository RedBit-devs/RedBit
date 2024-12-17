import { usePrismaClient } from '@prisma/nuxt';
export default defineEventHandler(async (event) => {
    const { $prisma } = usePrismaClient();
    const prisma = $prisma;
    const newUser : User = await readBody(event)

     async function  IsUserExist(email  : string): Promise<boolean> {
        const user = await prisma.user.findFirst({  
            where: {
                email: email
            }
        })

        if (!user) {
            return false
        }

        return true
      }
    return {
        message: "User created"
     }
  })