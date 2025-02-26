import { Peer, Message } from 'crossws';
import { type socketMessage, type SocketMessage, SocketMessageMode, SocketMessageType } from '~/types/websocket';

//Nem tudom hogy miért működik, de működik
export default defineWebSocketHandler({
    open(peer: Peer) {
        console.log(`open: ${peer.toString()}`);
    },

    message(peer: Peer, message: Message) {
        const {type, data, mode} = message.json<SocketMessage<any>>()
        switch (type) {
            case SocketMessageType.topic:
                if (mode === SocketMessageMode.subscribe) {
                    peer.subscribe(data)
                }
                if (mode === SocketMessageMode.unsubscribe) {
                    peer.unsubscribe(data)                    
                }
                break;
            case SocketMessageType.message:
                const Data:socketMessage = data;

                const message:SocketMessage<socketMessage> = {
                    type: SocketMessageType.message,
                    data: {
                        author: Data.author,
                        text: Data.text,
                        to: Data.to
                    }
                }

                peer.publish(Data.to, JSON.stringify(message))
                break;
        
            default:
                break;
        }
     },

    close(peer: Peer) {
        console.log(`close: ${peer.toString()}`);
     }
});
