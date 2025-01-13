<template>
    <div id="screen">
        <div id="sidebar">
            <ServerSelector />
            <ChatSelector />
            <DiscoverServers />
            <UserCard id="userCard" />
        </div>
        <div id="content">
            <slot>

            </slot>
        </div>
    </div>

</template>
<script setup>



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