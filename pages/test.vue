<template>
    <div>
        <p>token of user {{getToken()}}</p>
        <button class="btn primary" @click="clearToken">Clear token</button>
        <button class="btn primary" @click="clearRefreshToken">Clear reftresh token</button>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: false,
    middleware: ['protected']
})
const {getToken, clearToken, clearRefreshToken} = useToken()
</script>