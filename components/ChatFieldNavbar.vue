<template>
    <div id="header">
        <ChatCard />
        <div id="functions">
            <input id="searchChat" type="text" placeholder="Search in the chat">
            <Icon name="mdi:phone-in-talk" size="150%" />
            <Icon name="mdi:account-box-outline" size="150%" />

        </div>
    </div>
</template>

<script setup>
import ChatCard from './ChatCard.vue';


</script>

<style scoped>
#header {
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
    border: none;
    border-radius: var(--border-rounded);
    height: 2.875rem;
    text-align: center;
    color: white;
}
</style>