<template>
    <div id="container">
        <div class="data">
            <Icon name="mdi:pound" size="200%" />
            <h2 v-if="inputRef == false">Chat name</h2>
            <div class="nameChange" v-show="inputRef == true">
                <input type="text" placeholder="Chat name" id="nameInput">
                <button class="btn ok">Save</button>
                <button class="btn warn" id="cancelNameChange">Cancel</button>
            </div>
        </div>
        <div class="functions">
            <Icon name="mdi:dots-vertical" size="200%" id="functions" />
            <div v-show="functionRef == true" id="buttons">
                <button class="btn warn" id="rename">Rename</button>
                <button class="btn danger">Delete</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted } from 'vue';
const inputRef = ref(false)
const functionRef = ref(false)

onMounted(() => {
    const appearBtn = document.getElementById('functions')
    const renameBtn = document.getElementById('rename')
    const cancelBtn = document.getElementById('cancelNameChange')
    const apperFuncitons = () => {
        functionRef.value = true
    }

    const disappearFunctions = () => {
        inputRef.value = false
    }

    const changeNameFunc = () => {
        inputRef.value = true
    }

    window.onclick = function (event) {
        if (!event.target.matches('#functions')) {
            functionRef.value = false
        }
    }

    appearBtn.addEventListener('click', apperFuncitons)
    renameBtn.addEventListener('click', changeNameFunc)
    cancelBtn.addEventListener('click', disappearFunctions)
})


</script>

<style scoped>
#container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--border-rounded);
    padding: 1rem;
    margin: .5rem;
    height: 5rem;
}

#container:hover {
    background-color: var(--clr-ui-secondary);
}

.data {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.functions {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--clr-ui-secondary);
    gap: .4rem;
    padding: .3rem;
    border-radius: var(--border-rounded);
    position: absolute;
}

#nameInput {
    border-radius: var(--border-rounded);
    background-color: var(--clr-ui-secondary);
    border: none;
    padding: 1rem;
    color: var(--clr-text-primary);
}

#nameInput:hover {
    background-color: var(--clr-ui-primary);
}

.nameChange {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}
</style>