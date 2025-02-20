import { Peer, Message } from 'crossws';

export default defineWebSocketHandler({
    open(peer: Peer) {
        // Send welcome to the new client
        peer.send(JSON.stringify({ type: 'welcome', message: 'Welcome to the server!' }));

        // Join new client to the "matrix" channel
        peer.subscribe("matrix");

        // Notify every other connected client
        peer.publish("matrix", `[system] ${peer.toString()} has joined the Matrix!`);
        console.log("asdasd");
        
    },

    message(peer: Peer, message: Message) { },

    close(peer: Peer) {
        console.log("close asdasd");
     }
});