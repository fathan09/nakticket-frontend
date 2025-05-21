<template>
    <div class="container-cart">
        <h1>Confirm Your Tickets</h1>
        <div class="box-cart">
            <h2> Items In Cart </h2>

            <div class="cart-item"> 
                <p>3</p>
                <div class="ticket-info">
                    <p>Ticket Type 1</p>
                    <p>21st May 2025</p>
                </div>
                <div class="unit-price">
                    <p>RM 150</p>
                </div>   
            </div>

            <hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0;" />
 

            <div class="cart-item"> 
                <p>2</p>
                <div class="ticket-info">
                    <p>Ticket Type 2</p>
                    <p>21st May 2025</p>
                </div>
                <div class="unit-price">
                    <p>RM 60</p>
                </div>   
            </div>

            <hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0;" />


            <div class="cart-item"> 
                <p>1</p>
                <div class="ticket-info">
                    <p>Ticket Type 3</p>
                    <p>21st May 2025</p>
                </div>
                <div class="unit-price">
                    <p>RM 10</p>
                </div>               
            </div>

            <hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0;" />


            <div class="total-price">
                <p>Total Price RM 220</p>
            </div>
        </div>
        <div class="button-container">
            <button id="button-cancel"> <router-link to="/" class="router"> Cancel </router-link> </button>
            <button id="button-buy"> Checkout Items </button>
        </div>
        
    </div>
</template>

<script>

export default {
    name: "TicketCart"
}
</script>
