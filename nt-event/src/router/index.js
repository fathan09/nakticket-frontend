import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventDetail from '@/views/EventDetail.vue'
import ForumView from '@/views/ForumView.vue'
import TicketCart from "../components/TicketCart.vue"
import EventCreate from "../components/EventCreate.vue"
import MyEvent from "../views/MyEvent.vue"

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
