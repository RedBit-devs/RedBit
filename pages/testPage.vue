<template>
    <div class="content">
        <ChatInputFiled />
    </div>
</template>

<script setup>
import ServerSelector from '~/components/ServerSelector.vue';
import ChatSelector from '~/components/ChatSelector.vue';

definePageMeta({
    layout: false
})
</script>

<style>
.content {
    display: flex;
}
</style>