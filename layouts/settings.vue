<template>
    <div class="screen">
        <div ref="sidebarRef" class="sidebar">
            <h1 class="text-title title">Chat settings</h1>
            <ul class="text-medium">
                <NuxtLink class="button" :to="`/chatPage/${routes.params.serverId}/settings`">
                    <li>Main infromation</li>
                </NuxtLink>
                <NuxtLink class="button" :to="`/chatPage/${routes.params.serverId}/settings/chats`">
                    <li>Chats</li>
                </NuxtLink>
                <NuxtLink class="button" :to="`/chatPage/${routes.params.serverId}/settings/members`">
                    <li>Members</li>
                </NuxtLink>
                <NuxtLink class="button">
                    <li>Banned users</li>
                </NuxtLink>
            </ul>
        </div>

        <slot></slot>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const routes = useRoute()

const sidebarRef = ref(null)
const contentRef = ref(null)
const inputRef = ref('title')
let startX = 0;


const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
};
const handleTouchMove = (e) => {
    const sidebar = sidebarRef.value
    const touchX = e.touches[0].clientX;
    if (startX > touchX + 50) {
        sidebar.style.transform = 'translateX(-100%)'

    }
    else if (startX < touchX - 50) {
        sidebar.style.transform = 'translateX(0%)'
    }
}

onMounted(() => {
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)

})
</script>

<style scoped>
.screen {
    display: grid;
    grid-template-columns: 20rem 1fr;
    height: 100vh;
}

.sidebar {
    z-index: 1;
    transition: 450ms;
    background-color: var(--clr-ui-primary);
    text-align: center;
    height: 100%;
}

ul {
    list-style: none;
}

.sidebar li {
    color: var(--clr-text-primary);
    cursor: pointer;
    margin: 1rem;
}

@media only screen and (max-width: 830px) {
    .sidebar {
        position: absolute;
        width: 100%;

    }

    .screen {
        grid-template-columns: 1fr;
    }
}
</style>