<template>
    <div class="modal">
        <h1 id="title">Create server</h1>
        <div id="inputs">
            <div class="input">
                <label>Name</label>
                <input type="text" placeholder="Name">
            </div>
            <div class="input">
                <label>Description</label>
                <input type="text" placeholder="Description">
            </div>
        </div>
        <div id="visibility">
            <div id="check">
                <input id="visibilityPublic" type="radio" name="visibilty">
                <label for="visibilityPublic">Public</label>
            </div>
            <div id="check">
                <input id="visibilityPrivate" type="radio" name="visibilty">
                <label for="visibilityPrivate">Private</label>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.modal {
    display: grid;
    gap: 1rem;
    grid-template-rows: 1fr;
    background-color: var(--clr-ui-primary);
    width: fit-content;
    padding: .8rem;
    border-radius: var(--border-rounded);
}

#title {
    font-variant: small-caps;
}

.input {
    gap: .2rem;
    display: flex;
    flex-direction: column;
    padding: 1rem 0 1rem 0;
}

.input input {
    background-color: var(--clr-ui-secondary);
    border: none;
    border-radius: var(--border-rounded);
    height: 2.875rem;
    text-align: center;
    color: var(--clr-text-primary);

}

#visibility {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
}

#check {
    display: flex;
    gap: .3rem;
    justify-content: center;
    align-items: center;
}

input:checked~label {
    color: var(--clr-primary);
    outline: 3px solid var(--clr-primary);
    outline-offset: .3rem;
    border-radius: var(--border-rounded);
}

input[type="radio"] {
    appearance: none;
}
</style>