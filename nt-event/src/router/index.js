import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventDetail from '@/views/EventDetail.vue'
import ForumView from '@/views/ForumView.vue'
import TicketCart from "../components/TicketCart.vue"
import EventCreate from "../components/EventCreate.vue"
import MyEvent from "../views/MyEvent.vue"
import Login from "../views/loginView.vue"
import Register from "../views/registerView.vue"

import MerchandiseList from '@/pages/MerchandiseList.vue';
import MerchandiseDetail from '@/pages/MerchandiseDetail.vue';
import MerchandiseCart from '@/pages/MerchandiseCart.vue';

import MerchandiseGrid from '@/pages/MerchandiseGrid.vue';

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
    name: 'eventDetail',
    component: EventDetail,
    props: true,
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumView
  },
  {
    path: "/ticket-cart", 
    name: "TicketCart", 
    component: TicketCart
  },
  {
    path: "/create-event",
    name: "EventCreate",
    component: EventCreate
  },
  {
    path: "/my-event",
    name: "MyEvent",
    component: MyEvent
  },
  {
    path: '/merchandise',
    name: 'MerchandiseList',
    component: MerchandiseList
  },
  {
    path: '/merchandise/:id',
    name: 'MerchandiseDetail',
    component: MerchandiseDetail,
    props: true
  },
  {
    path: '/merchcart',
    name: 'MerchandiseCart',
    component: MerchandiseCart
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/merchgrid',
    name: 'MerchandiseGrid',
    component: MerchandiseGrid
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
