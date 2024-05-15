<template>
    <v-card class="mx-auto my-8" elevation="16" max-width="344">
        <v-card-item>
            <v-card-title>Log in form</v-card-title>

            <!-- <v-card-subtitle> Card subtitle secondary text </v-card-subtitle> -->
        </v-card-item>

        <v-card-text>
            <!-- Login form -->
            <v-form ref="form" @submit.prevent="login">
                <v-text-field
                    v-model="email"
                    label="Email"
                    outlined
                    required
                    :rules="emailRules"
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    label="Password"
                    outlined
                    required
                    type="password"
                    :rules="passwordRules"
                ></v-text-field>

                <v-btn type="submit" color="primary">Log in</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import useForm from "../useForm";
import useStorage from "../useStorage";

const storage = useStorage();

const email = ref("");
const password = ref("");

const form = ref(null);

const loginForm = useForm({
    email,
    password,
});

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

const passwordRules = [
    (value) => {
        if (value) return true;

        return "Password is required.";
    },
];

const login = async (data) => {
    const { valid } = await form.value.validate();

    if (!valid) return;

    loginForm.post("/api/auth/login", {
        onSuccess: (data) => {
            console.log(data);
            if (data.access_token) {
                storage.setItem("token", data.access_token);
            }

            if (data.expires_in) {
                let expiration = new Date();
                expiration.setSeconds(
                    expiration.getSeconds() + data.expires_in
                );
                storage.setItem("expiration", expiration);
            }
        },
    });
};
</script>
