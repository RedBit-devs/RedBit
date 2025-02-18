<template>
    <div id="container">
        <div id="close">
            <NuxtLink to="/chatPage">
                <Icon name="mdi:close" size="550%" class="btn primary" />
            </NuxtLink>
        </div>
        <div id="title">
            <h1>discover servers</h1>
        </div>
        <div id="inputField">
            <input type="text" placeholder="Type here">
            <button class="btn primary">Search</button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
#container {
    display: grid;
    grid-template-rows: 1fr;
}

#close {
    text-align: right;
}

#title {
    text-align: center;
    padding: 1rem;
    font-variant: small-caps;
}

#inputField {
    display: flex;
    padding: .5rem 1rem;
    gap: 1.5rem;
}

#inputField input {
    width: 100%;
    border-radius: var(--border-rounded);
    background-color: var(--clr-ui-primary);
    border: none;
    color: var(--clr-text-primary);
    padding: .4rem;
}
</style>