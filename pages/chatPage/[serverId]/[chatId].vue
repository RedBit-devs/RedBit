<template>
  <div class="content">
    <div id="chat">
      <ChatMessage v-for="msg in chatRef" :author-image="(msg.author.picture)?msg.author.picture:''" :author-name="msg.author.username"
        :message="msg.data.text" />
    </div>
    <ChatInputFiled :send="send" :route="`${route.params.chatId}`" id="input" />
    <div>
      <button class="btn secondary" @click="clearToken">
        Clear Token
      </button>
      <button class="btn secondary" @click="clearRefreshToken">
        Clear Refresh Token
      </button>

    </div>

    <div class="toaster">
      <Toast v-for="msg in toastRef" class="warn" :content="msg.data.text" :title="msg.data.header" />
    </div>

  </div>
</template>

<script lang="ts" setup>
// lajos@example.com
// server: cm7xlp3xn0000ia0jk7pyi8a9

import { changeTopicMode, type changeTopicMessage, type ClientSocketMessage, type ServerSocketMessage, type textMessage, type toastMessage, type author } from '~/types/websocket';

definePageMeta({
  layout: 'chat',
    middleware: ['protected']
})


const { getToken, tokenRefresh, tokenStatus, clearToken, clearRefreshToken } = useToken()
const route = useRoute()
const chatRef = ref<ServerSocketMessage<textMessage>[]>([]);
const toastRef = ref<ServerSocketMessage<toastMessage>[]>([]);


const checkToken = async () => {
  if (!getToken()) {
    await tokenRefresh();
    
    if (tokenStatus.value !== "success") {
      navigateTo('/loginpage')
    }
  }
}

const { data, send } = useWebSocket('/_ws', {
  autoReconnect: true,
  onMessage(ws, event) {
    
    const { author, data }: { author: author, data: textMessage | toastMessage } = JSON.parse(event.data);
    const keys = Object.keys(data)

    if (keys.includes("to")) {
      chatRef.value.push({ author, data: data as textMessage })
    }
    if (keys.includes("header")) {
      toastRef.value.push({ author, data: data as toastMessage })
    }

  }
})

const subscribeToTopic = async () => {
  await checkToken()
  const message: ClientSocketMessage<changeTopicMessage> = {
    author: `${getToken()}`,
    data: {
      mode: changeTopicMode.subscribe,
      topic: `${route.params.chatId}`
    }
  }
  send(JSON.stringify(message))
}

subscribeToTopic()
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
