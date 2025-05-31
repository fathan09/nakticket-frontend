<template>
    <div class="container-ticket">
        <h1> Ticket Information </h1>
        <div class="date-box"> <p> Event Date : 21st May 2025, 7:00 PM - 23:00PM </p> </div>

        <div class="ticket-item">
            <div class="ticket-item-info">
                <h3> Ticket Type 1</h3>
                <p> Sale Ends 14th May 2025 </p>
                <p> this ticket provides front seat and premium meals</p>
            </div>
            <div class="ticket-item-add">
                <p> RM 50 </p>
                <div class="details-button">
                    <button class="reduce-button" @click="reduceFromCart">
                        Reduce
                    </button>
                    <input type="number"/>
                    <button class="add-button" @click="addToCart">
                        Add
                    </button>
                </div>
            </div>
        </div>

        <div class="ticket-item">
            <div class="ticket-item-info">
                <h3> Ticket Type 2</h3>
                <p> Sale Ends 14th May 2025 </p>
                <p> this ticket provides middle seat and snacks</p>
            </div>
            <div class="ticket-item-add">
                <p> RM 30 </p>
                <div class="details-button">
                    <button class="reduce-button" @click="reduceFromCart">
                        Reduce
                    </button>
                    <input type="number"/>
                    <button class="add-button" @click="addToCart">
                        Add
                    </button>
                </div>
            </div>
        </div>

        <div class="ticket-item">
            <div class="ticket-item-info">
                <h3> Ticket Type 3</h3>
                <p> Sale Ends 14th May 2025 </p>
                <p> this ticket provides back seat and no meals</p>
            </div>
            <div class="ticket-item-add">
                <p> RM 10 </p>
                <div class="details-button">
                    <button class="reduce-button" @click="reduceFromCart">
                        Reduce
                    </button>
                    <input type="number"/>
                    <button class="add-button" @click="addToCart">
                        Add
                    </button>
                </div>
            </div>
        </div>

        <button id="button-buy"> <router-link to="/ticket-cart" class="router"> Buy Tickets </router-link> </button>
    </div>
</template>

<script>
export default {
    name: "TicketList"
}
</script>