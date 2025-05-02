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
                <div v-if="currentPage == 'data'" class="content">
                    <div id="profPic">
                        <img v-if="userData?.profile_picture" :src="userData?.profile_picture" alt="profile">
                        <Icon v-else name="mdi:account" size="15rem" :title="`${userData?.username}`" />
                    </div>
                    <div id="dataField">
                        <div class="data">
                            <h2 id="username">{{userData?.username}}</h2>
                        </div>
                        <div class="data">
                            <p id="title">Description</p>
                            <h2 id="description">
                                {{userData?.description}}
                            </h2>
                        </div>
                    </div>
                </div>
                <div v-if="currentPage == 'comFriend'" class="contentWithTitle">
                    <div class="data">
                        <p class="text-big title">Common Friends</p>
                    </div>

                    <!-- ALEX i can not figure out what is returned in your API -->
                    <!--{{commonFriends}}-->
                    <div id="list">
                        <ChatCard />
                    </div>
                </div>
                <div v-if="currentPage == 'comServer'" class="contentWithTitle">
                    <div class="data">
                        <p class="text-big title">Common Servers</p>
                    </div>
                    <div id="list">
                        <NuxtLink v-for="(server, i) in commonServers" :to="`/chatPage/${server.id}`">
                            <ChatCard  :key="i" :name="server.name" :picture="server.picture"/>

                        </NuxtLink>
                    </div>
                </div>
                <div v-if="currentPage == 'manage'" class="contentWithTitle">
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

const { closeDialogFunc, isDialogOpen, userId, auth } = defineProps({
    closeDialogFunc: {
        type: Function,
        default: () => { }
    },

    isDialogOpen: {
        type: Boolean,
        default: ref(false)
    },
    userId: {
        type: String,
        default: ""
    },
    auth: {
        type: String,
        default: ""
    }
})

const currentPage = useState("asd", ()=>"data")

onMounted(() => {
    const button = document.getElementsByClassName('buttonContainer')
    const pages = ['data', 'comFriend', 'comServer', 'manage']
    const btnArray = [...button]
    button[0].style.backgroundColor = "var(--clr-ui-primary)"

    for (let i = 0; i < btnArray.length; i++) {
        button[i].onclick = function () {
            currentPage.value = pages[i%pages.length]
            button[i].style.backgroundColor = "var(--clr-ui-primary)"
            btnArray.map(m => {
                if (m !== button[i]) {
                    m.style.backgroundColor = "var(--clr-ui-secondary)"
                }
            })
        }
    }
})


const { data: userData } = useFetch(()=> `/api/user/get/${userId}`, {
    method: "GET",
    server: false,
    headers: {
        "Authorization": auth
    },
    transform: r => r.data.items[0]
})

const { data: commonFriends } = useFetch(()=> `/api/user/shared/friends/${userId}`, {
    method: "GET",
    server: false,
    headers: {
        "Authorization": auth
    },
    transform: r => r.data.items
})
const { data: commonServers } = useFetch(()=> `/api/user/shared/servers/${userId}`, {
    method: "GET",
    server: false,
    headers: {
        "Authorization": auth
    },
    transform: r => r.data.items
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
    max-height: 45rem;
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

.content {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
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
    height: min-content;

}

#dataField h2 {
    text-align: center;
    background-color: var(--clr-ui-secondary);
    padding: .5rem;
    border-radius: var(--border-rounded);
    overflow-y: auto;
}

#description {
    height: fit-content;
    max-height: 9rem;
    width: 20rem;
    padding: .5rem;
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

#list > *{
    height: fit-content;
    width: 100%;
}

.contentWithTitle {
    width: 100%;
}

dialog {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0 0 0 /.3);
}


@media only screen and (max-width:900px) {
    #cardContainer {
        width: 90%;
    }

    #page {
        width: 100%;
    }

    #profPic {
        height: 80%;
    }

    #profPic img {
        height: 100%;
    }





    @media only screen and (max-width:740px) {
        #profPic img {
            height: 11rem;
        }

        #page {
            min-height: 30rem;
            height: fit-content;
            justify-content: center;
            align-items: center;
        }

        #list {
            min-height: 30rem;
        }

        #content {
            height: min-content;
        }

        #dataField {
            width: 100%;
            justify-content: center;
            align-items: center;
        }

        #username {
            width: max-content;
        }

        #description {
            width: 20rem;
        }

    }
}

@media only screen and (max-width:600px) {
    #content {
        flex-direction: column;
    }

    #profPic img {
        height: 8rem;
    }

    #description {
        width: 20rem;
    }
}
</style>