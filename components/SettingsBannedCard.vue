<template>
    <div id="container">
        <div class="data">
            <img src="../img/probalogo.png" alt="">
            <h2>User name</h2>
            <div class="nameChange" v-show="inputRef == true">
            </div>
        </div>
        <div class="functions">
            <Icon name="mdi:dots-vertical" size="200%" id="functions" />
            <div v-show="functionRef == true" id="buttons">
                <button class="btn danger">Unban</button>
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
    const apperFuncitons = () => {
        functionRef.value = true
    }


    window.onclick = function (event) {
        if (!event.target.matches('#functions')) {
            functionRef.value = false
        }
    }

    appearBtn.addEventListener('click', apperFuncitons)
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

img {
    width: 4rem;
    border-radius: 50%;
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

.nameChange {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}
</style>