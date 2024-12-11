<template>
    <nav>
        <h1>RedBit</h1>
        <span class="spacer"></span>
        <menu>
            <NuxtLink class="btn primary" to="/loginPage">chat</NuxtLink>
            <NuxtLink class="btn " to="#title">Home</NuxtLink>
            <NuxtLink class="btn " to="#about">About</NuxtLink>
            <NuxtLink class="btn " to="#developers">Contacts</NuxtLink>
        </menu>
    </nav>
    <slot />
</template>

<style scoped>
nav{
    position: sticky;
    top: 0;
    background-color: var(--clr-ui-secondary);

    height: 55px;

    display: flex;
    align-items: center;
    padding-inline: 1rem;
}
.spacer {
    display: flex;
    flex-grow: 1;
}
menu{
    display: flex;
    gap: 1rem;
}
</style>