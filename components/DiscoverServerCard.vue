<template>
    <div id="cardContainer">
        <div id="profPic">
            <img src="../img/probalogo.png" alt="">
        </div>
        <div id="serverName">
            <p>The wonderful server name</p>
        </div>
        <div id="join">
            <button class="btn ok">Join</button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
#cardContainer {
    padding: .5rem;
    display: grid;
    grid-template-columns: min-content max-content 1fr;
    align-items: center;
    gap: 1rem;
    max-width: 50rem;
    margin: 1rem auto;
    background-color: var(--clr-ui-primary);
    border-radius:var(--border-rounded) ;
}

#profPic img {
    height: 4rem;
    border-radius: 50%;
}

p {
    font-size: 1.5rem;
}

#join {
    text-align: right;
}

@media only screen and (max-width:490px){
    p{
        font-size: 1rem;
    }

    #profPic img{
        height: 2.5rem;
    }
    #cardContainer{
        gap: .5rem;
    }
}
</style>