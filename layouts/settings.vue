<template>
    <div class="screen">
        <nav>
            <h2>alma</h2>
        </nav>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.screen {
    display: grid;
    grid-template-columns: 22rem 1fr;
    height: 100vh;
}

.content {
    width: 100%;
}
</style>