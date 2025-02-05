<template>
    <dialog :open="isDialogOpen">
        <div id="cardContainer">
            <div id="close" @click="closeDialogFunc()">
                <Icon name="mdi:close" size="150%" class="btn primary" />
            </div>
            <div id="navigation">
                <button class="buttonContainer">
                    <Icon name="mdi:account" size="100%" class="icon" />
                </button>
                <button class="buttonContainer ">
                    <Icon name="mdi:account-multiple" size="100%" class="icon" />
                </button>
                <button class="buttonContainer">
                    <Icon name="mdi:server" size="100%" class="icon" />
                </button>
                <button class="buttonContainer">
                    <Icon name="mdi:cog" size="100%" class="icon" />
                </button>
            </div>
            <div id="page">
                <div v-if="currentPage == 'data'" id="content">
                    <div id="profPic">
                        <img src="../img/probalogo.png" alt="alma">
                    </div>
                    <div id="dataField">
                        <div class="data">
                            <p id="title">Username</p>
                            <h2 id="username">Kics kacsa</h2>
                        </div>
                        <div class="data">
                            <p id="title">Description</p>
                            <h2 id="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt,
                                sunt.
                            </h2>
                        </div>
                    </div>
                </div>
                <div v-if="currentPage == 'comFriend'" id="contentFriend">
                    <div class="data">
                        <p class="text-big title">Common Friends</p>
                    </div>
                    <div id="list">
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                    </div>
                </div>
                <div v-if="currentPage == 'comServer'" id="contentFriend">
                    <div class="data">
                        <p class="text-big title">Common Servers</p>
                    </div>
                    <div id="list">
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                    </div>
                </div>
                <div v-if="currentPage == 'manage'" id="contentManage">
                    <div class="data">
                        <p class="text-big title">Manage friendship</p>
                    </div>
                    <div id="options">
                        <p>Friends since: the begining</p>
                        <button class="btn primary">Remove friend</button>
                    </div>
                </div>
            </div>
        </div>
    </dialog>
</template>

<script setup>
import { onMounted } from 'vue';

const { closeDialogFunc, isDialogOpen } = defineProps({
    closeDialogFunc: {
        type: Function,
        default: () => { }
    },

    isDialogOpen: {
        type: Boolean,
        default: ref(false)
    }
})

const currentPage = ref("data")

onMounted(() => {
    const button = document.getElementsByClassName('buttonContainer')
    const pages = ['data', 'comFriend', 'comServer', 'manage']
    const btnArray = [...button]
    button[0].style.backgroundColor = "var(--clr-ui-primary)"

    for (let i = 0; i < btnArray.length; i++) {
        button[i].onclick = function () {
            currentPage.value = pages[i]
            button[i].style.backgroundColor = "var(--clr-ui-primary)"
            btnArray.map(m => {
                if (m !== button[i]) {
                    m.style.backgroundColor = "var(--clr-ui-secondary)"
                }
            })
        }
    }
})



</script>

<style scoped>
#cardContainer {
    width: 50rem;
    background-color: var(--clr-ui-primary);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

#close {
    text-align: right;
}

#navigation {
    display: flex;
    justify-content: space-around;
    background-color: var(--clr-ui-secondary);
    height: 5rem;
}


.buttonContainer {
    width: 100%;
    transition: .3s;
    border: none;
    background-color: var(--clr-ui-secondary);

}

.icon {
    width: 100%;
    height: 3rem;
    margin: 1rem 0rem;
    color: white;
}

.buttonContainer:hover {
    background-color: var(--clr-ui-primary);
}


#page {
    display: flex;
    background-color: var(--clr-ui-primary);
    width: 50rem;
    height: 20rem;
}

#content {
    display: flex;
    width: 100%;
}


#profPic {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: fit-content;
}

#profPic img {
    margin: 1rem;
    height: 80%;
    border-radius: 100%;
}

#dataField {
    width: 50%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

}

#dataField h2 {
    text-align: center;
    background-color: var(--clr-ui-secondary);
    padding: .2rem;
    border-radius: var(--border-rounded);
    overflow-y: scroll;
}

#description {
    height: fit-content;
    max-height: 9rem;
    width: 100%;
}

.data p {
    width: max-content;
}

#options {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

#list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    overflow-y: scroll;
    height: 18rem;
}

#contentFriend {
    width: 100%;
    overflow: hidden;
}

#contentManage {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

#contentManage button {
    width: max-content;
}

dialog {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0 0 0 /.3);
}
</style>