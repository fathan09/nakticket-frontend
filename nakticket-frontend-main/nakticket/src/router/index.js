import { createRouter, createWebHistory } from 'vue-router';

import MerchandiseList from '@/pages/MerchandiseList.vue';
import MerchandiseDetail from '@/pages/MerchandiseDetail.vue';
import Cart from '@/pages/Cart.vue';

const EventPage = { template: '<div>Event Page</div>' };
const TicketingPage = { template: '<div>Ticketing Page</div>' };
const ForumPage = { template: '<div>Forum Page</div>' };
const AboutPage = { template: '<div>About Us Page</div>' };

const routes = [
  { path: '/', redirect: '/merch' },
  { path: '/merch', component: MerchandiseList },
  { path: '/merch/:id', component: MerchandiseDetail },
  { path: '/MerchCart', component: Cart },
  { path: '/events', component: EventPage },
  { path: '/ticketing', component: TicketingPage },
  { path: '/forum', component: ForumPage },
  { path: '/about', component: AboutPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
