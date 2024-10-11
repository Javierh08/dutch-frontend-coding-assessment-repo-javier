import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Collection from "../views/Collection.vue";

const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/collection', name: 'collection', component: Collection }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;