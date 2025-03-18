import prisma from "~/lib/prisma"
import { type textMessage, type ServerSocketMessage } from "~/types/websocket"

export const getLastMessages = async (roomId: string, page: number = 1, amount: number = 20) => {
    const dbresponse = await prisma.message.findMany({
        orderBy: {
            created_at: "desc"
        },
        take: amount,
        skip: page * amount - amount,
        where: {
            chat_room_id: roomId
        },
        select: {
            id: true,
            text: true,
            User: {
                select: {
                    id: true,
                    username: true,
                    profile_picture: true
                }
            }
        }
    })

    if (!dbresponse) {
        return []
    }

    return dbresponse?.map(m => ({
        author: {
            id: m.User.id,
            picture: m.User.profile_picture,
            username: m.User.username
        },
        data: {
            text: m.text,
            to: m.id
        }
    } as ServerSocketMessage<textMessage>))
} 