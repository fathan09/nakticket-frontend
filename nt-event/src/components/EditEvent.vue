<template>
  <div class="event-edit-box" v-if="event">
    <div class="banner-upload" @click="triggerImageUpload">
      <input type="file" ref="imageInput" accept="image/*" @change="handleImage" hidden />
      <img v-if="bannerPreview" :src="bannerPreview" alt="Banner Preview" />
      <div v-else class="upload-placeholder">
        <span class="plus">+</span>
        <p>Upload poster/banner</p>
        <p class="note">Recommended 724 x 340px and not more than 2Mb</p>
      </div>
    </div>

    <div class="form-section">
      <input type="text" v-model="event.name" :placeholder="event.name" />
      <select v-model="event.category">
        <option disabled value="">Choose Category</option>
        <option value="performance">Entertainment & Performances</option>
        <option value="exhibition">Exhibition</option>
        <option value="sports">Sports</option>
        <option value="others">Others</option>
      </select>

      <div class="grid-row">
        <div class="field">
          <label>Organized by</label>
          <p>{{ event.organizer }}</p>
        </div>

        <div class="field">
          <label>Date & Time</label>
          <input type="date" v-model="event.date" />
          <input type="time" v-model="event.time" />
        </div>

        <div class="field">
          <label>Location</label>
          <input type="text" v-model="event.location" />
        </div>
      </div>
      <div class="field">
        <label>Event Description</label>
        <textarea
          v-model="event.description"
          rows="6"
          :placeholder="event.description"
          class="description-textarea"
        ></textarea>
      </div>
    </div>
    
    <div class="form-actions">
      <button @click="submitEdit" class="submit-btn">Update Event</button>
    </div>
  </div>

  <div v-else class="loading">
    <p>Loading event data...</p>
  </div>
</template>

<script>
import { ref } from "vue";
// import { useRoute } from "vue-router";

export default {
  name: "EventEdit",
  setup(){
    // const route = useRoute();
    const event = ref(null);
    const bannerPreview = ref(null);

    const triggerImageUpload = () => {
        this.$refs.imageInput.click();
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 2 * 1024 * 1024) {
            bannerPreview.value = URL.createObjectURL(file);
            event.value.banner = bannerPreview;
        } else {
            alert("File too large");
        }
    };

    const submitEdit= () => {
        //Backend update functionality here
        console.log("Edited Event:", event.value);
        alert("Event updated!");
    };

    /* 
        Fetch from backend goes here
    */

    return {
        event,
        bannerPreview,
        triggerImageUpload,
        handleImage,
        submitEdit
    };
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
};
</script>