<template>
    <nav>
        <h1>RedBit</h1>
        <span class="spacer"></span>

        <label id="isMenuShownLabel"for="isMenuShown"><Icon name="mdi:menu" size="50"/></label>
        <input type="checkbox" id="isMenuShown">
        <menu>
                <!-- TODO This should redirect to chatPage -->
            <NuxtLink class="btn primary" to="/test">Chat</NuxtLink>
            <NuxtLink class="btn " to="#title">Home</NuxtLink>
            <NuxtLink class="btn " to="#about">About</NuxtLink>
            <NuxtLink class="btn " to="#developers">Contacts</NuxtLink>
        </menu>
    </nav>
    <slot style="margin-top: 3.5rem;" />
</template>

<style scoped>
nav{
    position: sticky;
    top: 0;
    background-color: var(--clr-ui-secondary);
    z-index: 42;

    height: 3.5rem;

    display: flex;
    align-items: center;
    padding-inline: 1rem;
}
#isMenuShown{
    display: none;
}
#isMenuShownLabel{
    display: none;
}

.spacer {
    display: flex;
    flex-grow: 1;
}
menu{
    display: flex;
    gap: 1rem;
    align-items: center;
}
@media (max-width:590px) {
    #isMenuShownLabel{
    display: block;
}
    menu{
        background-color: var(--clr-ui-secondary);
        flex-direction: column;
        position: absolute;
        top: 3.5rem;
        right: 0rem;
        transform: scaleY(0);
        transform-origin: top;
        transition: transform ease .3s;
        padding-inline: 1rem;
        padding-bottom: 1rem;
        border-bottom-left-radius: var(--border-rounded);
    }
    input:checked ~ menu, menu:focus-within{
        transform: scaleY(1);
    }
    .btn {
        width: 100%;
        text-align: center;
    }

}
</style>