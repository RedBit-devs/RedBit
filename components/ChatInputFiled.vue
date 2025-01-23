<template>
    <div class="inputField">
        <button class="btn ui-primary">
            <Icon name="mdi:file" size="150%" />
        </button>
        <input type="text" class="textInput">
        <button class="btn ui-primary">
            <Icon name="mdi:arrow-left-bottom" size="150%" />
        </button>
    </div>
</template>

<script setup>

</script>

<style scoped>
.inputField {
    padding: .5rem;
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