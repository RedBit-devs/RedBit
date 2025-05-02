<template>
  <div class="content">
      <div id="chat">
        <ChatMessage v-if="typeof token === 'string'" v-for="msg in chatRef" :author-image="(msg.author.picture)?msg.author.picture:''" :author-name="msg.author.username" :author-id="msg.author.id" :authtoken="token"
        :message="msg.data.text" />
      </div>
    <ChatInputFiled :send="send" :route="`${route.params.chatId}`" id="input" />
   

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
    
    const { author, data }: { author: author, data: any } = JSON.parse(event.data);
    const keys = Object.keys(data)

    if (keys.includes("to")) {
      chatRef.value.push({ author, data: data as textMessage })
    }
    if (keys.includes("header")) {
      toastRef.value.push({ author, data: data as toastMessage })
    }
    if (!author) {
      chatRef.value.push(...(data as ServerSocketMessage<textMessage>[]).reverse())
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

const token = getToken();

console.log(token);

</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}

#chat {
  height: 100%;
  overflow-y: auto;

}
</style>
