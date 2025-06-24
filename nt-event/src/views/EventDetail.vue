<template>
  <div class="event-detail" v-if="event">
    <div class="event-banner">
      <img :src="event.image" alt="Event Banner" />
    </div>
    <div class="event-info">
      <h2>{{ event.title }}</h2>
      <h3><strong>Date: </strong>{{ event.date }}</h3>
      <br />
      <h3><strong>Time:</strong></h3>
      <h3>{{ event.time }}</h3>
      <br />
      <h3><strong>Organizers:</strong> {{ event.organizer }}</h3>
      <p class="description">{{ event.description }}</p>
    </div>
  </div>
  <TicketList />
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import TicketList from "@/components/TicketList.vue";

export default {
  name: "EventDetail",
  components: {
    TicketList,
  },
  setup() {
    const route = useRoute();
    const event = ref(null);

    onMounted(async () => {
      const res = await fetch("/dummyEvent.json");
      const data = await res.json();
      event.value = data.find((e) => e.id === parseInt(route.params.id));
    });

    return { event };
  },
};
</script>

<style scoped>
.event-detail {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.event-banner {
  width: 100%;
  max-height: 360px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eaeaea;
}

.event-banner img {
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  border-bottom: 2px solid #ccc;
}

.event-content {
  max-width: 900px;
  margin: 2rem auto;
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.event-info {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.event-info h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.event-info p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.description {
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
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
