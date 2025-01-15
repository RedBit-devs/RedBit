<template>
    <div class="content">
        <ChatFieldNavbar />
        <div id="chat">
            <h1>aa</h1>
            <h1>aa</h1>
            <h1>aa</h1>
            <h1>aa</h1>
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
    display: flex;
    flex-direction: column;
}

#chat {
    height: 100% !important;
}

#input {
    position: absolute;
    bottom: 0;
}
</style>