<template>
    <div>
        <div class="close ">
            <NuxtLink to="/chatPage">
                <Icon name="mdi:close" size="550%" class="btn primary" />
            </NuxtLink>
        </div>
        <div class="chats">
            <h2 class="text-big">Chats of the server</h2>
            <div class="pageContent">
                <SettingsChatCard />
                <SettingsChatCard />
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
.chats h2 {
    text-align: center;
    text-transform: capitalize;
}

.close {
    text-align: right;
}

.pageContent {
    margin: .5rem;
    padding: 1rem;
    border-radius: var(--border-rounded);
    background-color: var(--clr-ui-primary);
}
</style>