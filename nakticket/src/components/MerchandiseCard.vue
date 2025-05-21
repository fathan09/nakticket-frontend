<template>
    <div class="card" @click="goToDetail">
      <img :src="product.image || '/images/placeholder.png'" alt="product image" />
      <div class="card-body">
        <strong>{{ product.name }}</strong>
        <p>{{ product.description }}</p>
        <p><span class="label">Price:</span> {{ product.price }} {{ product.currency }}</p>
        <button class="add-btn" @click.stop="$emit('add-to-cart', product)">Add to Cart</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MerchandiseCard',
    props: ['product'],
    methods: {
      goToDetail() {
        this.$router.push(`/merch/${this.product.id}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 1rem;
    background-color: white;
    cursor: pointer;
    transition: box-shadow 0.3s;
  }
  .card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 1rem;
  }
  .card-body {
    text-align: center;
  }
  .label {
    font-weight: bold;
  }
  .add-btn {
    margin-top: 10px;
    background-color: #799887;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }
  .add-btn:hover {
    background-color: #657a70;
  }
  </style>
  