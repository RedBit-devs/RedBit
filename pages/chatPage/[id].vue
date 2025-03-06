<template>
  <div class="content">
    <ChatFieldNavbar />
    <div id="chat">
      <ChatMessage v-for="msg in chatRef" :author-image="msg.author.picture" :author-name="msg.author.username"
        :message="msg.data.text" />
    </div>
    <ChatInputFiled :send="send" :route="`${route.params.id}`" id="input" />
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
import { changeTopicMode, type changeTopicMessage, type ClientSocketMessage, type ServerSocketMessage, type textMessage, type toastMessage, type author } from '~/types/websocket';

definePageMeta({
  layout: 'chat'
})


const { getToken, getNewToken, clearToken, clearRefreshToken } = useToken()
const route = useRoute()
const chatRef = ref<ServerSocketMessage<textMessage>[]>([]);
const toastRef = ref<ServerSocketMessage<toastMessage>[]>([]);


const checkToken = async () => {
  if (!getToken()) {
    let success = await getNewToken();
    if (!success) {
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

const unsubscribeFromTopic = (id: string) => {
  checkToken()
  const message: ClientSocketMessage<changeTopicMessage> = {
    author: getToken(),
    data: {
      mode: changeTopicMode.unsubscribe,
      topic: id
    }
  }
  send(JSON.stringify(message))
}
const subscribeToTopic = async () => {
  await checkToken()
  const message: ClientSocketMessage<changeTopicMessage> = {
    author: getToken(),
    data: {
      mode: changeTopicMode.subscribe,
      topic: `${route.params.id}`
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
