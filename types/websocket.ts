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
type author = {
    username: string,
    id: string,
    picture: string
}

type ServerSocketMessage<T> = {
    author: author,
    data: T
}
type ClientSocketMessage<T> = {
    author: string,
    data: T
}
type CatchupMessage<T> = {
    data: ServerSocketMessage<T>[]
}

export {
    type ServerSocketMessage,
    type ClientSocketMessage,
    type textMessage,
    type toastMessage,
    type changeTopicMessage,
    type author,
    type CatchupMessage,
    changeTopicMode
}