<template>
    <div id="card" v-if="cardData != undefined">

        <!--If  cardData.imageUrl starts with 'icon:' then it will use the icon and not look for an image-->

        <Icon v-if="cardData.imageUrl.startsWith('icon:')" size="3rem" :name="cardData.imageUrl.replace('icon:', '')"
            style="color: var(--clr-text-primary)" />
        <img v-else id="headerImage" :src="cardData.imageUrl" alt="" v-if="cardData.imageUrl">
        <h1 class="text text-medium" v-if="cardData.headerText">{{ cardData.headerText }}</h1>
        <div id="bubbles" v-if="cardData.bubbles">
            <a v-for="(bubble, i) in cardData.bubbles" :key="i" :href="bubble.url" target="_blank">
                <img :src="bubble.imageUrl" :alt="bubble.name">
            </a>
        </div>
        <span id="description" class="text" v-if="cardData.description">
            {{ cardData.description }}
        </span>
    </div>
</template>

<style scoped>
#card {
    background: var(--clr-canvas);
    border-radius: var(--border-rounded);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 21rem;
    height: 25.2rem;

    /*elevate */
    box-shadow: 10px 10px 21px 1px rgb(from var(--clr-text-inverse) r g b / .6);
}

#headerImage {
    border-radius: 100%;
    width: 30%;
}

#bubbles {
    display: flex;
    gap: 1rem;
}

#bubbles img {
    width: 1.5rem;
    border-radius: 100%;
}

#description {
    overflow-y: auto;
}
</style>

<script lang="ts" setup>
const { cardData } = defineProps({
    "cardData": {
        type: Object as PropType<CardData>
    }
})
</script>