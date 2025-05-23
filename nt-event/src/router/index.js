import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventDetail from '@/views/EventDetail.vue'
import ForumView from '@/views/ForumView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetail,
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
