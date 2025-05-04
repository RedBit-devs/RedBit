<template>
    <div class="selfContainer">
        <img v-if="picture" :src="picture" alt="">
        <Icon v-else name="mdi:account" size="2rem"/>
        <div class="items">
            <div class="name">
                <h4>{{ name }}</h4>
               
            </div>
            <div class="buttons">
                <NuxtLink to="/userSettings" class="settings">
                    <Icon name="mingcute:settings-5-line" size="120%" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// Szia Peti :*. Remélem jól haladtok a projektel. Sok locsolót és boldog karácsonyt. Áradjon a tisza!!!!!
const {name, id, picture} = defineProps({
    "name":{
        type: String
    },
    "picture":{
        type: String
    },
    "id":{
        type: String
    }
})
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