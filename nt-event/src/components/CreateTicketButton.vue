<template>
  <div class="ticket-add-section">
    <button @click="$emit('open-popup')" class="ticket-add-card" id="ticket-paid">
      <div class="ticket-add-card-info">
        <p>Create Ticket</p>
        <h5>Paid</h5>
      </div>
      <PlusCircleIcon class="create-ticket-icon" :style="{ width: '32px', height: '32px'}" />
    </button>
  </div>
</template>

<script>
import { PlusCircleIcon } from '@heroicons/vue/24/solid'

export default {
  name: "CreateTicketButton",
  components: {
    PlusCircleIcon
  }
}
</script>
