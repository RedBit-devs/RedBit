<template>
  <div>
    <div  id="chat">
      <ChatMessage v-for="msg in chatRef" :author-image="msg.author.picture" :author-name="msg.author.name" :message="msg.text"/>
    </div>
    <div  class="toaster">
      <Toast v-for="msg in toastRef" class="warn" :content="msg.data"  :title="String(msg.type)"/>
    </div>
    <button class="btn primary" @click="subscribeToTestTopic">
        Sub to testTopic
    </button>
    <button class="btn secondary" @click="unsubscribeToTestTopic">
        Un Sub to testTopic
    </button>
    <button class="btn secondary" @click="sendTestMessage">
        Send Test Message
    </button>
  </div>
</template>

<script lang="ts" setup>
import { SocketMessageMode, SocketMessageType, type socketMessage, type SocketMessage } from '~/types/websocket';

const chatRef = ref<socketMessage[]>([]);
const toastRef = ref<SocketMessage<any>[]>([]);

const { data, send } = useWebSocket('ws://localhost:3000/_ws', {
  autoReconnect: true,
    onMessage(ws, event){
      const {type, data} = JSON.parse(event.data);
      if (type === SocketMessageType.message) {
        chatRef.value.push(data);
      }else{
        toastRef.value.push(JSON.parse(event.data));
      }
    }
})

const subscribeToTestTopic = () => {
  const message:SocketMessage<string> = {
    type: SocketMessageType.topic,
    mode: SocketMessageMode.subscribe,
    data: "testTopic"
  }
  
  send(JSON.stringify(message))
}
const unsubscribeToTestTopic = () => {
  const message:SocketMessage<string> = {
    type: SocketMessageType.topic,
    mode: SocketMessageMode.unsubscribe,
    data: "testTopic"
  }
  send(JSON.stringify(message))
}
const sendTestMessage = () => {
  const message:SocketMessage<socketMessage> = {
    type: SocketMessageType.message,
    data: {
      author: {
        id: "asd",
        name: "Lajos",
        picture: "https://picsum.photos/200"
      },
      text: "***Nice***",
      to: "testTopic"
    }
  }
  send(JSON.stringify(message))
}
</script>

<style>

</style>