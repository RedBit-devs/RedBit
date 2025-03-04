<template>
  <div class="content">
    <ChatFieldNavbar />
    <div id="chat">
      <ChatMessage v-for="msg in chatRef" :author-image="msg.author.picture" :author-name="msg.author.name"
        :message="msg.data.text" />
    </div>
    <ChatInputFiled :sendButton="sendMessage" id="input" />
    <div>
      <button class="btn secondary" @click="sendMessage">
        Send Test Message
      </button>

    </div>

    <div class="toaster">
      <Toast v-for="msg in toastRef" class="warn" :content="msg.data.text" :title="msg.data.header" />
    </div>

  </div>
</template>

<script lang="ts" setup>
import { changeTopicMode, type changeTopicMessage, type ClientSocketMessage, type ServerSocketMessage, type textMessage, type toastMessage } from '~/types/websocket';

definePageMeta({
  layout: 'chat'
})


const { getToken } = useToken()
const route = useRoute()
const chatRef = ref<ServerSocketMessage<textMessage>[]>([]);
const toastRef = ref<ServerSocketMessage<toastMessage>[]>([]);

const { data, send } = useWebSocket('/_ws', {
  autoReconnect: true,
  onMessage(ws, event) {
    const { author, data }: { author: { name: string, picture: string, id: string }, data: textMessage | toastMessage } = JSON.parse(event.data);

    const keys = Object.keys(data)

    if (keys.includes("to")) { 
      chatRef.value.push({author, data: data as textMessage})
    }
    if (keys.includes("header")) { 
      toastRef.value.push({author, data: data as toastMessage})
    }

  }
})

const unsubscribeFromTopic = (id: string) => {
  const message: ClientSocketMessage<changeTopicMessage> = {
    author: "",
    data: {
      mode: changeTopicMode.unsubscribe,
      topic: id
    }
  }
  send(JSON.stringify(message))
}
const subscribeToTopic = () => {
  const message: ClientSocketMessage<changeTopicMessage> = {
    author: "",
    data: {
      mode: changeTopicMode.subscribe,
      topic: `${route.params.id}`
    }
  }
  send(JSON.stringify(message))
}

subscribeToTopic()


const sendMessage = () => {
  const message: ClientSocketMessage<textMessage> = {
    author: getToken(),
    data: {
      text: "szia",
      to: `${route.params.id}`
    }
  }
  send(JSON.stringify(message))
}


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
