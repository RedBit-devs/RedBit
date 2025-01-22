<template>
    <div class="selfContainer">
        <div class="profPic">
            <img src="../img/probalogo.png" alt="">
        </div>
        <div class="items">
            <div class="name">
                <h4>Kicsi kacs</h4>
                <p>Úszik</p>
            </div>
            <div class="buttons">
                <div class="mircophone">
                    <Icon name="mingcute:mic-line" size="150%" />
                </div>
                <div class="headset">
                    <Icon name="mingcute:headphone-line" size="150%" />
                </div>
                <div class="settings">
                    <Icon name="mingcute:settings-5-line" size="150%" />
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
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 1rem .5rem 1rem;
    align-self: center;
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
    height: 4rem;
    border-radius: 50%;
}

p {
    color: var(--clr-text-secondary);
}

@media only screen and (max-width:1120px) {
    img {
        height: 3rem;
    }

    .selfContainer {
        gap: .5rem;
    }
}
</style>