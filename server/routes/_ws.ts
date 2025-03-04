import { Peer, Message } from 'crossws';
import { changeTopicMode, type toastMessage, type changeTopicMessage, type ClientSocketMessage, type textMessage, type ServerSocketMessage, type author } from '~/types/websocket';

//Nem tudom hogy miért működik, de működik
export default defineWebSocketHandler({
    open(peer: Peer) {
        console.log(`open: ${peer.toString()}`);
    },

    async message(peer: Peer, message: Message) {
        const { author, data } = message.json<ClientSocketMessage<textMessage | changeTopicMessage | toastMessage>>();

        const tokenData = await verifyJWT(author.replace("Bearer ", ''))

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
                peer.subscribe(Data.topic)
            }
            if (Data.mode === changeTopicMode.unsubscribe) {
                peer.unsubscribe(Data.topic)
            }
        } else if (keys.includes("to")) {
            const Data: textMessage = data as textMessage;
            if (Data.to === "" || Data.text.replace(/\s/,'') === "") return;

            const message: ServerSocketMessage<textMessage> = {
                author: Author,
                data: Data
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




    },

    close(peer: Peer) {
        console.log(`close: ${peer.toString()}`);
    }
});
