<template>
  <div class="merchandise-page">
    <div class="container">
      <h3>Merchandise Purchase</h3>
      <h4>Merchandise Sold for {{ eventTitle }}</h4>

      <div v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</div>

      <div class="grid">
        <MerchandiseCard
          v-for="item in merchList"
          :key="item.id"
          :product="item"
          @add-to-cart="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MerchandiseCard from '../components/MerchandiseCard.vue';
import { useCartStore } from '../store/cart';

export default {
  name: 'MerchandiseList',
  components: { MerchandiseCard },
  props: {
    merchList: {
      type: Array,
      required: true
    },
    eventTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      feedbackMessage: ''
    };
  },
  methods: {
    addToCart(product) {
      const cart = useCartStore();
      cart.addItem(product);
      this.showFeedback(`${product.name} added to cart!`);
    },
    showFeedback(message) {
      this.feedbackMessage = message;
      setTimeout(() => (this.feedbackMessage = ''), 2000);
    }
  }
};
</script>

<style scoped>
.merchandise-page {
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: poppins, sans-serif;
}
.event-header {
  background-color: #f4e4be;
  padding: 1rem;
  text-align: left;
  font-weight: bold;
  font-size: large;
}
.container {
  max-width: 1200px;
  margin: auto;
  padding: 2rem 1rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.feedback {
  background-color: #dff0d8;
  color: #3c763d;
  padding: 10px;
  border: 1px solid #d0e9c6;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
