<template>
    <v-card class="mx-auto my-8" elevation="16" max-width="344">
        <v-card-item>
            <v-card-title>Sign up form</v-card-title>

            <!-- <v-card-subtitle> Card subtitle secondary text </v-card-subtitle> -->
        </v-card-item>

        <v-card-text>
            <!-- Login form -->
            <v-form>
                <v-text-field
                    v-model="name"
                    label="Name"
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    label="Email"
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    label="Password"
                    outlined
                    required
                    type="password"
                ></v-text-field>

                <v-btn @click="login" color="primary">Log in</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import useForm from "../useForm";
import useStorage from "../useStorage";

const storage = useStorage();

const name = ref("");
const email = ref("");
const password = ref("");

const loginForm = useForm({
    name,
    email,
    password,
});

const login = (data) => {
    if (loginForm.processing) return;

    loginForm.post("/api/auth/signup", {
        onSuccess: (data) => {
            console.log(data);
            // if (data.access_token) {
            //     storage.setItem("token", data.access_token);
            // }

            // if (data.expires_in) {
            //     let expiration = new Date();
            //     expiration.setSeconds(
            //         expiration.getSeconds() + data.expires_in
            //     );
            //     storage.setItem("expiration", expiration);
            // }
        },
    });
};
</script>
