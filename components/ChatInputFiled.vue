<template>
  <div class="inputField">
    <button class="btn ui-primary">
      <Icon name="mdi:file" size="150%" />
    </button>
    <input @keypress="handleKeypress" ref="inputRef" type="text" class="textInput">
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

const handleKeypress = ({ keyCode }) => {
  //on enter press
  if (keyCode === 13) {
    sendMessage()
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
}
</style>