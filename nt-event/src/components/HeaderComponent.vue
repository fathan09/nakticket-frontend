<template>
  <header class="site-header">
    <div class="left-group">
      <img src="@/assets/NakTicket2.png" alt="NakTicket Logo" class="logo" />
      <input type="text" placeholder="Search your event!" class="search-bar" />
    </div>
    <nav class="nav-links">
      <router-link to="/events">Event</router-link>
      <router-link to="/ticketing">Ticketing</router-link>
      <router-link to="/forum">Forum</router-link>
      <router-link to="/merchandise">Merchandise</router-link>
      <router-link to="/about">About Us</router-link>
      <div class="profile-icon"></div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
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
}

.logo {
  height: 40px;
}

.search-bar {
  padding: 0.6rem 1rem;
  border-radius: 20px;
  border: none;
  width: 100%;
  max-width: 400px;
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
  gap: 1.5rem;
  margin-top: 1rem;
  align-items: center;
}

.nav-links a{
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.profile-icon {
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
}
</style>
