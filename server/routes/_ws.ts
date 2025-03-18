import { Peer, Message } from 'crossws';
import prisma from '~/lib/prisma';
import { changeTopicMode, type toastMessage, type changeTopicMessage, type ClientSocketMessage, type textMessage, type ServerSocketMessage, type author, type CatchupMessage } from '~/types/websocket';
import { getLastMessages } from '../utils/getLastMessages';

//Nem tudom hogy miért működik, de működik
export default defineWebSocketHandler({

    async message(peer: Peer, message: Message) {
        const { author, data } = message.json<ClientSocketMessage<textMessage | changeTopicMessage | toastMessage>>();

        const tokenData = await verifyJWT(author?.replace("Bearer ", ''))

        let Author: author;
        Author = tokenData?.user as author;

        if (!Author) {
            const message: ServerSocketMessage<toastMessage> = {
                author: {
                    id: "",
                    username: "Server",
                    picture: ""
                },
                data: {
                    header: "Unauthorized",
                    text: "No valid access token provided"
                }
            }

            peer.send(JSON.stringify(message))
            return
        }

        const keys = Object.keys(data)

        if (keys.includes("topic")) {
            const Data: changeTopicMessage = data as changeTopicMessage;
            if (Data.topic === "") return;

            if (Data.mode === changeTopicMode.subscribe) {
                // To ensure that the user who is trying to connect to a chat is part of the server
                const dbresponse = await prisma.user.findFirst({
                    where: {
                        id: Author.id,
                        Servers_joined: {
                            some: {
                                Server:{
                                    Chat_groups:{
                                        some:{
                                            Chat_rooms:{
                                                some:{
                                                    id: Data.topic
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    select: {
                        id: true
                    }
                })

                if (!dbresponse?.id) {
                    const message: ServerSocketMessage<toastMessage> = {
                        author: {
                            id: "",
                            username: "Server",
                            picture: ""
                        },
                        data: {
                            header: "Forbidden",
                            text: "User is not part of requested chat"
                        }
                    }

                    peer.send(JSON.stringify(message))
                    return
                }

                peer.topics.forEach(t => peer.unsubscribe(t))
                peer.subscribe(Data.topic);

                const catchUp:ServerSocketMessage<textMessage>[] = await getLastMessages(Data.topic)

                const message:CatchupMessage<textMessage> = {
                    data: catchUp
                }

                peer.send(JSON.stringify(message));

            }
            if (Data.mode === changeTopicMode.unsubscribe) {
                peer.unsubscribe(Data.topic)
            }

        } else if (keys.includes("to")) {
            const Data: textMessage = data as textMessage;
            if (Data.to === "" || Data.text.replace(/\s/, '') === "") return;

            const message: ServerSocketMessage<textMessage> = {
                author: Author,
                data: Data
            }

            // Save message in the database
            const response =  await prisma.message.create({
                data:{
                    text: message.data.text,
                    type: "text",
                    chat_room_id: message.data.to,
                    user_id: message.author.id
                }
            })
            if (!response) {
                const message: ServerSocketMessage<toastMessage> = {
                    author: {
                        id: "",
                        username: "Server",
                        picture: ""
                    },
                    data: {
                        header: "Error",
                        text: "Could not send the message"
                    }
                }
                peer.send(JSON.stringify(message))
                return
            }


            if (!peer.topics.has(Data.to)) {
                return
            }

            peer.publish(Data.to, JSON.stringify(message))
            peer.send(JSON.stringify(message))

        } else {
            const message: ServerSocketMessage<toastMessage> = {
                author: {
                    id: "",
                    username: "Server",
                    picture: ""
                },
                data: {
                    header: "Error",
                    text: "Invalid message on socket"
                }
            }

            peer.send(JSON.stringify(message))
        }
    }
});
