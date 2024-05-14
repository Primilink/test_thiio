import './bootstrap';

import { createApp } from 'vue';

// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Components
import app from './components/app.vue';

const vuetify = createVuetify({
    components,
    directives,
});

createApp(app).use(vuetify).mount('#app');
