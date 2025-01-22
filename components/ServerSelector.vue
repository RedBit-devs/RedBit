<template>
    <div class="container">
        <div class="logo">
            <!--Mivel még nincs megbeszélt logó így szedtem egyet tesztelni a komponenst. Ha lesz végleges majd kicserélem-->
            <nuxt-link to=""><img src="../img/probalogo.png" alt=""></nuxt-link>
        </div>
        <hr>
        <div class="chatList">
            <!--Szintén Mivel még nincsenek szerverek így teszt gyanánt képet használok-->
            <NuxtLink to=""><img src="../img/probalogo.png"></NuxtLink>
            <NuxtLink to=""><img src="../img/probalogo.png"></NuxtLink>
            <NuxtLink to=""><img src="../img/probalogo.png"></NuxtLink>
            <NuxtLink to=""><img src="../img/probalogo.png"></NuxtLink>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.container {
    padding: .5rem;
    display: flex;
    align-items: center;
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

@media only screen and (max-width:1350px) {

    .logo img {
        width: 4.5rem;
    }

    hr {
        width: 4.25 rem;
    }

    .chatList img {
        width: 3.5rem;
        border-radius: 50%;
    }
}

@media only screen and (max-width:1120px) {

    .logo img {
        width: 3.5rem;
    }

    hr {
        width: 3.25rem;
    }

    .chatList img {
        width: 3rem;
        border-radius: 50%;
    }
}
</style>