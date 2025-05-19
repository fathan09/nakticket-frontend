<template>
  <div class="home-page">
    <HeaderComponent />

    <!-- Hero Section -->
    <section class="hero">
      <h2>Discover The Upcoming Event!</h2>
      <div class="carousel-placeholder"></div>
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
      <div class="event-card" v-for="n in 4" :key="n"></div>
    </section>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: "HomePage",
  components: {
    HeaderComponent,
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

.carousel-placeholder {
  background-color: #d3d3d3;
  height: 200px;
  border-radius: 15px;
  margin: 1rem auto;
  width: 80%;
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
