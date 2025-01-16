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
    layout: false
})


</script>

<style scoped>
.content {
    height: 100vh;

    display: flex;
    flex-direction: column;
}

#chat {
    overflow-y: scroll;
    height: 100%;
    overflow: auto;

}
</style>