<template>
  <div>
    <div ref="chatRef" id="chat">

    </div>
    <button class="btn primary" @click="subscribeToTestTopic">
        Sub to testTopic
    </button>
    <button class="btn secondary" @click="unsubscribeToTestTopic">
        Un Sub to testTopic
    </button>
  </div>
</template>

<script setup>
//https://krutiepatel.com/blog/30-real-time-with-nuxt-3-a-guide-to-websocket-integration
import { useWebSocket } from '@vueuse/core'


const chatRef = ref(null);

const { status, data, send, open, close } = useWebSocket('ws://localhost:3000/_ws', {
    onMessage(ws, event){
      const {type, data} = JSON.parse(event.data)
        switch (type) {
          case "welcome":
            alert(data)
            break;
          case "message":
            chatRef.value.innerText += data;
            break;
          case "system":
            chatRef.value.innerText += data;
            break;

          default:
          console.log(event.data);
            break;
        }
        
    }
})

const subscribeToTestTopic = () => {
  console.log("asd");
  
  send(JSON.stringify({type:"subscribe", data:"testTopic"}))
}
const unsubscribeToTestTopic = () => {
  send(JSON.stringify({type:"unsubscribe", data:"testTopic"}))
}

console.log(data);


</script>

<style>

</style>