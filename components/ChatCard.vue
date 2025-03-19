<template>
    <div class="friend">
        <div v-if="picture != ''" class="profPic"><img :src="picture" alt=""></div>
        <div class="name">
            <h3>{{name}}</h3>
            <p v-if="picture != ''">{{activity}}</p>
        </div>
    </div>
</template>

<script setup>
    const { name, picture, activity } = defineProps({
    'name': {
        type: String,
        default: "mmm"
    },
    'picture': {
        type: String,
        default: ""
    },
    'activity': {
        type: String,
        default: ""
    }
})
</script>

<style scoped>
.friend {
    width: max-content;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: .6rem 0 .6rem .6rem;
    width: 100%;

}

.profPic img {
    height: 2.875rem;
    border-radius: 50%;
}

p {
    color: var(--clr-text-secondary);
}

.friend:hover{
    cursor: pointer;
    background-color: var(--clr-ui-secondary)
}
</style>