<template>
    <div class="content">
        <ChatFieldNavbar />
        <div id="chat">
          <h1>Itt valami másnak kéne lennie majd</h1>
            <ChatMessage author-image="asd" author-name="Kaki" message="kakao" />
        </div>
        <ChatInputFiled id="input" />
        
    </div>
</template>

<script lang="ts" setup>
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
