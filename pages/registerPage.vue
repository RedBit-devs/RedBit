<template>
    <div class="wrapper">
        <NuxtLink id="goBack" to="/">
            <Icon name="mdi:arrow-left-thick" style="color: white;" size="400%" />
        </NuxtLink>
        <div class="content">
            <div class=" register-box">
                <h1 class="login-title">Register</h1>
                <div class="input-field">
                    <div class="input" id="firstname">
                        <label>Firstname</label>
                        <input ref="firstnameRef" type="text" placeholder="Type here">
                    </div>
                    <div class="input" id="lastname">
                        <label>Lastname</label>
                        <input ref="lastnameRef" type="text" placeholder="Type here">
                    </div>
                    <div class="input" id="birthDate">
                        <label>Birth date</label>
                        <input ref="birthDateRef" type="date">
                    </div>
                    <div class="input" id="email">
                        <label>Email</label>
                        <input ref="emailRef" type="text" placeholder="Type here">
                    </div>
                    <div class="userProfileWrapper">
                        <input id="imageInput" type="file" @input="handleFileInput" accept="image/*" />
                        <label for="imageInput">
                            <img class="profPic" v-if="files[0]" :src="files[0].content" :alt="files[0].name">
                            <Icon class="profPic" v-else name="mdi:account-edit" size="4rem" />
                        </label>
                        <div class="input" id="username">
                            <label>Username</label>
                            <input ref="usernameRef" type="text" placeholder="Type here">
                        </div>
                    </div>
                    <div class="input" id="password">
                        <label>Password</label>
                        <input ref="passwordRef" type="password" placeholder="Type here">
                    </div>
                    <div class="input" id="passwordAgain">
                        <label>Password again</label>
                        <input ref="passwordAgainRef" type="password" placeholder="Type here">
                    </div>
                </div>
                <div class="submit">
                    <button class="btn ui-secondary" @click="sendRegisterRequest()"> Register</button>
                </div>
            </div>
            <div class="login">
                <label>Already have an account? </label>
                <NuxtLink class="btn secondary" to="/loginPage">
                    Login
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: false
})

const firstnameRef = ref(null)
const lastnameRef = ref(null)
const birthDateRef = ref(null)
const emailRef = ref(null)
const usernameRef = ref(null)
const passwordRef = ref(null)
const passwordAgainRef = ref(null)

const { handleFileInput, files } = useFileStorage();

const sendRegisterRequest = async () => {

    if (!firstnameRef.value.value ||
        !lastnameRef.value.value ||
        !birthDateRef.value.value || !emailRef.value.value ||
        !usernameRef.value.value || !passwordRef.value.value ||
        !passwordAgainRef.value.value || !files.value[0].content) return;

    if (!(passwordRef.value.value === passwordAgainRef.value.value)) return;

    const response = await $fetch("/api/user/", {
        ignoreResponseError: true,

        method: 'PUT',
        body: {
            first_name: firstnameRef.value.value,
            last_name: lastnameRef.value.value,
            birthdate: birthDateRef.value.value,
            email: emailRef.value.value,
            username: usernameRef.value.value,
            password: passwordRef.value.value,
            profile_picture: files.value[0].content

        }

    })

    if (!response.error) {
        navigateTo('/loginPage')
    }
    return;

}

</script>


<style scoped>
.profPic {
    border-radius: 100%;
    width: 4rem;
    aspect-ratio: initial;
}

#imageInput {
    display: none;
}

.userProfileWrapper {
    display: flex;
    grid-column: span 2;
    align-items: center;
    gap: 1rem;
}

label[for="imageInput"] {
    cursor: pointer;
    border-radius: 100%;
    border: 3px solid var(--clr-text-primary);

}

label[for="imageInput"]:hover,
label[for="imageInput"]:focus {
    color: var(--clr-tertiary);

}

#goBack {
    position: absolute;
}

.wrapper {
    background-image: linear-gradient(to bottom right, var(--clr-tertiary), var(--clr-ui-secondary));
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    gap: 1.5rem;
    padding: 1.5rem;
    width: 100%;
}


h1 {
    text-align: center;
    padding-block: 3rem;
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 4px;
}

.register-box {
    background-color: var(--clr-primary);
    width: 40%;
    border-radius: var(--border-rounded);
    padding: 2rem 2rem;
    box-shadow: 10px 10px 21px 1px rgb(from var(--clr-text-inverse) r g b / .6);

}

.input-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
    display: grid;
    grid-template-areas: "firstName lastName" "birthDate birthDate" "email email" "username username" "password password" "passwordAgain passwordAgain";
    grid-template-columns: repeat(2, 1fr);
}

#firstname {
    grid-area: firstName;
}

#lastname {
    grid-area: lastName;
}

#birthDate {
    grid-area: birthDate;
}

#email {
    grid-area: email;
}

#username {
    grid-area: username;
}

#password {
    grid-area: password;
}

#passwordAgain {
    grid-area: passwordAgain;
}

.input {
    display: flex;
    flex-direction: column;
    width: 100%;
}

input {
    border: none;
    border-radius: var(--border-rounded);
    height: 3rem;
    margin-top: 1%;
    padding: .5rem;
}

.submit {
    display: flex;
    justify-content: center;
    align-items: center;
}


.login {
    display: flex;
    gap: 1rem;
    background-color: var(--clr-ui-primary);
    border-radius: var(--border-rounded);
    width: 30%;
    padding: 0.5rem 1rem;
    justify-content: space-between;
    align-items: center;
    box-shadow: 10px 10px 21px 1px rgb(from var(--clr-text-inverse) r g b / .6);
}


@media only screen and (max-width:1300px) {
    .login-box {
        width: 50%;
    }

    .input-field {
        grid-template-areas: "firstName firstName" "lastName lastName" "birthDate birthDate" "email email" "username username" "password password" "passwordAgain passwordAgain";
    }
}

@media only screen and (max-width:850px) {
    .register-box {
        width: 80%;
    }

    input {
        height: 2.2rem;
    }

    .login {
        width: fit-content;
    }
}

@media only screen and (max-width:640px) {

    .register-box {
        width: 100%;
    }

    .login {
        width: fit-content;
    }

    #goBack {
        left: 2rem;
        top: 2rem;
    }

}
</style>