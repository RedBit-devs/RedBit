<template>
    <div class="container">
        <div class="searchFirend">
            <input type="text" placeholder="Keresés a barátok közt">
        </div>
        <div class="chatList">
            <FriendList />
        </div>
        <FriendListSelfCard />
    </div>
</template>

<script setup>
import FriendList from './FriendList.vue';
import FriendListSelfCard from './FriendListSelfCard.vue';


</script>

<style scoped>
.container {
    height: 100% !important;
    background-color: var(--clr-ui-primary);
    width: fit-content;

}


.chatList {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1rem;
}

input {
    background-color: var(--clr-ui-secondary);
    border: none;
    border-radius: var(--border-rounded);
    height: 2.875rem;
    padding: .3rem;
    color: white;
}
</style>