<template>
    <div>
        hi
        <input type="text" ref="inpref">
        <button @click="submit">ok</button>
        <div>
            <img v-if="image" :src="image[0]?.content" alt="">
        </div>
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: ["protected"]
})
const { handleFileInput, files } = useFileStorage();
const {getToken, tokenRefresh} = useToken()
const inpref = ref<HTMLInputElement>(null)

if(!getToken()) await tokenRefresh();

const { data: image, refresh: getImage } = useFetch(() => `/api/image/get/${inpref.value?.value}/`, {
    method: "GET",
    immediate: false,
    headers: {
        "Authorization": getToken()
    },
    transform: (e) => e.data.items
})
const submit = () => {
    if (inpref.value?.value !== null) {
        getImage()
    }
}
</script>