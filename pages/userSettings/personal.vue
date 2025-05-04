<template>
    <div>
        <div class="close ">
            <NuxtLink to="/chatPage">
                <Icon name="mdi:close" size="550%" class="btn primary" />
            </NuxtLink>
        </div>
        <h1 class="title text-big">Personal information</h1>
        <div class="pageContent">
            <div class="mainInfo">
                <div class="datas">
                    <div class="data">
                        <h2 v-if="inputRef == 'title'">First name: {{userData?.first_name}}</h2>
                        <input v-if="inputRef == 'input'" ref="firstNameRef" type="text" placeholder="First name" :value="userData?.first_name" class="nameChange">
                        <h2 v-if="inputRef == 'title'">Last name: {{userData?.last_name}}</h2>
                        <input v-if="inputRef == 'input'" ref="lastNameRef" type="text" placeholder="Last name" :value="userData?.last_name" class="nameChange">
                    </div>
                    <div class="data">
                        <h2 v-if="inputRef == 'title'">Email: {{userData?.email}}</h2>
                        <input v-if="inputRef == 'input'" ref="emailRef" type="text" placeholder="Email" :value="userData?.email" class="nameChange">
                    </div>
                    <div class="data">
                        <h2 v-if="inputRef == 'title'">Birth date: {{userData?.birthdate}}</h2>
                        <input v-if="inputRef == 'input'" ref="birthdateRef" type="date" class="nameChange">
                    </div>
                </div>
            </div>
            <div class="dataBtns">
                <button class="btn ok" id="save" disabled @click="patchUser">Save</button>
                <button class="btn secondary" id="modify">Modify</button>
            </div>
        </div>
        <div class="toaster">
            <Toast v-for="err in patchUserError" :title="err.reason.toString()" :content="err.message"
                class="danger" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

const inputRef = ref('title')
definePageMeta({
    layout: "user"
})

onMounted(() => {
    const saveBtn = document.getElementById('save')
    const modifyBtn = document.getElementById('modify')
    saveBtn.disabled = true

    const modiflyClick = () => {

        if (modifyBtn.textContent == "Modify") {
            saveBtn.disabled = false
            modifyBtn.textContent = 'Cancel'
            inputRef.value = "input"
        }

        else {
            saveBtn.disabled = true
            modifyBtn.textContent = 'Modify'
            inputRef.value = 'title'
        }

    }

    const saveClick = () => {
        saveBtn.disabled = true
        modifyBtn.disabled = false
        modifyBtn.textContent = 'Modify'
        inputRef.value = 'title'
    }

    modifyBtn.addEventListener("click", modiflyClick)
    saveBtn.addEventListener('click', saveClick)
})

const { getToken, tokenRefresh } = useToken()

const firstNameRef = ref(null)
const lastNameRef = ref(null)
const emailRef = ref(null)
const birthdateRef = ref(null)


if (!getToken()) await tokenRefresh()

const { data: userData, refresh: refreshUserData } = useFetch("/api/user/", {
    method: "GET",
    server: false,
    headers: {
        "Authorization": getToken()
    },
    transform: r => r.data.items[0],
})


const { refresh: patchUser, error: patchUserError } = useFetch("/api/user/", {
    method: "PATCH",
    server: false,
    immediate: false,
    headers: {
        "Authorization": getToken()
    },
    onRequest({ options }) {
        options.body = {
            first_name: firstNameRef.value.value,
            last_name: lastNameRef.value.value,
            email: emailRef.value.value,
            //birthdate: birthdateRef.value.value,
        }
    },
    onResponse() {
        refreshUserData()
    }
})


</script>

<style scoped>
.close {
    text-align: right;
}

.title {
    text-align: center;
}

.pageContent {
    background-color: var(--clr-ui-primary);
    margin: 1rem 4rem;
    padding: 1rem;
    border-radius: var(--border-rounded)
}

.mainInfo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 30rem;
}

.datas {
    gap: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;

}

h2 {
    padding: 1rem;
    text-align: center;
    background-color: var(--clr-ui-secondary);
    border-radius: var(--border-rounded);
    color: var(--clr-text-primary);
    width: 100%;
}

.datas>* {
    width: 100%;
}

.data {
    display: flex;
    gap: 2rem;
    justify-content: center;
}


.nameChange {
    border-radius: var(--border-rounded);
    background-color: var(--clr-ui-secondary);
    border: none;
    padding: 1.3rem;
    color: var(--clr-text-primary);
    width: 100%;

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

@media only screen and (max-width:1044px) {
    .mainInfo {
        flex-direction: column;
    }

    .datas {
        width: 80%;
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

    .pageContent {
        margin: 2rem .2rem;
        padding: .5rem;
    }

    h2 {
        font-size: 1.3rem;
        width: fit-content;
    }

}
</style>