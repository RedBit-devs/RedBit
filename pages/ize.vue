<template>
  <div>
    <div  id="chat">
      <ChatMessage v-for="msg in chatRef" :author-image="msg.author.picture" :author-name="msg.author.name" :message="msg.message"/>
    </div>
    <div  class="toaster">
      <Toast v-for="msg in toastRef" :content="msg" title="Info"/>
      <Toast v-for="msg in welcomeRef" class="ok" :content="msg" title="hi"/>
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

<script  setup>
//https://krutiepatel.com/blog/30-real-time-with-nuxt-3-a-guide-to-websocket-integration
import { useWebSocket } from '@vueuse/core'


const chatRef = ref([]);
const toastRef = ref([]);
const welcomeRef = ref([]);

const { status, data, send, open, close } = useWebSocket('ws://localhost:3000/_ws', {
  autoReconnect: true,
    onMessage(ws, event){
      const {type, data} = JSON.parse(event.data)
        switch (type) {
          case "welcome":
            welcomeRef.value.push(data)
            break;
          case "message":
            
            chatRef.value.push(data)
            break;
          case "system":
          toastRef.value.push(data)
            break;

          default:
          console.log(event.data);
            break;
        }
        
    }
})

const subscribeToTestTopic = () => {
  const message = {
    type: "subscribe",
    data: "testTopic"
  }
  
  send(JSON.stringify(message))
}
const unsubscribeToTestTopic = () => {
  const message = {
    type: "unsubscribe",
    data: "testTopic"
  }
  send(JSON.stringify(message))
}
const sendTestMessage = () => {
  const message = {
    type: "message",
    data: {
      message: " ***Lajos vagyok***",
      author:{
      name:"lajos",
      picture: "https://picsum.photos/200",
    },
  },
  to: "testTopic"
    
  }
  send(JSON.stringify(message))
}

console.log(data);


</script>

<style>

</style>