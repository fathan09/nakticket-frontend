<template>
    <div class="create-event-section">
        <EventCreate v-model="event"/>
         <CreateTicketCard 
            v-for="(ticket, index) in tickets"
            :key="index"
            :ticket="ticket"
        />
        <CreateTicketButton @open-popup="showPopUp = true"/>
        <TicketPopUp v-if="showPopUp" @close="showPopUp = false" @add-ticket="addTicket" />
      <button @click="submitAllData" class="submit-btn">Create Event Now</button>
    </div>
</template>

<script>
import axios from 'axios';

import CreateTicketButton from "@/components/CreateTicketButton.vue";
import TicketPopUp from "@/components/TicketPopUp.vue";
import EventCreate from '@/components/EventCreate.vue';
import CreateTicketCard from '@/components/CreateTicketCard.vue';

export default {
    components: {
        CreateTicketButton,
        TicketPopUp,
        EventCreate,
        CreateTicketCard
    },
    data() {
        return {
            showPopUp: false,
            tickets: [],
            event: {
                name: '',
                category: '',
                date: '',
                time: '',
                location: '',
                description: '',
                banner: ''
            }
        }
    }, methods: {
        addTicket(ticket) {
            this.tickets.push({...ticket});
        }, 
        async submitAllData() {
            try {
                const eventResponse = await axios.post('http://localhost/NakTicketBackend/api/event', this.event);
                const eventId = eventResponse.data.eventId;

                alert('eventResponse:', eventResponse);


                const ticketPromises = this.tickets.map(ticket => {
                    return axios.post('http://localhost/NakTicketBackend/api/ticket', {
                        ...ticket,
                        eventId: eventId
                    });
                });

                await Promise.all(ticketPromises);
                alert("Event created successfully");
            } catch (error) {
                console.error('Error:', error.response?.data || error.message);
                alert(error.message);
            }
        }
    }
}
</script>

<style scoped>
.submit-btn {
  background-color: #2d8cf0;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background-color: #1a73e8;
}
</style>