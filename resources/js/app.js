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
    { name: 'home', path: '/', component: () => import('./components/Home.vue') },
    { name: 'login', path: '/login', component: () => import('./components/Login.vue'), meta: { onlyGuest: true } },
    { name: 'signup', path: '/signup', component: () => import('./components/Signup.vue'), meta: { onlyGuest: true } },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

import useSession from './useSession';

const session = useSession();

router.beforeEach(async (to, from, next) => {
    if (to.meta.onlyGuest && session.isAuthenticated()) {
        return next({ name: 'home' });
    }

    if (to.meta.requiresAuth && !session.isAuthenticated()) {
        return next({ name: 'login' });
    }

    else next()
})


const vuetify = createVuetify({
    components,
    directives,
});

createApp(App).use(vuetify).use(router).mount('#app');
