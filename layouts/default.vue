<template>
    <nav>
        <h1>Fr a navbar</h1>
    </nav>
    <slot />
</template>

<style scoped>
nav{
    position: sticky;
    top: 0;
    background-color: var(--clr-ui-secondary);
}
</style>