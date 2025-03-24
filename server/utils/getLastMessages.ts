import prisma from "~/lib/prisma"
import { type textMessage, type ServerSocketMessage } from "~/types/websocket"

/**
 * Reads the last messages from the given room with the given page and amount.
 * @param {string} roomId The id of the room to read messages from.
 * @param {number} page The page number to read from. Defaults to 1.
 * @param {number} amount The amount of messages to read per page. Defaults to 20.
 * @returns The last messages in the form of ServerSocketMessage<textMessage>.
 */
export const getLastMessages = async (roomId: string, page: number = 1, amount: number = 20) => {
    // Get the last messages
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
        // Return an empty array if no messages are found
        return []
    }
    // Return the messages
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