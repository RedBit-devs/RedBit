<template>
    <div class="wrapper">
        <NuxtLink to="/">
            <Icon name="mdi:arrow-left-thick" style="color: white;" id="goBack" size="400%" />
        </NuxtLink>
        <div class="content">
            <div class=" login-box">
                <h1 class="login-title">Login</h1>
                <div class="input-field">
                    <div class="input">
                        <label>Email</label>
                        <input type="text" placeholder="Type here" id="email">
                        <div class="input">
                            <label>Password</label>
                            <input type="password" placeholder="Type here" id="password">
                        </div>
                    </div>
                    <div class="submit">
                        <button class="btn ui-secondary"> Submit</button>
                    </div>
                </div>
            </div>
            <div class="register">
                <label>Not registered yet?</label>
                <NuxtLink to="/registerPage" class="btn secondary">
                    Register
                </NuxtLink>
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

}

.input-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

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
