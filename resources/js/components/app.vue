<template>
    <nav class="tw-bg-gray-800 tw-p-4 tw-text-white tw-flex tw-justify-between">
        <RouterLink to="/" v-if="notLoggedIn">Home</RouterLink>
        <RouterLink to="/dashboard" v-if="!notLoggedIn">Dashboard</RouterLink>
        <!-- <p><strong>Current route path:</strong> {{ $route.fullPath }}</p> -->
        <div class="tw-flex tw-space-x-4">
            <RouterLink to="/signup" v-if="notLoggedIn">Sign Up</RouterLink>
            <RouterLink to="/login" v-if="notLoggedIn">Log in</RouterLink>
            <button @click="logout" v-if="!notLoggedIn">Log out</button>
        </div>
    </nav>
    <main class="tw-bg-gray-100 tw-p-4 tw-min-h-[calc(100vh-64px)]">
        <RouterView />
    </main>
</template>

<script setup>
import { onMounted, ref } from "vue";

import useSession from "../useSession";
import useForm from "../useForm";
import { useRouter } from "vue-router";

const router = useRouter();
const session = useSession();
const notLoggedIn = ref(true);

const logout = async () => {
    if (!session.isAuthenticated()) {
        return;
    }

    let logoutForm = useForm({});
    logoutForm.post("/api/auth/logout", {
        onSuccess: (data) => {
            notLoggedIn.value = true;
            session.logout();
            router.go();
        },
    });
};

onMounted(() => {
    console.log("<app> App component mounted");
    const session = useSession();
    if (session.isAuthenticated()) {
        notLoggedIn.value = false;
    }
});
</script>
