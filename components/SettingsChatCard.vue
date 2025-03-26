<template>
    <div class="container">
        <div class="data">
            <Icon name="mdi:pound" size="200%" />
            <h2>Chat name</h2>
            <input v-if="inputAppear == true" type="text" placeholder="Chat name">
        </div>
        <div class="functions">
            <Icon name="mdi:dots-vertical" size="200%" id="functions" />
            <div v-if="functionAppear == true" id="buttons">
                <button class="btn warn" id="rename">Rename</button>
                <button class="btn danger">Delete</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted } from 'vue';
let inputAppear = false
let functionAppear = false

onMounted(() => {
    const appearBtn = document.getElementById('functions')
    const functionBtns = document.getElementById('buttons')
    const renameBtn = document.getElementById('rename')
    const apperFuncitons = () => {
        functionAppear = true
        console.log(functionAppear);

    }

    const changeNameFunc = () => {
        inputAppear = true
    }

    window.onclick = function (event) {
        if (!event.target.matches('#functions')) {
            functionAppear = false
        }
    }

    appearBtn.addEventListener('click', apperFuncitons)
})


</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--border-rounded);
    padding: 1rem;
    margin: .5rem;
}

.container:hover {
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
</style>