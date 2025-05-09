<template>
  <dialog @click.self="closeDialogFunc" :open="isShown">
    <div class="modal">
      <div class="close">
        <Icon @click.self="closeDialogFunc" name="mdi:close" size="150%" class="btn primary" />
      </div>
      <div class="content">
        <h1 id="title">Create server</h1>
        <div id="inputs">
          <div class="inputWrapper">
            <label>Name</label>
            <input type="text" placeholder="Name" ref="name" />
          </div>
          <div class="inputWrapper">
            <label>Description</label>
            <input type="text" placeholder="Description" ref="description" />
          </div>
          <div class="inputWrapper">
            <input id="imageInput" type="file" @input="handleFileInput" accept="image/*" />
            <label for="imageInput">
              Picture
              <Icon name="mdi:edit" size="1.3rem"/>
              <img class="profPic" v-if="files[0]?.content" :src="`${files[0].content}`" :alt="files[0].name">
            </label>
          </div>
        </div>
        <div id="visibilityInput">
          <div id="check">
            <label>
              <input type="radio" name="visibility" checked v-model="visibility" :value="'public'" />Public
            </label>
          </div>
          <div id="check">
            <label>
              <input type="radio" name="visibility" v-model="visibility" :value="'private'" />Private
            </label>
          </div>
        </div>
        <div class="submit">
          <button class="btn primary" @click="createServer()">Create</button>
        </div>
      </div>
    </div>
    <div v-if="status !== 'idle'" class="toaster">
      <Toast v-for="(error, i) in error?.data?.data" :key="i" class="danger" :title="error.reason"
        :content="error.message" />
      <Toast v-for="(dat, i) in data" class="ok" title="Success"
        :content="`Server ${dat.name} was successfully created`" />
    </div>
  </dialog>
</template>

<script setup>
const { getToken, tokenRefresh } = useToken();
const name = ref(null);
const description = ref(null);
const visibility = ref("public");

const { handleFileInput, files } = useFileStorage();


const { data, execute, error, status, clear } = useFetch(`/api/server/`, {
  method: "PUT",
  headers: {
    Authorization: getToken(),
    "Content-Type": "application/json",
  },
  onRequest({ request, options }) {
    options.body = {
      name: name.value?.value,
      description: description.value?.value,
      visibility: visibility.value,
      picture: files.value[0]?.content
    }
  },
  immediate: false,
  transform: r => r.data.items[0]
});
execute()

const createServer = async () => {
  clear()
  if (name.value.value === "" || description.value.value === "") {
    return;
  }
  if (!getToken()) await tokenRefresh();

  execute()

};

const { isShown } = defineProps({
  isShown: {
    type: Boolean,
    default: false,
  },
  closeDialogFunc: {
    type: Function,
    default: () => { },
  },
});
</script>

<style scoped>
.profPic {
  border-radius: 100%;
  max-width: 5rem;
  max-height: 5rem;

  width: auto;
  height: auto;

  aspect-ratio: initial;
}

#imageInput {
  display: none;
}

dialog {
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 0.2);
  position: relative;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--clr-ui-primary);
  border-radius: var(--border-rounded);
}

.content {
  display: grid;
  gap: 1rem;
  grid-template-rows: 1fr;
  padding: 0.8rem 3rem 3.5rem 3rem;
}

.close {
  margin: 0.5rem;
  display: flex;
  justify-content: end;
  cursor: pointer;
}

#title {
  font-variant: small-caps;
  text-align: center;
}

.inputWrapper {
  gap: 0.2rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 0 1rem 0;
}

.inputWrapper input {
  background-color: var(--clr-ui-secondary);
  border: none;
  border-radius: var(--border-rounded);
  height: 2.875rem;
  text-align: center;
  color: var(--clr-text-primary);
}

#visibilityInput {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

#check {
  display: flex;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
}

label:has([type="radio"]) {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  border: 2px solid var(--clr-primary);
  border-radius: 5rem;
  padding: 0.5rem 1rem;
}

label:has([type="radio"]:not(:disabled)) {
  cursor: pointer;
}

[type="radio"] {
  appearance: none;
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  border: inherit;
  border-radius: inherit;
}

label:has([type="radio"]:checked) {
  background-color: var(--clr-primary);
  color: #fff;
}

[type="radio"]:checked {
  border-color: transparent;
  background: #fff url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" width="1rem" height="1rem"><circle cx="0.5" cy="0.5" r="0.5" fill="none" stroke="%23EF3333" stroke-width="0.05"/><polyline points="0.2,0.5 0.4,0.7 0.8,0.3" style="fill:none;stroke:%23EF3333;stroke-linecap:round;stroke-width:0.1;"/></svg>') no-repeat 50% / 1rem;
}

.submit {
  display: flex;
  justify-content: center;
}

dialog::backdrop {
  background-color: black;
  opacity: 0.5;
}
</style>
