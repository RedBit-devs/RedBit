<template>
  <div class="content">
    <div class="close"><NuxtLink to="/loginPage" id="goBack">
            <Icon name="mdi:arrow-left-thick" style="color: white;" size="400%" />
        </NuxtLink></div>
    <div class="resetCard">
    <h1>Reset password</h1>
    <div class="input">
      <label for="">Email</label>
      <input type="text">
    </div>
    <div class="description">
      <p>We will send you an email to reset your password.</p>
    </div>
    <div class="submit">
      <button>Submit</button>
    </div>
  </div>
</div>
</template>

<script setup>

definePageMeta({
  layout: false
})

</script>

<style>

</style>