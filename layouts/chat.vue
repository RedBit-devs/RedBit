<script setup lang="ts">

</script>

<template>
<div id="screen">
    <div id="sidebar">
        <ServerSelector />
        <ChatSelector />
        <UserCard id="userCard" />
    </div>
    <slot></slot>
</div>
</template>

<style scoped>
#screen {
    display: grid;
    grid-template-columns: min-content 1fr;
    min-height: 100vh;
}
#sidebar{
    display: grid;
    grid-template-areas: "servers chats" "discover user";
    grid-template-rows: 1fr min-content;
}
#userCard{
    grid-area: user;
}
</style>