<template>
    <nav class="bg-gray-800 p-4 text-white flex justify-between">
        <RouterLink to="/">Home</RouterLink>
        <!-- <p><strong>Current route path:</strong> {{ $route.fullPath }}</p> -->
        <div class="flex space-x-4">
            <RouterLink to="/signup">Sign Up</RouterLink>
            <RouterLink to="/login">Log in</RouterLink>
        </div>
    </nav>
    <main class="bg-gray-100 p-4 min-h-[calc(100vh-64px)]">
        <RouterView />
    </main>
</template>
