<template>
    <div class="wrapper">
        <NuxtLink to="/" id="goBack">
            <Icon name="mdi:arrow-left-thick" style="color: white;" size="400%" />
        </NuxtLink>
        <div class="content">
            <div class=" login-box">
                <h1 class="login-title">Login</h1>
                <div class="input-field">
                    <div class="input">
                        <label>Email</label>
                        <input ref="emailRef" type="email" placeholder="Type here" id="email">
                    </div>
                    <div class="input">
                        <label>Password</label>
                        <input ref="passwordRef" type="password" placeholder="Type here" id="password">
                    </div>
                </div>
                <div class="submit">
                    <button  @click="sendLoginRequest()" class="btn ui-secondary">
                        Submit</button>
                </div>

            </div>
            <div class="register">
                <label>Not registered yet?</label>
                <NuxtLink to="/registerPage" class="btn secondary">
                    Register
                </NuxtLink>
            </div>
            <div class="forgottenPassword">
                <NuxtLink to="/resetPasswordPage">
                    Forgott your password?
                </NuxtLink>
            </div>
        </div>
        <div v-if="err?.length > 0" class="toaster">
            <Toast v-for="(error, i) in err" :key="i" class="danger" :title="error.reason.toString()"
                :content="error.message" />
        </div>

    </div>

</template>

<script lang="ts" setup>
definePageMeta({
    layout: false
})

const emailRef = ref(null)
const passwordRef = ref(null)
const { getNewRefreshToken } = useToken()

const err = ref<CustomError[] | null>(null);
const stat = ref(null);
const isRequestPending = ref(false);


const sendLoginRequest = async () => {
    isRequestPending.value = true;
    if (!emailRef.value.value || !passwordRef.value.value) return isRequestPending.value = false;

    const { error, status } = await getNewRefreshToken(emailRef.value.value, passwordRef.value.value)

    stat.value = status;
    err.value = null;

    if (stat.value === "success") {
        ////TODO this should navigate to the chat
        navigateTo('/test')
    }

    if (stat.value === "error") {
        err.value = error.data
    }
    isRequestPending.value = false;

}
</script>

<style scoped>
.wrapper {
    background-image: linear-gradient(to bottom right, var(--clr-tertiary), var(--clr-ui-secondary));
}

#goBack {
    position: absolute;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    gap: 2rem;
}

h1 {
    text-align: center;
    padding-block: 3rem;
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 4px;

}

.login-box {
    background-color: var(--clr-primary);
    width: 40%;
    border-radius: var(--border-rounded);
    box-shadow: 10px 10px 21px 1px rgb(from var(--clr-text-inverse) r g b / .6);
    padding-inline: 2rem;

}

.input-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.input {
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

.submit {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem;
}

.register {
    display: flex;
    background-color: var(--clr-ui-primary);
    border-radius: var(--border-rounded);
    width: 30%;
    gap: 1rem;
    padding: 0.5rem 1rem;
    justify-content: space-between;
    align-items: center;
    box-shadow: 10px 10px 21px 1px rgb(from var(--clr-text-inverse) r g b / .6);
}

.forgottenPassword a {
    cursor: pointer;
    color: var(--clr-primary);
    text-decoration: none;
}

@media only screen and (max-width:1100px) {
    .login-box {
        width: 50%;
    }

    .register {
        width: fit-content;
    }

}

@media only screen and (max-width:850px) {
    .content {
        padding: 1.5rem;
    }

    .login-box {
        width: 80%;
    }

    input {
        height: 2.2rem;
    }
}

@media only screen and (max-width:640px) {
    .login-box {
        width: 100%;
    }

}
</style>
