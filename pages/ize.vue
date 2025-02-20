<template>
  <div>
    
  </div>
</template>

<script setup>
//https://krutiepatel.com/blog/30-real-time-with-nuxt-3-a-guide-to-websocket-integration
import { useWebSocket } from '@vueuse/core'


const { status, data, send, open, close } = useWebSocket('ws://localhost:3000/_ws', {
    onMessage(ws, event){
        console.log(event);
        
    }
})

console.log(data);


</script>

<style>

</style>