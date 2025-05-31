<template>
  <div class="carousel-container mx-auto">
    <div id="eventCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(event, index) in events"
          :key="event.id"
          :class="['carousel-item', { active: index === 0 }]"
          @click="goToDetail(event.id)"
        >
          <img
            :src="`/assets/${event.thumbnail}`"
            class="d-block w-100 carousel-img"
            :alt="event.name"
          />
        </div>
      </div>

      <!-- Controls -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#eventCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#eventCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useEventStore } from "../store/eventStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

export default {
  name: "EventCarousel",

  setup() {
    const router = useRouter();
    const store = useEventStore();
    const { events } = storeToRefs(store);

    onMounted(() => {
      if (store.events.length === 0) {
        store.initializeEvents();
      }
      console.log("Loaded Events:", store.events);
    });

    const goToDetail = (id) => {
      router.push({ name: "eventDetail", params: { id } });
    };

    return { events, goToDetail };
  },
};
</script>

<style scoped>
.carousel {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem;
  overflow: hidden;
}

.carousel-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 900px;
}

.carousel-img {
  height: 300px;
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
}


.carousel-caption {
  position: absolute;
  bottom: 20px;
  left: 30px;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.carousel-container{
  max-width: 800px;
  margin: 0 auto;
}
</style>
