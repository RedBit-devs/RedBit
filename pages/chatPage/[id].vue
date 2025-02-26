<template>
    <div class="content">
        <ChatFieldNavbar />
        <div id="chat">
            <ChatMessage v-for="msg in chatRef" :author-image="msg.author.picture" :author-name="msg.author.name" :message="msg.text"/>
        </div>
        <ChatInputFiled :sendButton="sendMessage" id="input" />
        <div>
            <button class="btn secondary" @click="sendMessage">
                Send Test Message
            </button>
            
        </div>
            
            <div  class="toaster">
                <Toast v-for="msg in toastRef" class="warn" :content="msg.data"  :title="String(msg.type)"/>
            </div>
        
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'chat'
})


import { SocketMessageMode, SocketMessageType, type socketMessage, type SocketMessage } from '~/types/websocket';


const route = useRoute()
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

const unsubscribeFromTopic = (id: string) => {
  const message:SocketMessage<string> = {
    type: SocketMessageType.topic,
    mode: SocketMessageMode.unsubscribe,
    data: id
  }
  send(JSON.stringify(message))
}
const subscribeToTopic = (id: string) => {
  const message:SocketMessage<string> = {
    type: SocketMessageType.topic,
    mode: SocketMessageMode.subscribe,
    data: id
  }
  
  send(JSON.stringify(message))
}


const sendMessage = () => {
  const message:SocketMessage<socketMessage> = {
    type: SocketMessageType.message,
    data: {
      author: {
        id: "asd",
        name: "Lajos",
        picture: "https://picsum.photos/200"
      },
      text: "Ez üzenet",
      to: `${route.params.id}`
    }
  }
  send(JSON.stringify(message))
}

subscribeToTopic(`${route.params.id}`)

</script>

<style scoped>
.content {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

#chat {
    height: 100%;
    overflow-y: auto;

}
</style>
