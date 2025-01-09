<template>
    <div class="friend">
        <div class="profPic"><img src="../img/probalogo.png" alt=""></div>
        <div class="name">
            <h3>Kicsi kacsa</h3>
            <p>Éppen úszik</p>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.friend {
    width: max-content;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: .6rem 0 .6rem .6rem;

}

.profPic img {
    height: 2.875rem;
    border-radius: 50%;
}

p {
    color: var(--clr-text-secondary);
}
</style>