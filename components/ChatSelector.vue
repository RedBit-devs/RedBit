<template>
    <div class="container">
        <div class="CHATContent">
            <div class="searchChat">
                <input type="text" placeholder="Search between chats">
            </div>
            <div class="chatList">
                <ChatCard />
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.container {
    background-color: var(--clr-ui-primary);
    width: 21.438rem;
}

.chatContent {
    display: flex;
    flex-direction: column;
}


.searchChat {
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

.chatList{
    display: flex;
    flex-direction: column;
}
</style>