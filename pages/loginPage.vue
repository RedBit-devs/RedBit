<template>
    <div class="wrapper">
        <NuxtLink to="/">
            <Icon name="mdi:arrow-left-thick" style="color: white;" class="arrow" size="400%" />
        </NuxtLink>
        <div class="content">
            <div class=" login-box">
                <h1 class="login-title">Login</h1>
                <div class="input-field">
                    <div class="input">
                        <label>Email</label>
                        <input type="text" placeholder="Type here" </div>
                        <div class="input">
                            <label>Password</label>
                            <input type="password" placeholder="Type here">
                        </div>
                    </div>
                    <div class="submit">
                        <button class="buttonSubmit"> Submit</button>
                    </div>
                </div>
                <div class="register">
                    <label>Not registered yet?</label>
                    <NuxtLink to="/registerPage">
                        <button class="buttonRegister">
                            Resgister
                        </button>
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
a::after {
    height: 0;
    width: 0;
}

.wrapper {
    background-image: linear-gradient(to bottom right, var(--clr-tertiary), var(--clr-ui-secondary));
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    font-family: Inter;
}


h1 {
    text-align: center;
    margin: 7%;
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 4px;

}

.login-box {
    color: white;
    background-color: var(--clr-primary);
    width: 40%;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    box-shadow: 10px 10px 21px 1px rgb(from var(--clr-text-inverse) r g b / .6);
}

.input-field {
    display: flex;
    flex-direction: column;
    align-items: center;

}

.input {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 2%;
}

label {
    font-family: Inter;
    font-size: 16px;
}

input {
    border-radius: var(--border-rounded);
    border: none;
    height: 42px;
    margin-top: 1%;
    font-size: 16px;
    padding: 5px;
}

.submit {
    display: flex;
    justify-content: center;
    align-items: center;
}

.buttonSubmit {
    background-color: var(--clr-ui-secondary);
    color: white;
    border-radius: var(--border-rounded);
    border: none;
    padding: 10px 25px 10px 25px;
    width: fit-content;
    margin: 8%;
    font-size: 16px;
    font-family: Inter;
    transition: .5s;
}

.buttonSubmit:hover {
    background-color: var(--clr-ui-primary);
}


.register {
    display: flex;
    background-color: var(--clr-ui-primary);
    color: white;
    border-radius: var(--border-rounded);
    width: 30%;
    padding: 0.5rem 1rem 0.5rem 1rem;
    justify-content: space-between;
    align-items: center;
    box-shadow: 10px 10px 21px 1px rgb(from var(--clr-text-inverse) r g b / .6);
}

.buttonRegister {
    background-color: var(--clr-secondary);
    border: none;
    border-radius: var(--border-rounded);
    padding: 10px 20px 10px 20px;
    width: fit-content;
    font-family: Inter;
    transition: .5s;
    color: white;
}

.buttonRegister:hover {
    background-color: var(--clr-tertiary);
}


@media only screen and (max-width:1100px) {
    .login-box {
        width: 50%;
    }

    input {
        height: 36px;
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
        height: 32px;
    }

    .register {
        width: fit-content;
    }

    .input-box {
        width: fit-content;
        padding: 10%;
    }

    h1 {
        font-size: 30px;
    }

    .buttonRegister {
        margin-left: 1rem
    }
}

@media only screen and (max-width:640px) {

    .content {
        padding: 1.5rem;
    }

    .login-box {
        width: 100%;
    }

    .register {
        width: fit-content;
    }

    .buttonSubmit {
        padding: 10px 15px 10px 15px;
    }

    .buttonRegister {
        padding: 10px 15px 10px 15px;
        margin-left: 1rem
    }
}
</style>
