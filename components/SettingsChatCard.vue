<template>
    <div class="container">
        <div class="data">
            <Icon name="mdi:pound" size="200%" />
            <h2>Chat name</h2>
        </div>
        <Icon name="mdi:dots-vertical" size="200%" />
    </div>
</template>

<script setup>

</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid white;
    padding: 1rem;
    margin: .5rem;
}

.data {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>