<template>
  <div @click="die" class="toast">
    <div class="content">
        <h2>{{ title }}</h2>
        <p v-if="content">
            {{ content }}
        </p>
    </div>
    <Icon name="mdi:alpha-x-box" size="3rem"/>
  </div>
</template>

<script lang="ts" setup>
const {title, content} = defineProps({
    "title":{
        required: true,
        type: String,
    },
    "content":{
        type: String,
    }
})
    const die = (event) => {
        if (event.target.classList.contains("toast")) {
            event.target.remove()
        }else{
            event.target.parentElement.remove()
        }
    }

</script>

<style>
.toaster{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: end;

    position: absolute;
    bottom: 2rem;
    right: 2rem;
}
</style>

<style scoped>

.toast{
    --color: var(--clr-text-primary);
    --background: var(--clr-ui-secondary);
    --elevation: 0px;
   
    border-radius: var(--border-rounded);
    width: fit-content;
    max-width: 25rem;
    max-height: 12rem;
    background-color: var(--background);
    color: var(--color);
    padding-block: 1rem;
    padding-inline: 2rem 1rem;
    box-shadow: 0 var(--elevation) calc(10px + var(--elevation) / 1.2) 0px rgb(from var(--background) r g b / .4);
    transform: translateY(calc(-1 * var(--elevation)/2));

    transition: ease .3s;


    display: grid;
    grid-template-columns: 1fr min-content;
    place-items: center;
    gap: 1rem;


    position: absolute;
    bottom: 2rem;
    right: 2rem;
}
.toaster .toast{
    position: static;
    bottom: unset;
    right: unset;
}

.toast *:not(div){
    pointer-events: none;
}

.toast:hover{
    --elevation: 10px;
}
.toast:active{
    --elevation: 0px;
}

.content{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-right: 1rem;
    overflow-wrap: break-word;
}
.content:not(:has(p)){
    display: grid;
    place-items: center;
}


.toast.ok{
    --color: var(--clr-text-inverse);
    --background: var(--clr-ui-ok);
}
.toast.warn{
    --color: var(--clr-text-inverse);
    --background: var(--clr-ui-warn);
}
.toast.danger{
    --color: var(--clr-text-inverse);
    --background: var(--clr-ui-danger);
}
.toast.primary{
    --color: var(--clr-text-primary);
    --background: var(--clr-ui-primary);
}
.toast.secondary{
    --color: var(--clr-text-primary);
    --background: var(--clr-ui-secondary);
}
.toast.tertiary{
    --color: var(--clr-text-primary);
    --background: var(--clr-ui-tertiary);
}
</style>