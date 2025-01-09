<template>
    <div class="inputField">
        <button class="btn ui-primary">
            <Icon name="ic:round-insert-drive-file" size="150%" />
        </button>
        <input type="text" class="textInput">
        <button class="btn ui-primary">
            <Icon name="material-symbols-light:subdirectory-arrow-left-rounded" size="150%" />
        </button>
    </div>
</template>

<script setup>

</script>

<style scoped>
.inputField {
    margin: .5rem;
    display: flex;
    gap: 1rem;
    width: 100%;

}

.textInput {
    border-radius: var(--border-rounded);
    width: max-content;
    background-color: var(--clr-ui-primary);
    border: none;
    padding: .5rem;
    color: var(--clr-text-primary);
    width: 100%;
}
</style>