<template>
    <main class="screen">
        <div v-if="status === 'success'">
            <h1>Email successfully verified.</h1>
        </div>
        <div v-else-if="status === 'error'">
            <h1>Validating the email failed, try again later</h1>

        </div>
        <div v-else>
            <h1>Verifying the email. (please wait)</h1>
        </div>

        <section class="toaster">
            <Toast v-for="(error, index) in error?.data?.data" :key="index" class="danger" :title="error.reason"
                :content="error.message" />
            <Toast v-for="(t, index) in toasts" :key="index" class="danger" :title="t.title" :content="t.content" />
        </section>
    </main>
</template>
<script lang="ts" setup>
const toasts = ref([])
const route = useRoute();
const { data, status, error, refresh } = await useFetch(`/api/user/verifyEmail`, {
    query: {
        email: route.query.email,
        id: route.query.id
    },
    immediate: false
})
if (route.query.email && route.query.id) {
    refresh()
} else {
    toasts.value.push({ title: "Query params missing", content: `email=${route.query.email}&id=${route.query.id}` })
}
</script>
<style scoped>
.screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 3.5rem);
}

div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--clr-ui-primary);
    width: fit-content;
    gap: 1rem;
    padding: 2rem;
    border-radius: var(--border-rounded);
}
</style>