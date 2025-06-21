<template>
    <div class="container-cart">
        <h1>Confirm Your Tickets</h1>
        <div class="box-cart">
            <h2> Items In Cart </h2>

            <div v-for="(ticket, index) in ticketItems" :key="index" class="cart-item"> 
                <p>{{ticket.quantity}}</p>
                <div class="ticket-info">
                    <p>{{ticket.ticketName}}</p>
                    <p>{{ticket.deadline}}</p>
                    <button class="reduce-button" @click="reduceFromCart(ticket)">
                        Reduce
                    </button>
                    <input type="number" :value="getQuantity(ticket)" readonly />
                    <button class="add-button" @click="addToCart(ticket)">
                        Add
                    </button>
                </div>
                <div class="unit-price">
                    <p>RM {{ticket.quantity * ticket.price}}</p>
                </div>   
            </div>


            <div class="total-price">
                <p>Total Price RM {{totalPrice}}</p>
            </div>
        </div>
        <div class="button-container">
            <button id="button-cancel"> <router-link to="/" class="router"> Cancel </router-link> </button>
            <button id="button-buy"> <router-link to="/merch" class="router"> Buy Tickets </router-link> </button> 
        </div>
        
    </div>
</template>

<script>
import {useTicketState} from "../store/ticketStore.js";

export default {
    name: "TicketCart",
    computed: {
        ticketItems() {
            return this.ticketStore.ticketItems;
        },
        totalPrice() {
            return this.ticketStore.totalPrice;
        } 
    },
    setup() {
        const ticketStore = useTicketState();
        return {ticketStore};
    },
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
}
</script>
