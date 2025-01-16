<template>

    <NuxtLayout :name="$device.isMobileOrTablet ? 'mobile' : 'chat'">
        <div :class="{ 'mobile': isTouchScreen, 'desktop': !isTouchScreen }">
            <h1>Chat tartalma</h1>
        </div>
    </NuxtLayout>

</template>

<script setup>
definePageMeta({
    layout: false
})

import { ref, onMounted } from 'vue';
const isTouchScreen = ref(false)

onMounted(() => {
    const checkTouchScreen = () => {
        if ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) {
            isTouchScreen.value = true;
        }
        else if ('msMaxTouchPoints' in navigator && navigator.msMaxTouchPoints > 0) {
            isTouchScreen.value = true;
        }
        else {
            const mQ = window.matchMedia('(pointer:coarse)');
            if (mQ && mQ.matches) {
                isTouchScreen.value = true;
            }
            else if ('orientation' in window) {
                isTouchScreen.value = true;
            }
            else { isTouchScreen.value = false; }
        }
    }

    checkTouchScreen()
})
</script>


<style scoped>
.mobile {
    position: absolute;
    z-index: -1;
}

.desktop {
    position: relative;
}
</style>