<template>
    <div>
        <DiscoverInputField />
        <DiscoverServerCard v-if="status === 'success'" v-for="server in publicServers" :name="server.name" :picture="server.picture" :joinUrl="`/api/server/public/${server.id}/join`"/>
        <div v-if="status === 'error'" class="toaster">
            <Toast v-for="(err, i) in error.data.data" :key="i" class="danger" :title="`${err.reason}`" 
                :content="err.message" />
        </div>
    </div>
</template>

<script setup>


definePageMeta({
    layout: false,
})

const { getToken, tokenRefresh } = useToken()



if (!getToken()) await tokenRefresh()



const {data: publicServers, error, status, clear, execute } = useFetch("/api/server/public/", {
    headers: {
        "Authorization": getToken()
    },
    transform: r => r.data.items.at,
    immediate: false
})
clear()
execute()

</script>

<style scoped></style>