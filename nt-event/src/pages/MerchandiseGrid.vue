<template>
  <div class="merch-grid">
    <router-link v-for="(item, index) in merchStore.merchList" :key="index" :to="`/merch/${item.id}`"
      style="text-decoration: none; color: inherit;">
      <MerchCard :merch="item" :index="index" @edit-merch="editMerch" @delete-merch="deleteMerch" />
    </router-link>


    <CreateMerchButton @open-popup="openForm" />

    <div v-if="showForm" class="modal-overlay">
      <div class="modal">
        <button class="close-button" @click="closeForm">×</button>
        <h2>Merchandise Details</h2>
        <form @submit.prevent="submitForm">
          <label>Merch Name</label>
          <input v-model="newMerch.name" placeholder="Merchandise Name" required />

          <label>Description</label>
          <input v-model="newMerch.details" placeholder="Description" required />

          <label>Quantity</label>
          <input type="number" v-model.number="newMerch.stock" placeholder="Quantity" required />

          <label>Price (RM)</label>
          <input type="number" v-model.number="newMerch.price" placeholder="Price (RM)" required />

          <label>Upload Image</label>
          <input type="file" @change="handleImageUpload" accept="image/png, image/jpeg, image/jpg" required />

          <div class="button-wrapper">
            <button type="submit">Create Merchandise</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import MerchCard from '../components/MerchCard.vue';
import CreateMerchButton from './CreateMerchButton.vue';
import { useMerchStore } from '@/store/merch';


export default {
  components: { MerchCard, CreateMerchButton },
  data() {
    return {
      merchStore: useMerchStore(),
      showForm: false,
      editIndex: null,
      newMerch: {
        id: null,
        name: '',
        details: '',
        stock: 0,
        price: 0,
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
      const id = Date.now();
      const merchItem = { ...this.newMerch, id };
      if (this.editIndex !== null) {
        this.merchStore.merchList[this.editIndex] = merchItem;
      } else {
        this.merchStore.addMerch(merchItem);
      }
      this.closeForm();
    },
    editMerch(index) {
      this.newMerch = { ...this.merchList[index] };
      this.editIndex = index;
      this.showForm = true;
    },
    deleteMerch(index) {
      this.merchList.splice(index, 1);
    },
    resetForm() {
      this.newMerch = {
        name: '',
        details: '',
        stock: 0,
        price: 0,
        image: null
      };
      this.editIndex = null;
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  background: white;
  color: black;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  position: relative;
  z-index: 1001;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  display: block;
  scale: 80%;
}

.modal label {
  font-weight: bold;
  margin-top: 1rem;
  display: block;
}

.modal input,
.modal textarea {
  width: 100%;
  padding: 10px;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.modal input[type='file'] {
  padding: 6px;
  background-color: #f9f9f9;
  cursor: pointer;
}

.modal input[type='file']::-webkit-file-upload-button {
  background: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.modal button[type='submit'] {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.modal button[type='submit']:hover {
  background-color: #218838;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}
</style>