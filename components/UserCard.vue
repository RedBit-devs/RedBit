<template>
    <div class="selfContainer">
        <img src="../img/probalogo.png" alt="">
        <div class="items">
            <div class="name">
                <h4>Kicsi kacs</h4>
                <p>Úszik</p>
            </div>
            <div class="buttons">
                <div class="mircophone">
                    <Icon name="mingcute:mic-line" size="120%" />
                </div>
                <div class="headset">
                    <Icon name="mingcute:headphone-line" size="120%" />
                </div>
                <div class="settings">
                    <Icon name="mingcute:settings-5-line" size="120%" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.selfContainer {
    background-color: var(--clr-ui-primary);
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 1rem .5rem 1rem;
    align-self: center;
    width: 100%;
}

.items {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}


.name {
    text-align: center;
    width: fit-content;
}

.buttons {
    display: flex;
    gap: 1rem;
}

img {
    border-radius: 50%;
    width: 100%;
}

p {
    color: var(--clr-text-secondary);
}

@media only screen and (max-width:1120px) {


    .selfContainer {
        gap: .5rem;
    }
}
</style>