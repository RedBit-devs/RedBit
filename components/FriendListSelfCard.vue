<template>
    <div class="container">
        <div class="profPic">
            <img src="../img/probalogo.png" alt="">
        </div>
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
</template>

<script setup>

</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    gap: .7rem;
    padding-inline: .5rem;

}

.name {
    text-align: center;
}

img {
    height: 2.875rem;
    border-radius: 50%;
}
</style>