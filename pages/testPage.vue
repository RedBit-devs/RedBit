<template>
    <div class="content">
        <ChatFieldNavbar />
        <div id="chat">

        </div>
        <ChatInputFiled id="input" />
    </div>
</template>

<script setup>

definePageMeta({
    layout: 'chat'
})


</script>

<style scoped>
.content {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

#chat {
    height: 100%;
    overflow-y: auto;

}
</style>