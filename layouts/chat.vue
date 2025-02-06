<template>
    <div id="screen">
        <div id="sidebar" ref="sidebarRef">
            <ServerSelector :add-server-func="() => {
                appearRef = true
            }" id="serverSelector" />
            <ChatSelector id="chatSelector" />
            <DiscoverServers id="discoverServers" />
            <UserCard id="userCard" />
        </div>
        <div id="content" ref="contentRef">
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
    height: 100vh;
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