<template>
    <v-card class="mx-auto my-8" elevation="16" max-width="344">
        <v-card-item>
            <v-card-title> Log in</v-card-title>

            <!-- <v-card-subtitle> Card subtitle secondary text </v-card-subtitle> -->
        </v-card-item>

        <v-card-text>
            <!-- Login form -->
            <v-form>
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
import useForm from "./useForm";

const email = ref("");
const password = ref("");

const loginForm = useForm({
    email,
    password,
});

const login = (data) => {
    if (loginForm.processing) return;

    loginForm.post("/api/auth/login", {
        onSuccess: (data) => {
            console.log(data);
        },
    });
};
</script>
