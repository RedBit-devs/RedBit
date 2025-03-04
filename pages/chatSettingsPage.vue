<template>
  <div class="content">
    <div class="close ">
      <NuxtLink to="/chatPage">
        <Icon name="mdi:close" size="550%" class="btn primary" />
      </NuxtLink>
    </div>
    <h1 class="title text-title">Chat settings</h1>
    <div class="mainInfo">
      <img src="../img/probalogo.png" alt="">

      <div class="data">
        <h2>Server name: Kacsa sziget</h2>
        <h2>Owner: Kicsi Kacsa</h2>
        <h2>Created at: 1.01.01</h2>
      </div>
    </div>
    <div class="members">
      <h2 class="text-title ">Members of the chat</h2>
      <div class="cardContainer">
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
    </div>


  </div>
</template>

<script setup>
definePageMeta({
  layout: 'settings'
})

</script>

<style scoped>
.content {
  display: grid;
  grid-template-rows: 1fr;
  gap: 3rem;
  height: 100vh;
  overflow-y: scroll;
}

.close {
  text-align: right;
}

.title {
  text-align: center;
  text-transform: capitalize;
}

.mainInfo {
  display: flex;
  gap: 3rem;
  justify-content: center;
}

.mainInfo img {
  border-radius: 50%;
  height: 20rem;
}

.data {
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.data h2 {
  background-color: var(--clr-ui-primary);
  border-radius: var(--border-rounded);
  padding: 1rem;

}

.members h2 {
  text-align: center;
  text-transform: capitalize;
}
</style>