<template>
    <v-card
        class="tw-mx-auto tw-my-8"
        elevation="16"
        max-width="344"
        v-if="loggedIn"
    >
        <v-card-item>
            <v-card-title> You are logged in! </v-card-title>
        </v-card-item>

        <v-card-text>
            Go to the dashboard to access awesome features!
        </v-card-text>

        <v-card-actions class="tw-flex tw-justify-center">
            <v-btn to="/dashboard" class="bg-primary text-white p-2 rounded"
                >Go to dashboard</v-btn
            >
        </v-card-actions>
    </v-card>

    <v-card
        class="tw-mx-auto tw-my-8"
        elevation="16"
        max-width="344"
        v-if="!loggedIn"
    >
        <v-card-text>
            Hi there, log in or sign up to access awesome features!
        </v-card-text>
    </v-card>
</template>

<script setup>
import useSession from "../useSession";
import { ref } from "vue";

const session = useSession();
const loggedIn = ref(session.isAuthenticated());
</script>
