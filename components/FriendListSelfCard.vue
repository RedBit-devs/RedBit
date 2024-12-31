<template>
    <div class="selfContainer">
        <div class="profPic">
            <img src="../img/probalogo.png" alt="">
        </div>
        <div class="items">
            <div class="name">
                <h4>Kicsi kacs</h4>
                <h5>Úszik</h5>
            </div>
            <div class="mircophone">
                <Icon name="mingcute:mic-line" />
            </div>
            <div class="headset">
                <Icon name="mingcute:headphone-line" />
            </div>
            <div class="settings">
                <Icon name="mingcute:settings-5-line" />
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.selfContainer {

    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding-inline: .5rem;
    position: absolute;
    bottom: 0;
    padding: 1rem 1rem .5rem 1rem;
    align-self: center;
}

.items {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;

}

.name {
    text-align: center;
}

img {
    height: 4rem;
    border-radius: 50%;
}

span {
    width: 1.5rem;
    height: 1.5rem;
}
</style>