<template>
  <div class="my-orders-page">
    <h2 class="title">My Orders</h2>
    <p>test</p>
    <!-- order Card (View)-->
    <div v-if="orders.length" class="order-list">
      <div class="order-wrapper" v-for="order in orders" :key="order.id">
        <h3>Order #{{ order.id }}</h3>
        <p><strong>Date:</strong> {{ order.timemstap }}</p>

        <!-- ticket order -->
        <div class="ticket-section" v-if="order.orderTicketId.length">
          <h4>Tickets:</h4>
          <ul>
            <li v-for="ticket in order.orderTicketId" :key="ticket.ticketId">
              Ticket ID: {{ ticket.ticketId }} | Quantity: {{ ticket.quantity }} |
              Subtotal: RM {{ ticket.subtotal }}
            </li>
          </ul>
        </div>

        <!-- merchandise order -->
        <div class="merch-station" v-if="order.orderMerchandiseId.length">
          <h4>Merchandise:</h4>
          <ul>
            <li v-for="merch in order.orderTicketId" :key="merch.merchandiseId">
              Merchandise ID: {{ merch.merchandiseId }} | Quantity: {{ merch.quantity }} |
              Subtotal: RM {{ merch.subtotal }}
            </li>
          </ul>
        </div>
        <!-- order total -->
        <p class="total"><storng>TOtal:</storng> RM {{ calculateTotal(order) }}</p>
      </div>
    </div>

    <div v-else class="no-orders">
      <p>You haven't made any purchase yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyordersPage",
  methods: {
    calculateTotal(order) {
      const ticketTotal = order.orderTicketId.reduce((sum, t) => sum + t.subtotal, 0);
      const merchTotal = order.orderMerchandiseId.reduce((sum, t) => sum + t.subtotal, 0);
      return ticketTotal + merchTotal;
    },
  },
};
</script>

<style>
.my-orders-page {
  padding: 2rem auto;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-wrapper {
  display: flex;
  align-items: flex-start;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.order-card h3 {
    margin-bottom: 0.5rem;
}


ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  padding: 0.4rem 0;
  border-bottom: 1px solid #eee;
}

.total {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
}
</style>
