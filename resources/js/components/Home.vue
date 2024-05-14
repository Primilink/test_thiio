<template>
    <h1 class="text-red-500">Welcome to Vue.js</h1>
    <v-btn> Button </v-btn>
    <v-card class="mx-auto my-8" elevation="16" max-width="344">
        <v-card-item>
            <v-card-title> Card title </v-card-title>

            <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
        </v-card-item>

        <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const login = (data) => {
    // TODO: Implement login logic
};
</script>
