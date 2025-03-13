<template>
    <div class="content">
        <ChatFieldNavbar />
        <div id="chat">
            <ChatMessage author-image="asd" author-name="Kacsa" message="kakao" />
        </div>
        <ChatInputFiled id="input" />
    </div>
</template>

<script setup>
import ChatMessage from '~/components/ChatMessage.vue';



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
