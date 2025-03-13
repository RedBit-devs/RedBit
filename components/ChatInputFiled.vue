<template>
  <div class="inputField">
    <button class="btn ui-primary">
      <Icon name="mdi:file" size="150%" />
    </button>
    <textarea @keydown="handleKeydown" @keyup="handleKeyup" ref="inputRef" type="text" class="textInput"/>
    <button class="btn ui-primary" @click="sendMessage">
      <Icon name="mdi:arrow-left-bottom" size="150%" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const { send, route } = defineProps({

  "send": {
    type: Function,
    default: () => { }
  },
  "route": {
    type: String,
    default: ""
  }
})

import { type ClientSocketMessage, type textMessage } from '~/types/websocket';
const { getToken, getNewToken } = useToken()
const inputRef = ref(null)

const checkToken = async () => {
  if (!getToken()) {
    let success = await getNewToken();
    if (!success) {
      navigateTo('/loginpage')
    }
  }
}


const sendMessage = async () => {
  if (inputRef.value.value.replace(/\s/, '') === '') return;
  await checkToken()
  const message: ClientSocketMessage<textMessage> = {
    author: getToken(),
    data: {
      text: inputRef.value.value,
      to: route
    }
  }
  send(JSON.stringify(message))
}

let isShiftDown = false;

const handleKeydown = ({keyCode}) =>{
  // shift is down
  if (keyCode === 16) {
    isShiftDown = true
  }
  
}
const handleKeyup = async ({keyCode, target}) =>{
  // shift is down
  if (keyCode === 16) {
    isShiftDown = false
  }

  //is enter down whitout shift held
  if (keyCode === 13 && !isShiftDown) {
      await sendMessage()
      target.value = ""
  }
}

</script>

<style scoped>
.inputField {
  padding: .5rem;
  display: flex;
  gap: 1rem;
  width: 100%;

}

.textInput {
  border-radius: var(--border-rounded);
  width: max-content;
  background-color: var(--clr-ui-primary);
  border: none;
  padding: .5rem;
  color: var(--clr-text-primary);
  width: 100%;
  height: fit-content;
  min-height: 3.3rem;
  resize: vertical;
  overflow-y: auto;
  font-size: 1.1rem;
  max-height: 6rem;
  padding-top: 1rem;
}
</style>