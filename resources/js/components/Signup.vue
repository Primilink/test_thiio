<template>
    <v-card class="tw-mx-auto tw-my-8" elevation="16" max-width="344">
        <v-card-item>
            <v-card-title>Sign up form</v-card-title>

            <!-- <v-card-subtitle> Card subtitle secondary text </v-card-subtitle> -->
        </v-card-item>

        <v-card-text>
            <!-- Login form -->
            <v-form ref="form" @submit.prevent="login">
                <v-text-field
                    v-model="loginForm.data.name"
                    label="Name"
                    outlined
                    required
                    :rules="nameRules"
                    :error-messages="errors.name"
                ></v-text-field>

                <v-text-field
                    v-model="loginForm.data.email"
                    label="Email"
                    outlined
                    required
                    :rules="emailRules"
                    :error-messages="errors.email"
                ></v-text-field>

                <v-text-field
                    v-model="loginForm.data.password"
                    label="Password"
                    outlined
                    required
                    type="password"
                    :rules="passwordRules"
                    :error-messages="errors.password"
                ></v-text-field>

                <v-btn @click="login" color="primary">Log in</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import useForm from "../useForm";
import { useRouter } from "vue-router";
import useSession from "../useSession";

const session = useSession();
const router = useRouter();

const emailRules = [
    (value) => {
        if (value) return true;

        return "E-mail is requred.";
    },
    (value) => {
        if (/.+@.+\..+/.test(value)) return true;

        return "E-mail must be valid.";
    },
];

const nameRules = [
    (value) => {
        if (value) return true;

        return "Name is required.";
    },
];

const passwordRules = [
    (value) => {
        if (value) return true;

        return "Password is required.";
    },
];

const form = ref(null);
const errors = ref({});

const loginForm = useForm({
    name: "",
    email: "",
    password: "",
});

const login = async (data) => {
    const { valid } = await form.value.validate();
    if (!valid) return;

    loginForm.post("/api/auth/signup", {
        onSuccess: (data) => {
            if (data.access_token && data.expires_in) {
                session.login(data.access_token, data.expires_in);
                router.go();
            }
        },
        onError: (error) => {
            errors.value = loginForm.errors;
        },
    });
};
</script>
