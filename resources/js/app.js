import './bootstrap';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Components
import App from './components/app.vue';

// Define your routes
const routes = [
    { path: '/', component: () => import('./components/Home.vue') },
    { path: '/login', component: () => import('./components/Login.vue') },
    { path: '/signup', component: () => import('./components/Signup.vue') },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

const vuetify = createVuetify({
    components,
    directives,
});

createApp(App).use(vuetify).use(router).mount('#app');
