<template>
    <div class="content">
        <ChatFieldNavbar />

        <ChatInputFiled />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'chat'
})


</script>

<style scoped>
.content {
    display: grid;
    grid-template-rows: 1fr min-content;
    grid-template-areas: "servers" "chat" "header";
}
</style>