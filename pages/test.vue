<template>
    <div>
        <p>token of user {{token}}</p>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: false,
    middleware: ['protected']
})
const {token} = useToken()
</script>