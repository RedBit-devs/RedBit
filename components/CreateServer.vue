<template>
    <dialog @click="closeDialogFunc" :open="isShown">
        <div class="modal">
            <div class="close">
                <Icon @click="closeDialogFunc()" name="mdi:close" size="150%" class="closeBtn" />
            </div>
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
            <div class="submit">
                <button class="btn primary">Create</button>
            </div>
        </div>
    </dialog>
</template>

<script setup>

import { ref } from 'vue';

const { isShown } = defineProps({
    'isShown': {
        type: Boolean,
        default: false
    },
    "closeDialogFunc": {
        type: Function,
        default: () => { }
    }
})

const dialogRef = ref(null)


const closedialog = (event) => {
    dialogRef.value.close()

}


</script>

<style scoped>
dialog {
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / .2);
    position: relative;
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    gap: 1rem;
    grid-template-rows: 1fr;
    background-color: var(--clr-ui-primary);
    width: fit-content;
    padding: .8rem;
    border-radius: var(--border-rounded);
}

.close {
    display: flex;
    justify-content: end;
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

.submit {
    display: flex;
    justify-content: center;
}

dialog::backdrop {
    background-color: black;
    opacity: .5;
}
</style>