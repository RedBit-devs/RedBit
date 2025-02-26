enum SocketMessageType {
    "message",
    "topic"
}

enum SocketMessageMode {
    "subscribe",
    "unsubscribe"
}

type socketMessage = {
    text: string,
    to: string,
    author: {
        name: string,
        picture: string,
        id: string
    }
}

type SocketMessage<dataType> = {
    type: SocketMessageType,
    mode?: SocketMessageMode,
    data: dataType
}

export {
    type SocketMessage,
    type socketMessage,
    SocketMessageType,
    SocketMessageMode,
}