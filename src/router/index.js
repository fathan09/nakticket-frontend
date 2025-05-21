import { createRouter, createWebHistory } from 'vue-router'
import TicketCart from "../components/TicketCart.vue"
import TicketList from "../components/TicketList.vue"

const routes = [
    {path: "/", name: "TicketList", component: TicketList},
    {path: "/ticket-cart", name: "TicketCart", component: TicketCart}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router