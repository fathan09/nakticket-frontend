<!-- MerchandiseGrid.vue -->
<template>
  <div class="merch-grid">
    <!-- Render merchandise cards -->
    <MerchCard
      v-for="(item, index) in merchList"
      :key="index"
      :merch="item"
    />

    <!-- Add Merchandise Button -->
    <CreateMerchButton @open-popup="openForm" />

    <!-- Popup Form -->
    <div v-if="showForm" class="modal-overlay">
      <div class="modal">
        <h3>Add New Merchandise</h3>
        <form @submit.prevent="submitForm">
          <input v-model="newMerch.name" placeholder="Merchandise Name" required />
          <input v-model="newMerch.details" placeholder="Details" required />
          <input type="number" v-model.number="newMerch.price" placeholder="Price" required />
          <input type="number" v-model.number="newMerch.stock" placeholder="Stock" required />
          <input type="file" @change="handleImageUpload" required />
          <button type="submit">Submit</button>
          <button type="button" @click="closeForm">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import MerchCard from './MerchCard.vue';
import CreateMerchButton from './CreateMerchButton.vue';

export default {
  components: { MerchCard, CreateMerchButton },
  data() {
    return {
      merchList: [],
      showForm: false,
      newMerch: {
        name: '',
        details: '',
        price: 0,
        stock: 0,
        image: null
      }
    };
  },
  methods: {
    openForm() {
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.resetForm();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.newMerch.image = URL.createObjectURL(file);
      }
    },
    submitForm() {
      this.merchList.push({ ...this.newMerch });
      this.closeForm();
    },
    resetForm() {
      this.newMerch = {
        name: '',
        details: '',
        price: 0,
        stock: 0,
        image: null
      };
    }
  }
};
</script>

<style scoped>
.merch-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
}

.modal input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 0.5rem;
}
</style>