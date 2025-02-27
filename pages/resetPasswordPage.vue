<template>
  <div class="wrapper">
    <NuxtLink to="/loginPage" id="goBack">
            <Icon name="mdi:arrow-left-thick" style="color: white;" size="400%" />
        </NuxtLink>
        <div class="content">
    <div class="resetCard">
    <h1>reset password</h1>
    <div class="input" >
      <label for="">Email</label>
      <input type="text" placeholder="Type here">
    </div>
    <div class="description">
      <p>We will send you an email to reset your password.</p>
      <p>If you didn't recived any email you can resend it by clicking <NuxtLink>here</NuxtLink></p>
    </div>
    <div class="submit">
      <button class="btn ui-secondary">Submit</button>
    </div>
  </div>
</div>
</div>
</template>

<script setup>

definePageMeta({
  layout: false
})

</script>

<style scoped>
.wrapper{
  background-image: linear-gradient(to bottom right, var(--clr-tertiary), var(--clr-ui-secondary));

}

#goBack{
  position: absolute
}
.content{
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    gap: 2rem;
}

.resetCard{
  width: 60%;
  align-self: center;
  background-color: var(--clr-primary);
  border-radius: var(--border-rounded);
  display: flex;
  flex-direction: column;
  justify-content: center;  
  padding: 2rem;
}

h1{
  text-align: center;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 4px;
  padding-block: 2rem;
}

.input{
  display: flex;
  flex-direction: column;
  width: 100%;
}
input {
    border-radius: var(--border-rounded);
    border: none;
    height: 3rem;
    margin-top: 1%;
    padding: .5rem;
}

.description{
  padding-block: 2rem;
  text-align: center;
}

.description a{
  color: var(--clr-tertiary);
  cursor: pointer;
}

.submit{
  justify-content: center;
  display: flex;
  gap: 1rem;
}

.resend{
  width: max-content;
}

@media only screen and (max-width:1100px) {
    .resetCard {
        width: 50%;
    }


}

@media only screen and (max-width:850px) {
    .content {
        padding: 1.5rem;
    }

    .resetCard{
        width: 80%;
    }

    input {
        height: 2.2rem;
    }
}

@media only screen and (max-width:640px) {
    .resetCard {
        width: 100%;
    }



}
</style>