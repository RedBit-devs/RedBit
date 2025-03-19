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
const { handleFileInput, files } = useFileStorage();
const {getToken, tokenRefresh} = useToken()

//if(!getToken()) await tokenRefresh();

const { data: imageUploadResponse, execute: imageUpload } = useFetch("/api/image/", {
    method: "PUT",
    immediate: false,
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjoiY203dWRwZzV5MDAwMDJmNmpqZzRnMWJlbCIsImVtYWlsIjoibGFqb3NAZXhhbXBsZS5jb20iLCJwaWN0dXJlIjpudWxsLCJ1c2VybmFtZSI6Imxham9zIn0sImlhdCI6MTc0MTk3MTAzNSwiZXhwIjoxNzQzNjk5MDM1fQ.cHBbomaMXwx1do_8LcASQnkMWyQKq4AiDHUpRMF1NsQU_gfELhkrvqP3WWcYm-R6NRyTydTqOubBS5dcoaEytA"
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