<template>
    <div class="container">
        <div class="logo">
            <!--Mivel még nincs megbeszélt logó így szedtem egyet tesztelni a komponenst. Ha lesz végleges majd kicserélem-->
            <nuxt-link to=""><img src="../img/probalogo.png" alt=""></nuxt-link>
        </div>
        <hr>
        <div class="chatList">
            <!--Szintén Mivel még nincsenek szerverek így teszt gyanánt képet használok-->
            <NuxtLink v-for="server in servers" :key="server?.id" :to="`/chatpage/${server?.id}/`"><img :title="server?.name" :src="server?.picture" :alt="server?.name?.slice(0,2)"></NuxtLink>

            <div @click="() => {
                addServerFunc()
            }" id="addServer">
                <Icon name="mdi:plus" size="120%" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const { addServerFunc, servers } = defineProps({
    'addServerFunc': {
        type: Function,
        default: () => { }
    },
    'servers': {
        default: []
    }
})


</script>

<style scoped>
.container {
    padding: .5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--clr-ui-secondary);
}

.logo img {
    width: 100%;
    border-radius: var(--border-rounded);
}

hr {
    width: 90%;
    height: 0.3rem;
    border-radius: var(--border-rounded);
    background-color: var(--clr-ui-primary);
    border: none;
}

.chatList {
    margin-top: .5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-inline: .3rem;
    overflow-y: auto;
}

.chatList img {
    width: 100%;
    border-radius: 50%;
}

#addServer {
    display: flex;
    width: 100%;
    height: 2.5rem;
    background-color: var(--clr-ui-primary);
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: var(--clr-text-primary);
}
</style>