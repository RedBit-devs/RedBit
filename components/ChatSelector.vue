<template>
    <div class="container">
        <div class="chatContent">
            <div class="searchChat">
                <input type="text" placeholder="Search between chats">
            </div>
            <div class="chatList">
                <dir v-for="group in chatgroups" :key="group?.id">
                    <h4>
                        {{group?.name}}
                    </h4>
                    <NuxtLink v-for="chat in group?.Chat_rooms" :key="chat?.id" :to="`/chatpage/${route.params.serverId}/${chat?.id}`">
                        <ChatCard :name="chat?.name" />
                    </NuxtLink>
            </dir>

            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();

const { chatgroups } = defineProps({
    'chatgroups': {
        default: []
    }
})
</script>

<style scoped>
.container {
    background-color: var(--clr-ui-primary);
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
    width: 100%;
}

.chatList {
    display: flex;
    flex-direction: column;
}
</style>