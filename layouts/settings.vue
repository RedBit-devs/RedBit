<template>
    <div class="screen">

        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

const sidebarRef = ref(null)
const contentRef = ref(null)
let startX = 0;



const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
};
const handleTouchMove = (e) => {
    const sidebar = sidebarRef.value
    const content = contentRef.value
    const touchX = e.touches[0].clientX;
    if (startX > touchX + 50) {
        sidebar.style.transform = 'translateX(-100%)'

    }
    else if (startX < touchX - 50) {
        sidebar.style.transform = 'translateX(0%)'
    }
}
onMounted(() => {
    document.addEventListener('touchstart', handleTouchStart)





})

</script>

<style scoped>
.screen {
    display: grid;
    grid-template-columns: 22rem 1fr;
    height: 100vh;
}

nav {
    background-color: var(--clr-ui-primary);
}

nav h1 {
    text-align: center;
    text-transform: capitalize;
}

ul {
    text-align: center;

}

li {
    padding: .5rem;
    color: var(--clr-text-primary);
}

li:hover {
    background-color: var(--clr-ui-secondary);
}

.content {
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
}
</style>