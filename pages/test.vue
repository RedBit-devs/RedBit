<template>
    <div>
        <p>token of user {{token}}</p>
        <button class="btn primary" @click="clearToken">Clear cooike</button>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: false,
    middleware: ['protected']
})
const {token, clearToken} = useToken()
</script>