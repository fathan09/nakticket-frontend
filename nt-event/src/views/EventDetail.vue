<template>
  <div class="event-detail" v-if="event">
    <div class="event-gallery">
      <img
        v-for="(img, index) in event.images"
        :key="index"
        :src="img"
        alt="Event Image"
      />
    </div>
    <div class="event-info">
      <h1>{{ event.title }}</h1>
      <p><strong>Date:</strong> {{ event.date }}</p>
      <p><strong>Time:</strong>{{ event.time }}</p>
      <p><strong>Organizers:</strong>{{ event.organizer }}</p>
      <p>{{ event.description }}</p>
    </div>
    <div class="purchase-box">
      <p class="price">Price: starts from ${{ event.price }}</p>
      \
      <button>Buy Ticket</button>
    </div>
  </div>
  <div v-else>
    <p>Loading event...</p>
  </div>
</template>

<script>
import { useEventStore } from "@/store/eventStore";
import { storeToRefs } from "pinia";

export default {
  name: "EventDetail",
  props: ["id"],
  setup(props) {
    const eventStore = useEventStore();
    eventStore.getEventById(props.id);

    const { selectedEvent } = storeToRefs(eventStore);

    return {
      event: selectedEvent,
    };
  },
};
</script>

<style scoped>
.event-detail {
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.event-gallery {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}

.event-gallery img {
  height: 200px;
  border-radius: 10px;
}

.event-info {
  margin-top: 2rem;
}

.purchase-box {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  max-width: 300px;
  background: #f9f9f9;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
}

button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #88a391;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
