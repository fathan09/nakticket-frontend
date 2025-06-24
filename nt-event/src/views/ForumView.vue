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
      // Prevent multiple calls
      if (submitting.value) {
        console.log('ForumView: Already submitting, ignoring duplicate call');
        return;
      }
      
      console.log('ForumView: Starting thread creation...', newThread);
      
      try {
        await forumStore.createThread(newThread);
        console.log('ForumView: Thread created successfully');
        showNewThreadForm.value = false;
        // Show success message
        alert('Thread created successfully!');
      } catch (error) {
        console.error('ForumView: Error creating thread:', error.response?.data || error.message);
        
        // Check if thread was actually created despite the error
        const currentThreadCount = threads.value.length;
        await forumStore.fetchForumData();
        
        if (threads.value.length > currentThreadCount) {
          // Thread was created successfully despite the error
          console.log('ForumView: Thread was created despite error');
          showNewThreadForm.value = false;
          alert('Thread created successfully!');
        } else {
          // Actual error occurred
          console.log('ForumView: Actual error occurred');
          const errorMessage = error.response?.data?.error || error.message || 'Failed to create thread';
          alert('Error: ' + errorMessage);
        }
      }
    };
    
    const deleteThread = async (threadId) => {
      try {
        await forumStore.deleteThread(threadId);
        // If the deleted thread was selected, go back to the list
        if (selectedThread.value && selectedThread.value.id === threadId) {
          selectedThread.value = null;
        }
      } catch (error) {
        console.error('Error deleting thread:', error);
        throw error;
      }
    };
    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
    
    return {
      threads,
      loading,
      submitting,
      selectedThread,
      selectedThreadId,
      showNewThreadForm,
      selectThread,
      createThread,
      deleteThread,
      formatDate
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
