<template>
    <div id="screen">
        <div id="sidebar" ref="sidebarRef">
            <ServerSelector :servers="servers" :chatgroupsRefresh="chatgroupsRefresh" :add-server-func="() => {
                appearRef = true
            }" id="serverSelector" />
            <ChatSelector v-if="chatgroupsStatus === 'success'" :chatgroups="chatgroups" id="chatSelector" />
            <div v-else-if="chatgroupsStatus === 'pending'" id="chatSelector">Loading... please be patient</div>
            <div v-else id="chatSelector">Click the chosen servers icon.</div>
            <DiscoverServers id="discoverServers" />
            <UserCard id="userCard" />
        </div>
        <div id="content" ref="contentRef">
            <ChatFieldNavbar :serverId="route.params.serverId" />
            <slot>

            </slot>
        </div>
    </div>

    <CreateServer id="dialog" :close-dialog-func="() => {
        appearRef = false
    }" :isShown="appearRef" />
</template>
<script setup>

import { ref, onMounted } from 'vue'

let appearRef = ref(false)
const sidebarRef = ref(null)
const contentRef = ref(null)
let startX = 0;



const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
};
const handleTouchMove = (e) => {
    const sidebar = sidebarRef.value
    const content = contentRef.value
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


const { getToken, tokenRefresh } = useToken();
const route = useRoute()

if (!getToken()) await tokenRefresh()

const { data: servers, refresh: serversRefresh } = useFetch("/api/user/servers", {
    method: "GET",
    headers: {
        "Authorization": getToken()
    },
    transform: (e) => e.data.items
})

const { data: chatgroups, refresh: chatgroupsRefresh, status: chatgroupsStatus } = useFetch(() => `/api/server/get/${route.params.serverId}/rooms/`, {
    method: "GET",
    immediate: false,
    headers: {
        "Authorization": getToken()
    },
    transform: (e) => e.data.items
})

if (route.params.chatId) chatgroupsRefresh();

</script>

<style scoped>
#dialog {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: var(--clr-text-primary);
    z-index: 99;
    border: none;
}

#screen {
    display: grid;
    grid-template-columns: 22rem 1fr;
    max-height: 100vh;
}


#sidebar {
    display: flex;
    transition: 450ms;
    display: grid;
    grid-template-areas: "servers chats" "discover user";
    grid-template-rows: 1fr min-content;
    grid-template-columns: 4rem 1fr;
    height: 100vh;
    z-index: 1;

}

#userCard {
    grid-area: user;
}

#serverSelector {
    overflow-y: auto;
}

#chatSelector {
    overflow-y: auto;
}

#content {
    display: grid;
    grid-template-rows: min-content 1fr;
}

@media only screen and (max-width: 830px) {
    #sidebar {
        position: absolute;
        width: 25rem
    }

    #screen {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }
}
</style>
