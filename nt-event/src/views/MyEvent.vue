<template>
  <div class="my-event-page">
    <h2 class="title">My Events</h2>
    <p>test</p>
    <!-- Event Card (View)-->
    <div v-if="filteredEvents.length" class="event-list">
      <div class="event-wrapper" v-for="event in filteredEvents" :key="event.id">
        <router-link :to="{ name: 'EventDetail', params: { id: event.id } }" class="eventCard">
            <img :src="event.banner" alt="Event Banner" class="event-img" />
            <div class="event-info">
            <h3>{{ event.name }}</h3>
            <p><strong>Date:</strong> {{ event.date }} | {{ event.time }}</p>
            <p><strong>Location:</strong> {{ event.location }}</p>
            <p class="status">Status: {{ event.status || 'Draft' }}</p>
            </div>
        </router-link>

        <!-- Event Buttons (Edit/Delete) -->
        <div class="actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn" @click="deleteEvent(event.id)">Delete</button>
        </div>
      </div>
    </div>

    <div v-else class="no-events">
      <p>You haven't created any events yet.</p>
    </div>
  </div>
</template>

<script>
import { useEventStore } from '@/store/eventStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

export default {
  name: 'MyEvent',
  setup() {
    const store = useEventStore();
    const { events } = storeToRefs(store);

    const userId = 1; // Replace with dynamic user ID from auth later

    const filteredEvents = computed(() =>
      events.value.filter((e) => e.creatorId === userId)
    );

    const deleteEvent = (id) => {
      store.removeEventListener(id); // Assumes you have this action
      alert('Event deleted.');
    };

    return {
      filteredEvents,
      deleteEvent,
    };
  },
};
</script>

<style scoped>
.my-event-page {
  padding: 2rem;
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

.event-card {
  display: flex;
  align-items: flex-start;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.event-img {
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1.5rem;
}

.event-info {
  flex: 1;
}

.status {
  color: #888;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
}

.edit-btn,
.delete-btn {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.edit-btn {
  background-color: #2d8cf0;
  color: white;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}
</style>
