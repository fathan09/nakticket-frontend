<template>
  <div class="merch-add-section">
    <button @click="$emit('open-popup')" class="merch-add-card">
      <div class="merch-add-card-info">
        <p>Add Merchandise</p>
      </div>
      <PlusCircleIcon :style="{ width: '32px', height: '32px'}" />
    </button>
  </div>
</template>

<script>
import { PlusCircleIcon } from '@heroicons/vue/24/solid'

export default {
  name: "CreateMerchButton",
  components: {
    PlusCircleIcon
  }
}
</script>

<style scoped>
.merch-add-card {
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  border-radius: 10px;
  cursor: pointer;
  gap: 0.5rem;
}
</style>
