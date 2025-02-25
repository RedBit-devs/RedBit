import { Peer, Message } from 'crossws';

//Nem tudom hogy miért működik, de működik
export default defineWebSocketHandler({
    open(peer: Peer) {
        // Send welcome to the new client
        peer.send(JSON.stringify({ type: 'welcome', data: 'Welcome to the server!\n' }));

        // Join new client to the "matrix" channel
        peer.subscribe("matrix");

        // Notify every other connected client
        peer.publish("matrix", JSON.stringify({type: "system", data: `[system] ${peer.toString()} has joined the Matrix!\n`}));
        console.log(`open: ${peer.toString()}`);
        
    },

    message(peer: Peer, message: Message) {
        const {type, data, to} = JSON.parse(message.toString())
        switch (type) {
            case "subscribe":
                console.log(type);
                
                peer.subscribe(data)
                peer.publish(data, JSON.stringify({type: "system", data: `${peer.toString()} joined ${data}\n`}))
                break;
            case "unsubscribe":
                peer.publish(data, JSON.stringify({type: "system", data: `${peer.toString()} left ${data}\n`}))
                peer.unsubscribe(data)
                break;
            case "message":
                
                peer.publish(to, JSON.stringify({type: "message", data}))
                break;
        
            default:
                break;
        }
     },

    close(peer: Peer) {
        console.log(`close: ${peer.toString()}`);
     }
});

//https://github.com/javaparser/javaparser/issues/4669
