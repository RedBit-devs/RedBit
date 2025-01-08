<template>
    <div class="container">
        <div class="friendContent">
            <div class="searchFriend">
                <input type="text" placeholder="Keresés a barátok közt">
            </div>
            <div class="chatList">
                <FriendList />
            </div>
            <FriendListSelfCard />
        </div>
    </div>
</template>

<script setup>
import FriendList from './FriendList.vue';
import FriendListSelfCard from './UserCard.vue';


</script>

<style scoped>
.container {
    background-color: var(--clr-ui-primary);
    width: 21.438rem;
    min-height: 100vh;
}

.friendContent {
    display: flex;
    flex-direction: column;
}


.searchFriend {
    margin: .3rem;
    text-align: center;
}

input {
    background-color: var(--clr-ui-secondary);
    border: none;
    border-radius: var(--border-rounded);
    height: 2.875rem;
    text-align: center;
    color: white;
    width: 18.75rem;
}
</style>