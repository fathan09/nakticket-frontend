<template>
  <div class="forum-view">
    
    <main class="forum-content">
      <div class="container">
        <!-- Switch between showing thread list or new thread form -->
        <NewThreadForm 
          v-if="showNewThreadForm" 
          @submit="createThread" 
          @cancel="showNewThreadForm = false"
          :submitting="submitting"
        />
        
        <div v-else-if="selectedThreadId !== null" class="selected-thread">
          <button class="back-btn" @click="selectedThreadId = null">
            &larr; Back to Discussions
          </button>
          <ForumThread 
            :thread="selectedThread" 
            v-if="selectedThread"
          />
        </div>
        
        <ForumList 
          v-else
          :threads="threads" 
          :loading="loading"
          @select-thread="selectThread"
          @open-new-thread="showNewThreadForm = true"
        />
      </div>
    </main>
  </div>
</template>

<script>
import ForumList from "@/components/ForumList.vue";
import ForumThread from "@/components/ForumThread.vue";
import NewThreadForm from "@/components/NewThreadForm.vue";
import { ref, onMounted } from 'vue';
import { useForumStore } from "@/store/forumStore";
import { storeToRefs } from "pinia";

export default {
  name: "ForumView",
  components: {
    ForumList,
    ForumThread,
    NewThreadForm
  },
  setup() {
    const forumStore = useForumStore();
    const showNewThreadForm = ref(false);
    const selectedThreadId = ref(null);
    
    // Get reactive state from the store
    const { threads, loading, submitting, selectedThread } = storeToRefs(forumStore);
    
    // Fetch forum data when component is mounted
    onMounted(() => {
      forumStore.fetchForumData();
    });
    
    // Methods
    const selectThread = (threadId) => {
      selectedThreadId.value = threadId;
      forumStore.selectThread(threadId);
    };
    
    const createThread = async (newThread) => {
      try {
        await forumStore.createThread(newThread);
        showNewThreadForm.value = false;
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        alert(error.message);
      }
    };
    
    return {
      threads,
      loading,
      submitting,
      selectedThread,
      selectedThreadId,
      showNewThreadForm,
      selectThread,
      createThread
    };
  }
};
</script>

<style scoped>
.forum-view {
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
}

.forum-content {
  padding: 2rem 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.back-btn {
  background: none;
  border: none;
  color: #555;
  font-size: 1rem;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.back-btn:hover {
  color: #87a190;
}

.selected-thread {
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .forum-content {
    padding: 1rem 0.5rem;
  }
}
</style>
