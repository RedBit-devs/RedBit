type textMessage = {
    to: string,
    text: string
}
type toastMessage = {
    header: string,
    text: string
}

enum changeTopicMode {
    "subscribe",
    "unsubscribe"
}
type changeTopicMessage = {
    mode: changeTopicMode
    topic: string
}

type ServerSocketMessage<T> = {
    author: {
        name: string,
        id: string,
        picture: string
    },
    data: T
}
type ClientSocketMessage<T> = {
    author: string,
    data: T
}

export {
    type ServerSocketMessage,
    type ClientSocketMessage,
    type textMessage,
    type toastMessage,
    type changeTopicMessage,
    changeTopicMode
}