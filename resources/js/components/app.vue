<template>
    <nav class="bg-gray-800 p-4 text-white flex justify-between">
        <RouterLink to="/">Home</RouterLink>
        <!-- <p><strong>Current route path:</strong> {{ $route.fullPath }}</p> -->
        <div class="flex space-x-4">
            <RouterLink to="/signup" v-if="notLoggedIn">Sign Up</RouterLink>
            <RouterLink to="/login" v-if="notLoggedIn">Log in</RouterLink>
        </div>
    </nav>
    <main class="bg-gray-100 p-4 min-h-[calc(100vh-64px)]">
        <RouterView />
    </main>
</template>

<script setup>
import { onMounted, ref } from "vue";

import useSession from "../useSession";

const notLoggedIn = ref(true);

onMounted(() => {
    console.log("<app> App component mounted");
    const session = useSession();
    if (session.isAuthenticated()) {
        notLoggedIn.value = false;
    }
});
</script>
