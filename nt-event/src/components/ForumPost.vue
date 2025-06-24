<template>
  <div class="forum-post">
    <div class="post-header">
      <div class="user-info">
        <div class="avatar"></div>
        <div class="user-details">
          <h4>{{ post.author }}</h4>
          <span class="post-date">{{ formatDate(post.date) }}</span>
        </div>
      </div>
      <div class="post-controls">
        <div class="post-badge" v-if="post.isOrganizer">Organizer</div>
        <div class="post-actions-menu" v-if="canEdit || canDelete">
          <button class="edit-btn" v-if="canEdit" @click="startEditing">Edit</button>
          <button class="delete-btn" v-if="canDelete" @click="confirmDelete">Delete</button>
        </div>
      </div>
    </div>

    <!-- Edit Form -->
    <div v-if="isEditing" class="edit-form">
      <textarea 
        v-model="editContent" 
        placeholder="Edit your post..."
        rows="4"
        class="edit-textarea"
        @keyup.enter.ctrl="saveEdit"
      ></textarea>
      <div class="edit-actions">
        <button class="cancel-edit-btn" @click="cancelEdit">Cancel</button>
        <button class="save-edit-btn" @click="saveEdit" :disabled="!editContent.trim() || saving">
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </div>

    <!-- Post Content -->
    <div v-else class="post-content">
      <p>{{ post.content }}</p>
      <div class="post-edited" v-if="post.edited">
        <small>Edited {{ formatDate(post.editedAt) }}</small>
      </div>
    </div>

    <div class="post-actions">
      <button class="action-button reply-button" @click="$emit('reply')" v-if="!isMainPost">
        <span>Reply</span>
      </button>
      <button class="action-button like-button" @click="handleLike" :class="{ 'liked': hasLiked }">
        <span>❤️ {{ post.likes }} {{ post.likes === 1 ? 'Like' : 'Likes' }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForumPost",
  props: {
    post: {
      type: Object,
      required: true
    },
    threadId: {
      type: Number,
      required: true
    },
    threadTitle: {
      type: String,
      default: ''
    },
    replyId: {
      type: Number,
      default: null
    },
    isMainPost: {
      type: Boolean,
      default: false
    },
    currentUser: {
      type: String,
      default: 'Current User' // Would be replaced with actual user info
    }
  },
  emits: ['reply', 'like', 'edit', 'delete'],
  data() {
    return {
      isEditing: false,
      editContent: '',
      saving: false,
      hasLiked: false // Would track if current user has liked this post
    };
  },
  computed: {
    canEdit() {
      // Allow editing if user is the author or an organizer
      return this.post.author === this.currentUser || this.currentUser === 'Admin';
    },
    canDelete() {
      // Allow deleting if user is the author or an organizer
      return this.post.author === this.currentUser || this.currentUser === 'Admin';
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    startEditing() {
      this.isEditing = true;
      this.editContent = this.post.content;
    },
    
    cancelEdit() {
      this.isEditing = false;
      this.editContent = '';
    },
    
    async saveEdit() {
      if (!this.editContent.trim()) return;
      
      this.saving = true;
      try {
        let editData;
        
        if (this.isMainPost) {
          // Editing main thread post - backend expects both title and content
          editData = {
            title: this.threadTitle || 'Untitled', // Use thread title prop
            content: this.editContent
          };
          this.$emit('edit', { type: 'thread', threadId: this.threadId, data: editData });
        } else {
          // Editing reply - only needs content
          editData = {
            content: this.editContent
          };
          this.$emit('edit', { type: 'reply', threadId: this.threadId, replyId: this.replyId, data: editData });
        }
        
        this.isEditing = false;
      } catch (error) {
        alert('Failed to save edit: ' + error.message);
      } finally {
        this.saving = false;
      }
    },
    
    confirmDelete() {
      const confirmMessage = this.isMainPost 
        ? 'Are you sure you want to delete this entire thread? This action cannot be undone.'
        : 'Are you sure you want to delete this reply?';
        
      if (confirm(confirmMessage)) {
        this.handleDelete();
      }
    },
    
    handleDelete() {
      if (this.isMainPost) {
        this.$emit('delete', { type: 'thread', threadId: this.threadId });
      } else {
        this.$emit('delete', { type: 'reply', threadId: this.threadId, replyId: this.replyId });
      }
    },
    
    handleLike() {
      this.$emit('like', { threadId: this.threadId, replyId: this.replyId });
    }
  }
};
</script>

<style scoped>
.forum-post {
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
}

.user-details h4 {
  margin: 0;
  font-size: 1rem;
}

.post-date {
  color: #777;
  font-size: 0.8rem;
}

.post-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.post-badge {
  background-color: #87a190;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.post-actions-menu {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn {
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.2s;
}

.edit-btn {
  background-color: #3498db;
  color: white;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.edit-form {
  margin-bottom: 1rem;
}

.edit-textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 80px;
}

.edit-textarea:focus {
  outline: none;
  border-color: #87a190;
  box-shadow: 0 0 0 2px rgba(135, 161, 144, 0.2);
}

.edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.cancel-edit-btn, .save-edit-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.cancel-edit-btn {
  background-color: #f0f0f0;
  color: #555;
}

.save-edit-btn {
  background-color: #87a190;
  color: white;
}

.save-edit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.post-content {
  margin-bottom: 1rem;
}

.post-edited {
  margin-top: 0.5rem;
  color: #888;
  font-style: italic;
}

.post-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-button:hover {
  background-color: #f0f0f0;
  color: #87a190;
}

.like-button.liked {
  background-color: #ff6b6b;
  color: white;
}

.like-button.liked:hover {
  background-color: #ff5252;
}
</style> 