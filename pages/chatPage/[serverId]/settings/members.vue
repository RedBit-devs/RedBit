<template>
    <div>
        <div class="close ">
            <NuxtLink to="/chatPage">
                <Icon name="mdi:close" size="550%" class="btn primary" />
            </NuxtLink>
        </div>
        <div class="members">
            <h2 class="text-big">Chats of the server</h2>
            <div class="pageContent">

            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.members h2 {
  text-align: center;
  text-transform: capitalize;
}
</style>