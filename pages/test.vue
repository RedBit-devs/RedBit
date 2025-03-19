<template>
    <div>
        <ClientOnly> 
            <!-- In this case with ssr it will give a hydration error because the server does not have the refreshToken therefore it can not get the accestoken-->
            <p>token of user {{getToken()}}</p>
        </ClientOnly> 
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