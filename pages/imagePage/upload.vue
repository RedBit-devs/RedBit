<template>
    <div>
        hi
        <input type="file" @input="handleFileInput" accept="image/*" />
        <button @click="submit">ok</button>
        <div>
            <img v-if="imageUploadResponse" :src="imageUploadResponse[0]?.content" alt="">
        </div>
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: ["protected"]
})
const { handleFileInput, files } = useFileStorage();
const {getToken, tokenRefresh} = useToken()

if(!getToken()) await tokenRefresh();

const { data: imageUploadResponse, execute: imageUpload } = useFetch("/api/image/", {
    method: "PUT",
    immediate: false,
    headers: {
        "Authorization": getToken()
    },
    transform: (e) => e.data.items,
    onRequest({options}){
        options.body = {
            name: files.value[0].name,
            content: files.value[0].content
        }
    }
})
const submit = () => {
    imageUpload()
}
</script>