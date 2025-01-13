<template>
    <div id="screen">
        <div id="sidebar" ref="sidebarRef">
            <ServerSelector />
            <ChatSelector />
            <DiscoverServers />
            <UserCard id="userCard" />
        </div>
        <div id="content" ref="contentRef"></div>
        <slot>

        </slot>
    </div>

</template>
<script setup>

import { ref, onMounted } from 'vue'

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
        sidebar.style.zIndex = '1'
        content.style.zIndex = '2'
        content.style.position = 'absolute'
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
#screen {
    display: flex;
    min-height: 100vh;
}

#swiper {
    position: fixed;

}

#sidebar {
    transition: 1s;
    display: grid;
    grid-template-areas: "servers chats" "discover user";
    grid-template-rows: 1fr min-content;
    min-height: 100vh;

}



#userCard {
    grid-area: user;
}
</style>