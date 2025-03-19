<template>
<img v-if="image" :src="image[0]?.content" alt="">
    </template>
<script lang="ts" setup>
definePageMeta({
    layout: false,
    middleware: ["protected"]
})
const {getToken, tokenRefresh} = useToken()
const route = useRoute()

if(!getToken()) await tokenRefresh();

const { data: image, refresh: getImage } = useFetch(() => `/api/image/get/${route.params.imageId}/`, {
    method: "GET",
    headers: {
        "Authorization": getToken()
    },
    transform: (e) => e.data.items
})
</script>