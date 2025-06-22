<template>
    <div class="container-ticket">
        <h1> Ticket Information </h1>
        <div class="date-box"> <p> Event Date : 21st May 2025, 7:00 PM - 23:00PM </p> </div>

        <div v-for="(ticket, index) in tickets" :key="index" class="ticket-item">
            <div class="ticket-item-info">
                <h3> {{ticket.ticketName}}</h3>
                <p> {{ticket.deadline}} </p>
                <p> {{ticket.description}}</p>
            </div>
            <div class="ticket-item-add">
                <p> {{ticket.price}} </p>
                <div class="details-button">
                    <button class="reduce-button" @click="reduceFromCart(ticket)">
                        Reduce
                    </button>
                    <input type="number" :value="getQuantity(ticket)" readonly />
                    <button class="add-button" @click="addToCart(ticket)">
                        Add
                    </button>
                </div>
            </div>
        </div>

       

        <button id="button-buy"> <router-link to="/ticket-cart" class="router"> Buy Tickets </router-link> </button>
    </div>
</template>

<script>
import {useTicketState} from '../store/ticketStore.js';

export default {
    name: "TicketList",
    props: ["tickets"],
    methods: {
        addToCart(ticket) {
            this.ticketStore.addToCart(ticket);
        },
        reduceFromCart(ticket) {
            this.ticketStore.reduceFromCart(ticket);
        },
        getQuantity(ticket) {
            const item = this.ticketStore.ticketItems.find(
                (t) => t.ticketName === ticket.ticketName
            );
            return item ? item.quantity : 0;
        }
    },
    setup() {
        const ticketStore = useTicketState();
        return {ticketStore};
    }
}
</script>