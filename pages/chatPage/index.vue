<template>
        <div id="chat">
          <h1>Chose a server</h1>
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
