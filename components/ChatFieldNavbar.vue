<template>
    <div id="header" ref="headerRef">
        <ChatCard disabled id="chatCard" :name="name" />
        <input id="searchChat" type="text" placeholder="Search in the chat" ref="searchRef">
        <div id="functions">
            <Icon id="search" name="mdi:magnify" size="150%" @click="handleSearchbarMove()" />
            <Icon name="mdi:phone-in-talk" size="150%" />
            <Icon name="mdi:account-box-outline" size="150%" />
        </div>
    </div>

</template>

<script setup>
const { name } = defineProps({
    'name': {
        type: String,
        default: "Chat" //TODO could be set to the current chat name or title
    }
})
const headerRef = ref(null)
const searchRef = ref(null)
let appearance = true



const handleSearchbarMove = () => {
    if (appearance == false) {
        searchRef.value.style.display = 'none'

        appearance = true
    }
    else if (appearance == true) {
        searchRef.value.style.display = 'block'
        appearance = false
    }


}

</script>

<style scoped>
#header {
    width: 100%;
    background-color: var(--clr-ui-primary);
    display: grid;
    grid-template-areas: "profile search buttons";
    grid-template-columns: 1fr min-content min-content;
    grid-template-rows: min-content min-content;
    align-items: center;
    transition: linear .3s;
    padding-block: .2rem;
}

#functions {
    margin-inline: 1rem;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 1rem;
    grid-area: buttons;
    place-items: end;
}

input {
    background-color: var(--clr-ui-secondary);
    opacity: 7;
    border: none;
    border-radius: var(--border-rounded);
    height: 2.875rem;
    text-align: center;
    color: var(--clr-text-primary);
    display: block;

}

#searchChat {
    grid-area: search;

}

#chatCard {
    grid-area: profile;
}




#search {
    display: none;
}

@media only screen and (max-width: 468px) {
    #header {
        grid-template-areas: "profile buttons" "search search ";
    }

    #search {
        display: block;
    }

    #searchChat {
        display: none;
        margin: .3rem;
        grid-column: span 2;
    }

}
</style>