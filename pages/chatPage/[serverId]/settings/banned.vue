<template>
    <div>
        <div class="close ">
            <NuxtLink to="/chatPage">
                <Icon name="mdi:close" size="550%" class="btn primary" />
            </NuxtLink>
        </div>
        <div class="members">
            <h2 class="text-big ">Banned users</h2>
            <div class="pageContent">
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'settings'
})
</script>

<style scoped>
.members h2 {
    text-align: center;
    text-transform: capitalize;
}

.close {
    text-align: right;
}
</style>