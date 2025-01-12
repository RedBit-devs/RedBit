<template>
    <div class="container">
        <NuxtLink>
            <Icon name="mdi:web" style="color: white;" size="300%" />
        </NuxtLink>

    </div>
</template>

<script setup>

</script>

<style scoped>
.container {
    width: 5.75rem;
    background-color: var(--clr-ui-secondary);
    display: flex;
    justify-content: center;
    align-items: center;
}

@media only screen and (max-width: 1350px) {
    .container {
        width: 5rem;
    }

}

@media only screen and (max-width:1120px) {
    .container {
        width: 4rem;
    }
}
</style>