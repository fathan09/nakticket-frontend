<template>
  <div id="app">
    <!-- <HeaderComponent /> -->
    <main>
    <!-- <router-view /> -->
    <Login />
    </main>
    
  </div>
</template>

<script>
// import HeaderComponent from "./components/HeaderComponent.vue";
import Login from "./views/loginView.vue";
export default {
  name: "App",
  components: {
    // HeaderComponent,
    Login,

  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
