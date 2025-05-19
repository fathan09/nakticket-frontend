<template>
  <div class="home-page">
    <HeaderComponent />
    <main class="main-content">
      <section class="hero">
        <h2>Discover The Upcoming Event!</h2>
        <EventCarousel />
      </section>

      <!-- Categories -->
      <section class="categories">
        <h3>Categories</h3>
        <div class="category-tabs">
          <button>Entertainment & Performances</button>
          <button>Exhibitions</button>
          <button>Sports</button>
          <button>Attractions</button>
          <button>Others</button>
        </div>
      </section>

      <!-- Events Grid Placeholder -->
      <section class="event-grid">
        <EventCard v-for="n in 4" :key="n" />
      </section>
    </main>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import EventCard from "@/components/EventCard.vue";
import EventCarousel from "@/components/EventCarousel.vue"

export default {
  name: "HomePage",
  components: {
    HeaderComponent,
    EventCard,
    EventCarousel,
  },
};
</script>

<style scoped>

.home-page {
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  flex-direction: column;
  background-color: #88a391;
  padding: 1rem;
  color: white;
}

.logo-search {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 50px;
}

.search-bar {
  flex-grow: 1;
  padding: 0.5rem;
  border-radius: 20px;
  border: none;
}

.search-btn {
  background: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
}

.nav-links {
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
  margin-top: 1rem;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.profile-circle {
  width: 35px;
  height: 35px;
  background: white;
  border-radius: 50%;
}

.hero {
  text-align: center;
  background-color: #88a391;
  color: white;
  padding: 2rem 1rem;
}

.categories {
  padding: 2rem 1rem;
  background-color: #fff;
}

.category-tabs {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
}

.category-tabs button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: white;
  cursor: pointer;
}

.event-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
}

.event-card {
  background-color: #e0e0e0;
  width: 200px;
  height: 150px;
  border-radius: 15px;
}
</style>
