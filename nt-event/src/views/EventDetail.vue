<template>
  <div class="event-detail" v-if="event">
    <div class="event-gallery">
      <img
        v-for="(img, index) in event.image"
        :key="index"
        :src="img"
        alt="Event Image"
      />
    </div>
    <div class="event-info">
      <h1>{{ event.title }}</h1>
      <h2><strong>Date: </strong>{{ event.date }}</h2> <br>
      <h2><strong>Time:</strong></h2> <h3>{{ event.time }}</h3><br>
      <h2><strong>Organizers:</strong> {{ event.organizer }}</h2>
      <p>{{ event.description }}</p>
    </div>
  </div>
  <TicketList />

</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import TicketList from '@/components/TicketList.vue';

export default {
  name: "EventDetail",
  components : {
    TicketList
  },
  setup() {
    const route = useRoute();
    const event = ref(null);

    onMounted(async () => {
      const res = await fetch("/dummyEvent.json");
      const data = await res.json();
      event.value = data.find((e) => e.id === parseInt(route.params.id));
    });

    return {event}
  },
}
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
  justify-content: center;
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
