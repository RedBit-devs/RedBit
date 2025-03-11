<template>
  <div class="page">
    <div ref="sidebarRef" class="sidebar">
      <h1 class="text-title">Chat settings</h1>
      <ul class="text-medium">
        <NuxtLink class="button">
          <li>Main infromation</li>
        </NuxtLink>
        <NuxtLink class="button">
          <li>Chats</li>
        </NuxtLink>
        <NuxtLink class="button">
          <li>Members</li>
        </NuxtLink>
        <NuxtLink class="button">
          <li></li>
        </NuxtLink>
      </ul>
    </div>
    <div class="settings" ref="contentRef">
      <div class="close ">
        <NuxtLink to="/chatPage">
          <Icon name="mdi:close" size="550%" class="btn primary" />
        </NuxtLink>
      </div>
      <div v-if="currentPage == 'main'" class="mainContainer">
        <h1 class="title text-big">main information</h1>
        <div class="pageContent">
          <div class="mainInfo">
            <img src="../img/probalogo.png" alt="">
            <div class="data">
              <h2>Name: Kacsa sziget</h2>
              <h2>Owner: Kicsi Kacsa</h2>
              <h2>Created at: 1.01.01-01:01</h2>
            </div>
          </div>
          <div class="dataBtns">
            <button class="btn ok" disabled>Save</button>
            <button class="btn tertiary" disabled>Upload image</button>
            <button class="btn secondary">Modify</button>
          </div>
        </div>
      </div>
      <div v-if="currentPage == 'chats'" class="chats">
        <h2 class="text-big">Chats of the server</h2>
        <div class="cardContainer">
          <ChatSettingsChatCard />
          <ChatSettingsChatCard />
          <ChatSettingsChatCard />
          <ChatSettingsChatCard />
          <ChatSettingsChatCard />
        </div>
      </div>

      <div v-if="currentPage == 'members'" class="members">
        <h2 class="text-big ">Members of the server</h2>
        <div class="cardContainer">
          <ChaSettingsUserCard />
          <ChaSettingsUserCard />
          <ChaSettingsUserCard />
          <ChaSettingsUserCard />
        </div>
      </div>
    </div>



  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

import { ref, onMounted } from 'vue'

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

const currentPage = ref("main")
onMounted(() => {
  document.addEventListener('touchstart', handleTouchStart)
  document.addEventListener('touchmove', handleTouchMove)

  const button = document.getElementsByClassName('button')
  const pages = ['main', 'chats', 'members']
  const btnArray = [...button]

  for (let i = 0; i < btnArray.length; i++) {
    button[i].onclick = function () {
      currentPage.value = pages[i]
      btnArray.map(m => {
        if (m !== button[i]) {
        }
      })
    }
  }
})


</script>

<style scoped>
.page {
  height: 100vh;
  display: grid;
  grid-template-columns: 22rem 1fr;
  overflow-y: auto;
}

.sidebar {
  z-index: 1;
  transition: 450ms;
  background-color: var(--clr-ui-primary);
  text-align: center;
}

ul {
  list-style: none;
}

.sidebar li {
  color: var(--clr-text-primary);
  cursor: pointer;
  margin: 1rem;
}



.close {
  text-align: right;
}

.settings {
  display: flex;
  flex-direction: column;
  width: 100% !important;
}


.title {
  text-align: center;
  text-transform: capitalize;
}

.pageContent {
  background-color: var(--clr-ui-primary);
  margin: 1rem;
  padding: 2rem;
  border-radius: var(--border-rounded)
}

.mainInfo {
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
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
  padding: 1rem;
}

.dataBtns {
  margin: 1rem;
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  padding: .5rem;
  justify-content: end;
  gap: .5rem;
  background-color: var(--clr-ui-secondary);
  border-radius: var(--border-rounded);
}



.dataBtns button {
  width: max-content;
}

.chats h2 {
  text-align: center;
}

.members h2 {
  text-align: center;
  text-transform: capitalize;
}

@media only screen and (max-width: 830px) {
  .sidebar {
    position: absolute;
    width: 25rem;
    height: 100vh;
  }

  .page {
    grid-template-columns: 1fr;
  }


}

@media only screen and (max-width: 800px) {
  .mainInfo {
    flex-direction: column;
  }

  .dataBtns {
    justify-content: center;
  }

  .mainInfo img {
    height: 15rem;
  }

}
</style>