<template>
    <div id="screen">
        <div id="sidebar" ref="sidebarRef">
            <ServerSelector id="serverSelector" />
            <ChatSelector id="chatSelector" />
            <DiscoverServers id="discoverServers" />
            <UserCard id="userCard" />
        </div>
        <div id="content" ref="contentRef">
            <slot>

            </slot>
        </div>
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
    display: flex;
    transition: 1s;
    display: grid;
    grid-template-areas: "servers chats" "discover user";
    grid-template-rows: 1fr min-content;
    min-height: 100vh;
    z-index: 1;

}

#userCard {
    grid-area: user;
}

#content {
    position: absolute;
    display: block;
}

@media only screen and (max-width:1350px) {
    #serverSelector {
        width: 5rem;
    }


    #chatSelector {
        width: 20rem;
    }

    #discoverServers {
        width: 5rem;
    }
}


@media only screen and (max-width:1120px) {
    #serverSelector {
        width: 4rem;
    }

    #chatSelector {
        width: 18rem;
    }

    #discoverServers {
        width: 4rem;
    }

}
</style>