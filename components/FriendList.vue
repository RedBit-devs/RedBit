<template>
    <div class="friends">
        <FriendListCard />
        <FriendListCard />
        <FriendListCard />
        <FriendListCard />
        <FriendListCard />
        <FriendListCard />
    </div>
</template>

<script setup>
import FriendListCard from './FriendListCard.vue';


</script>

<style>
.friends {
    display: flex;
    flex-direction: column;
    min-height: 90vh;
}
</style>