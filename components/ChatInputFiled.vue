<template>
    <div class="inputField">
        <button class="btn ui-primary">
            <Icon name="ic:round-insert-drive-file" />
        </button>
        <input type="text" class="textInput">
        <button class="btn ui-primary">
            <Icon name="material-symbols-light:subdirectory-arrow-left-rounded" />
        </button>
    </div>
</template>

<script setup>

</script>

<style>
.inputField {
    margin: .5rem;
    display: flex;
    gap: 1rem;

}

.textInput {
    border-radius: var(--border-rounded);
    width: max-content;
    background-color: var(--clr-ui-primary);
    border: none;
    padding: .5rem;
    color: var(--clr-text-primary);

}

span {
    height: 1.5rem;
    width: 1.5rem;
}
</style>