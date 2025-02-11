import { defineAsyncComponent } from 'vue'
const Calendar = defineAsyncComponent(() => import('./calendar/index.vue'))
const Topbar = defineAsyncComponent(() => import('./topBar/index.vue'))
export { Calendar, Topbar }