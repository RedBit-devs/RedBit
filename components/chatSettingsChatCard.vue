<template>
    <div class="cardContent">
        <div class="data">
            <div class="icon">
                <Icon name="mdi:pound" size="150%" />
            </div>
            <div class="name">
                <h3>Kicsi kacsa</h3>
                <p>Éppen úszik</p>
            </div>
        </div>
        <div class="buttons">
            <button class="btn primary">Delete</button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.icon {
    display: flex;
    align-items: center;
}

.cardContent {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}


.cardContent:hover {
    background-color: var(--clr-ui-secondary);
    border-radius: var(--border-rounded);
}

.data {
    display: flex;
    gap: .5rem;
}
</style>