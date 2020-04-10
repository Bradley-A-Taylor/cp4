import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Browse from '../views/Browse.vue'
import SavedIdeas from '../views/SavedIdeas.vue'
import MyIdeas from '../views/MyIdeas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/browse',
    name: 'Browse',
    component: Browse
  },
  {
    path: '/saved',
    name: 'SavedIdeas',
    component: SavedIdeas
  },
  {
    path: '/ideas',
    name: 'MyIdeas',
    component: MyIdeas
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
