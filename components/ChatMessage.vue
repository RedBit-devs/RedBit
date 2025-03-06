<template>
    <div class="message">
        <div class="message-author-image">
            <img :src="authorImage" :alt="`profile picture of ${authorName}`">
        </div>
        <div class="message-right">
            <h3 class="message-author-name" @click.self="isDialogOpenRef = true">{{ authorName }}</h3>
            <div class="message-content" v-html="content" />
        </div>
        <CheckFriendProfileCard id="dialog" :is-dialog-open="isDialogOpenRef" :close-dialog-func="closeDialogFunc" />
    </div>
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it";

const content = ref("");
const isDialogOpenRef = ref(false)

const closeDialogFunc = () => {
    isDialogOpenRef.value = false
}

const { authorImage, authorName, message } = defineProps({
    authorImage: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true

    },
})


onMounted(() => {
    const md = new MarkdownIt({
        breaks: true,
        linkify: true,

    });
    md.linkify.set({ fuzzyEmail: false });

    content.value = md.render(message);
});
</script>
<style scoped>
.message {
    background-color: var(--clr-ui-primary);
    height: fit-content;
    display: flex;
    gap: 1rem;
    padding: 1rem 2rem;
    width: 100%;
}

.message-author-name {
    width: fit-content;
}

.message-author-image img {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
}

.message-right {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.message-content {
    text-align: left;
    color: var(--clr-text-secondary);
    font-size: .8rem;
}

.message-content {
    font-size: 1rem;

}

#dialog {
    z-index: 999;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    color: var(--clr-text-primary);
    border: none;
    border-radius: var(--border-rounded);
}
</style>