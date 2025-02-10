<template>
    <dialog @click.self="closeDialogFunc" :open="isShown">
        <div class="modal">
            <div class="close">
                <Icon @click.self="closeDialogFunc" name="mdi:close" size="150%" class="btn primary" />
            </div>
            <div class="content">
                <h1 id="title">Create server</h1>
                <div id="inputs">
                    <div class="inputWrapper">
                        <label>Name</label>
                        <input type="text" placeholder="Name">
                    </div>
                    <div class="inputWrapper">
                        <label>Description</label>
                        <input type="text" placeholder="Description">
                    </div>
                </div>
                <div id="visibilityInput">
                    <div id="check">
                        <label>
                            <input type="radio" name="visibility" checked>Public
                        </label>
                    </div>
                    <div id="check">
                        <label>
                            <input type="radio" name="visibility">Private
                        </label>
                    </div>
                </div>
                <div class="submit">
                    <button class="btn primary">Create</button>
                </div>
            </div>
        </div>
    </dialog>
</template>

<script setup>


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
    background-color: var(--clr-ui-primary);
    border-radius: var(--border-rounded);
}

.content {
    display: grid;
    gap: 1rem;
    grid-template-rows: 1fr;
    padding: .8rem 3rem 3.5rem 3rem;
}

.close {
    margin: .5rem;
    display: flex;
    justify-content: end;
    cursor: pointer;
}

#title {
    font-variant: small-caps;
    text-align: center;
}

.inputWrapper {
    gap: .2rem;
    display: flex;
    flex-direction: column;
    padding: 1rem 0 1rem 0;
}

.inputWrapper input {
    background-color: var(--clr-ui-secondary);
    border: none;
    border-radius: var(--border-rounded);
    height: 2.875rem;
    text-align: center;
    color: var(--clr-text-primary);

}

#visibilityInput {
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

label:has([type=radio]) {
    display: flex;
    gap: .3rem;
    align-items: center;
    border: 2px solid var(--clr-primary);
    border-radius: 5rem;
    padding: .5rem 1rem;
}

label:has([type=radio]:not(:disabled)) {
    cursor: pointer;
}

[type=radio] {
    appearance: none;
    width: 1rem;
    height: 1rem;
    flex: 0 0 auto;
    border: inherit;
    border-radius: inherit;
}

label:has([type=radio]:checked) {
    background-color: var(--clr-primary);
    color: #fff;
}

[type=radio]:checked {
    border-color: transparent;
    background: #fff url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" width="1rem" height="1rem"><circle cx="0.5" cy="0.5" r="0.5" fill="none" stroke="%23EF3333" stroke-width="0.05"/><polyline points="0.2,0.5 0.4,0.7 0.8,0.3" style="fill:none;stroke:%23EF3333;stroke-linecap:round;stroke-width:0.1;"/></svg>') no-repeat 50% / 1rem;
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