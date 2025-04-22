<template>
    <div>
        <div class="close ">
            <NuxtLink to="/chatPage">
                <Icon name="mdi:close" size="550%" class="btn primary" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

definePageMeta({
    layout: "user"
})



</script>

<style lang="scss" scoped></style>