<template>
  <header class="site-header">
    <div class="left-group">
      <router-link to="../">
      <img src="@/assets/NakTicket2.png" alt="NakTicket Logo" class="logo" />
      </router-link>
      <input type="text" placeholder="Search your event!" class="search-bar" />
    </div>
    <nav class="nav-links">
      <router-link to="/events">Event</router-link>
      <router-link to="/create-event">Create Your Event</router-link>
      <router-link to="/forum">Forum</router-link>
      <router-link to="/merchandise">Merchandise</router-link>
      <router-link to="/about">About Us</router-link>
      <div class="profile-wrapper" @click="toggleDropdown">
        <div class="profile-icon"></div>
        <div v-if="showDropdown" class="profile-dropdown">
            <router-link to="/my-event"> My events</router-link>
        </div>
      </div>
      

    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data(){
    return{
      showDropdown:false,
    };
  },
  methods: {
    toggleDropdown(){
      this.showDropdown = !this.showDropdown;
    },
  },
};
</script>

<style scoped>
.site-header {
  background-color: #87a190;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  flex-wrap: wrap;
}

.left-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 300px;
  max-width: 60%;
}

.logo {
  height: 75px;
  width: 180px;
  object-fit: contain;
}

.search-bar {
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  border: none;
  min-width: 200px;
  max-width: 100%;
  font-size: 1rem;
  background-color: white;
  color: #333;
}

.search-bar::placeholder {
  color: #a0a0a0;
  font-style: italic;
}

.nav-links {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  margin-top: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.nav-links a{
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.profile-wrapper {
  position: relative;
  cursor: pointer;
}

.profile-icon {
  width: 28px;
  height: 28px;
  background-color: white;
  border-radius: 50%;
}

.profile-dropdown {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.profile-dropdown a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 0;
  transition: background 0.2s;
}

.profile-dropdown a:hover {
  background-color: #f5f5f5;
}
</style>
