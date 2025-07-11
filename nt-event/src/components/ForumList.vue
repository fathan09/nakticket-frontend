<template>
  <div class="forum-list">
    <div class="forum-header">
      <h2>Forum Discussions</h2>
      <div class="forum-actions">
        <button class="new-thread-btn" @click="$emit('open-new-thread')">
          New Discussion
        </button>
        <div class="forum-filters">
          <select v-model="currentFilter" class="filter-select">
            <option value="all">All Discussions</option>
            <option value="organizer">Organizer Posts</option>
            <option value="recent">Recent Activity</option>
          </select>
        </div>
      </div>
    </div>

    <div class="threads-container">
      <div v-if="loading" class="loading-indicator">
        <p>Loading discussions...</p>
      </div>
      
      <div v-else-if="filteredThreads.length === 0" class="no-threads">
        <p>No discussions found. Start a new discussion!</p>
      </div>
      
      <div v-else class="thread-list">
        <div 
          v-for="thread in filteredThreads" 
          :key="thread.id"
          class="thread-item"
          @click="selectThread(thread.id)"
        >
          <div class="thread-preview">
            <h3 class="thread-title">{{ thread.title }}</h3>
            <p class="thread-excerpt">{{ thread.mainPost.content.substring(0, 100) }}{{ thread.mainPost.content.length > 100 ? '...' : '' }}</p>
            
            <div class="thread-meta">
              <span class="thread-author">
                {{ thread.mainPost.author }}
                <span v-if="thread.mainPost.isOrganizer" class="author-badge">Organizer</span>
              </span>
              <span class="thread-date">{{ formatDate(thread.mainPost.date) }}</span>
              <span class="thread-stats">{{ thread.replies ? thread.replies.length : 0 }} replies</span>
              <div class="thread-actions" v-if="canDeleteThread(thread)">
                <button class="delete-thread-btn" @click.stop="deleteThread(thread.id)">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForumList",
  props: {
    threads: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentFilter: 'all'
    };
  },
  computed: {
    filteredThreads() {
      switch (this.currentFilter) {
        case 'organizer':
          return this.threads.filter(thread => thread.mainPost.isOrganizer);
        case 'recent':
          return [...this.threads].sort((a, b) => 
            new Date(b.mainPost.date) - new Date(a.mainPost.date)
          );
        default:
          return this.threads;
      }
    }
  },
  methods: {
    selectThread(threadId) {
      this.$emit('select-thread', threadId);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    canDeleteThread(thread) {
      // Allow deletion if user is admin or the thread author
      const currentUser = 'Current User'; // Would be replaced with actual user
      return currentUser === 'Admin' || thread.mainPost.author === currentUser;
    },
    async deleteThread(threadId) {
      if (confirm('Are you sure you want to delete this thread? This action cannot be undone.')) {
        try {
          await this.$parent.deleteThread(threadId);
        } catch (error) {
          alert('Failed to delete thread: ' + error.message);
        }
      }
    }
  }
};
</script>

<style scoped>
.forum-list {
  width: 100%;
}

.forum-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.forum-header h2 {
  margin: 0;
  color: #333;
}

.forum-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.new-thread-btn {
  background-color: #87a190;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.new-thread-btn:hover {
  background-color: #758e7e;
}

.filter-select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
}

.threads-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.thread-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.thread-item:hover {
  background-color: #f5f5f5;
}

.thread-item:last-child {
  border-bottom: none;
}

.thread-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #333;
}

.thread-excerpt {
  margin: 0 0 0.8rem 0;
  color: #555;
  font-size: 0.9rem;
}

.thread-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #777;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.author-badge {
  background-color: #87a190;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.7rem;
  margin-left: 0.5rem;
}

.loading-indicator, .no-threads {
  padding: 2rem;
  text-align: center;
  color: #777;
}

.thread-actions {
  display: flex;
  gap: 0.5rem;
}

.delete-thread-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #777;
}
</style> 