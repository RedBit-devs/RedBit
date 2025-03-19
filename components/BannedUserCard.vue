<template>
    <div class="cardContent">
        <div class="data">
            <img src="../img/probalogo.png" alt="">
            <div class="name">
                <h3>Kicsi kacsa</h3>
                <p>Éppen úszik</p>
            </div>
        </div>
        <div class="buttons">
            <button class="btn primary">Remove ban </button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.cardContent {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}

img {
    height: 2.875rem;
    border-radius: 50%;
}

.data {
    display: flex;
    gap: .5rem;
}

button {
    width: fit-content;
}
</style>