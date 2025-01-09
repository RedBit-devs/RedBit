<template>
    <div class="container">
        <div class="logo">
            <!--Mivel még nincs megbeszélt logó így szedtem egyet tesztelni a komponenst. Ha lesz végleges majd kicserélem-->
            <nuxt-link to=""><img src="../img/probalogo.png" alt=""></nuxt-link>
        </div>
        <hr>
        <div class="chatList">
            <!--Szintén Mivel még nincsenek szerverek így teszt gyanánt képet használok-->
            <nuxt-link to=""><img src="../img/probalogo.png"></nuxt-link>
            <nuxt-link to=""><img src="../img/probalogo.png"></nuxt-link>
            <nuxt-link to=""><img src="../img/probalogo.png"></nuxt-link>
            <nuxt-link to=""><img src="../img/probalogo.png"></nuxt-link>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.container {
    padding: .5rem;
    display: flex;
    flex-direction: column;
    background-color: var(--clr-ui-secondary);
    width: 5.75rem;
}

.logo img {
    width: 5rem;
    border-radius: var(--border-rounded);
}

hr {
    width: 5rem;
    height: 0.3rem;
    border-radius: var(--border-rounded);
    background-color: var(--clr-ui-primary);
    border: none;
}

.chatList {
    margin-top: .5rem;
    display: flex;
    flex-direction: column;
    width: 5rem;
    justify-content: center;
    align-items: center;
}

.chatList img {
    width: 4rem;
    border-radius: 50%;
}
</style>