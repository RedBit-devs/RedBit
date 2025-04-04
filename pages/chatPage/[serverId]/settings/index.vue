<template>
    <div>
        <div class="close ">
            <NuxtLink to="/chatPage">
                <Icon name="mdi:close" size="550%" class="btn primary" />
            </NuxtLink>
        </div>
        <div class="mainContainer">
            <h1 class="title text-big">main information</h1>
            <div class="pageContent">
                <div class="mainInfo">
                    <div class="imgContainer">
                        <img src="/img/probalogo.png" alt="">
                        <label for="fileInput" id="fileLabel">
                            <Icon name="mdi:pencil" size="200%" />
                        </label>
                        <input type="file" id="fileInput">
                    </div>
                    <div class="data">
                        <div id="name">
                            <h2 v-if="inputRef == 'title'">Name: Kacsa sziget</h2>
                            <input v-if="inputRef == 'input'" type="text" placeholder="Name" class="nameChange">
                        </div>
                        <div id="description">
                            <h2>Description</h2>
                            <p v-if="inputRef == 'title'">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Corrupti harum
                                neque facilis totam
                            </p>
                            <input type="text" v-if="inputRef == 'input'" class="descChange" placeholder="Description">
                        </div>
                        <h2>Owner: Kicsi Kacsa</h2>
                        <h2>Created at: 1.01.01-01:01</h2>
                    </div>
                </div>
                <div class="dataBtns">
                    <button class="btn ok" id="save" disabled>Save</button>
                    <button class="btn secondary" id="modify">Modify</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const inputRef = ref('title')
definePageMeta({
    layout: 'settings'
})

onMounted(() => {
    const saveBtn = document.getElementById('save')
    const modifyBtn = document.getElementById('modify')
    const fileLabel = document.getElementById('fileLabel')
    saveBtn.disabled = true
    fileLabel.style.display = 'none'

    const modiflyClick = () => {

        if (modifyBtn.textContent == "Modify") {
            saveBtn.disabled = false
            fileLabel.style.display = 'flex'
            modifyBtn.textContent = 'Cancel'
            inputRef.value = "input"
        }

        else {
            saveBtn.disabled = true
            fileLabel.style.display = 'none'
            modifyBtn.textContent = 'Modify'
            inputRef.value = 'title'
        }

    }

    const saveClick = () => {
        saveBtn.disabled = true
        modifyBtn.disabled = false
        fileLabel.style.display = 'none'
        modifyBtn.textContent = 'Modify'
        inputRef.value = 'title'
    }

    modifyBtn.addEventListener("click", modiflyClick)
    saveBtn.addEventListener('click', saveClick)
})

</script>

<style scoped>
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
    padding: 1rem;
    border-radius: var(--border-rounded)
}

.mainInfo {
    display: flex;
    gap: 3rem;
    justify-content: center;
    align-items: center;
    min-height: 30rem;
}

.imgContainer img {
    border-radius: 50%;
    height: 20rem;
    display: block;
}

.imgContainer {
    position: relative;
    display: inline-block;

    align-items: center;
}

#fileInput {
    display: none;
}

#fileLabel {
    position: absolute;
    bottom: .1rem;
    right: .1rem;
    display: flex;
    background-color: var(--clr-primary);
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    float: right;
}

#fileLabel:hover {
    background-color: var(--clr-secondary);
}

.data {
    gap: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 50%;
}

.data h2 {
    padding: 1rem;

}

.data>* {
    width: 100%;
    background-color: var(--clr-ui-secondary);
    border-radius: var(--border-rounded);
}

.nameChange {
    border-radius: var(--border-rounded);
    background-color: var(--clr-ui-secondary);
    border: none;
    padding: 1rem;
    color: var(--clr-text-primary);
    width: 100%;
}

.descChange {
    padding: 1rem;
    border-radius: var(--border-rounded);
    width: 100%;
    border-radius: var(--border-rounded);
    background-color: var(--clr-ui-secondary);
    border: none;
    padding: 1rem;
    color: var(--clr-text-primary);
}

#description {
    display: flex;
    flex-direction: column;

}

#description p {
    justify-content: center;
    max-height: 9rem;
    padding: 1rem;
    overflow-y: auto;
    border-radius: var(--border-rounded);
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

    .data {
        width: fit-content;
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