<template>
  <div class="event-card" @click="goToDetail">
    <img :src="event.thumbnail" alt="Event Thumbnail" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";


export default {
  name: "EventCard",
  props: {
    event: Object
  },

  setup(props){
    const router = useRouter();
    const goToDetail = () =>{
      router.push({name: 'eventDetail', params: {id: props.event.id}});
    };
    return {goToDetail};
  }
};
</script>

<style scoped>
.event-card {
  width: 180px;
  height: 130px;
  background-color: #ddd;
  border-radius: 15px;
}

.event-card img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
