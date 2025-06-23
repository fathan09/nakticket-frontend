import { defineStore } from "pinia";

export const useTicketState = defineStore("ticketstate", {
    state: () => ({
        ticketItems: [],
    }),
    getters: {
        totalQuantity(state) {
            return state.ticketItems.reduce((total, item) => total + item.quantity, 0);
        },
        totalPrice(state) {
            return state.ticketItems.reduce((total, item) => total + (item.quantity * item.price), 0);
        }
    },
    actions: {
        addToCart(ticket) {
            const existingTicket = this.ticketItems.find(
                (item) => item.ticketName === ticket.ticketName
            );
            if(existingTicket) {
                existingTicket.quantity += 1;
            } else {
                this.ticketItems.push({...ticket, quantity: 1});
            }
        },
        reduceFromCart(ticket) {
            const existingTicket = this.ticketItems.find(
                (item) => item.ticketName === ticket.ticketName
            )

            if (existingTicket) {
                if (existingTicket.quantity > 1) {
                    existingTicket.quantity -= 1;
                } else {
                    this.ticketItems = this.ticketItems.filter(
                        (item) => item.ticketName !== ticket.ticketName
                    );
                }
            }
        }
    }
})