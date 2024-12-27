<template>
    <div>
        <ChatSelector />
    </div>
</template>

<script setup>
import ChatSelector from '../components/ChatSelector.vue';
import FriendListCard from '../components/FriendListCard.vue';
import FriendListSelfCard from '../components/FriendListSelfCard.vue';


definePageMeta({
    layout: false
})
</script>

<style scoped></style>