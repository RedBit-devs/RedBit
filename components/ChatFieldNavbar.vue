<template>
    <div id="menu"></div>
    <div id="header">
        <ChatCard />
        <div id="functions">
            <input id="searchChat" type="text" placeholder="Search in the chat">
            <Icon id="search" name="mdi:magnify" size="150%" @click="appearMobileSearch()" />
            <Icon name="mdi:phone-in-talk" size="150%" />
            <Icon name="mdi:account-box-outline" size="150%" />
        </div>
    </div>
    <div id="mobileSearch" :class="mobileInput" :style="proba">
        <input id="mobileInput" type="text" placeholder="Search in the chat">
        <Icon name="mdi:close" size="150%" @click="disappearMobileSearch()" />
    </div>


</template>

<script setup>
import { ref, onMounted } from 'vue'

const mobileInput = ref('')
const screenWidth = ref(0)
const proba = ref({
    transform: 'translateY(-10%)',
    zIndex: '-1'
})

onMounted(() => {
    screenWidth.value = window.innerWidth
})

if (screenWidth.value <= 468) {
    proba.value.transform = 'translateY(-20%)'
}

const appearMobileSearch = () => {
    proba.value.zIndex = '1',
        proba.value.transform = `translateY(80%)`



}

const disappearMobileSearch = () => {
    proba.value.zIndex = '-1',
        setTimeout(proba.value.transform = `translateY(-20%)`, 10000)


}




</script>

<style scoped>
#menu {
    position: relative;
    display: flex;
}

#header {

    left: 0;
    top: 0;
    width: 100%;
    height: 3.25rem;
    background-color: var(--clr-ui-primary);
    display: flex;
    justify-content: space-between;
}

#functions {
    margin-right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

input {
    background-color: var(--clr-ui-secondary);
    opacity: 7;
    border: none;
    border-radius: var(--border-rounded);
    height: 2.875rem;
    text-align: center;
    color: white;
}

#mobileSearch {
    background-color: rgba(51, 51, 51, .5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: .5rem 1rem .5rem 1rem;
    transition: .5s;
}

#mobileInput {
    width: 100%;
    background-color: var(--clr-ui-secondary);
    border: none;
    border-radius: var(--border-rounded);
    height: 2.875rem;
    text-align: center;
    color: white;
}

#search {
    display: none;
}

.disappeared {
    display: none;
}





@media only screen and (max-width: 468px) {
    #searchChat {
        display: none;
    }

    #search {
        display: block;
    }
}
</style>