import { defineStore } from 'pinia';
import axios from 'axios';

export const useForumStore = defineStore('forumStore', {
  state: () => ({
    threads: [],
    selectedThread: null,
    loading: false,
    submitting: false
  }),
  
  getters: {
    getAllThreads: (state) => state.threads,
    
    getThreadById: (state) => (id) => {
      return state.threads.find(thread => thread.id === parseInt(id));
    },
    
    getOrganizerThreads: (state) => {
      return state.threads.filter(thread => thread.mainPost.isOrganizer);
    },
    
    getRecentThreads: (state) => {
      return [...state.threads].sort((a, b) => 
        new Date(b.mainPost.date) - new Date(a.mainPost.date)
      );
    }
  },
  
  actions: {
    async fetchForumData() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost/NakTicketBackend/forum');
        this.threads = response.data;
      } catch (error) {
        console.error('Error loading forum data:', error);
        this.threads = [];
      } finally {
        this.loading = false;
      }
    },
    
    selectThread(id) {
      this.selectedThread = this.getThreadById(id);
    },

    async createThread(threadData) {
      this.submitting = true;
      try {
        const response = await axios.post('http://localhost/NakTicketBackend/forum', threadData);
        await this.fetchForumData();
        return response.data;
      } catch (error) {
        console.error('Error creating thread:', error);
        throw error;
      } finally {
        this.submitting = false;
      }
    },

    async editThread(threadId, editData) {
      this.submitting = true;
      try {
        const response = await axios.put(`http://localhost/NakTicketBackend/forum/${threadId}`, editData);
        await this.fetchForumData();
        if (this.selectedThread && this.selectedThread.id === parseInt(threadId)) {
          this.selectedThread = this.getThreadById(threadId);
        }
        return response.data;
      } catch (error) {
        console.error('Error editing thread:', error);
        throw error;
      } finally {
        this.submitting = false;
      }
    },

    async addReply(threadId, replyData) {
      this.submitting = true;
      try {
        const response = await axios.post(`http://localhost/NakTicketBackend/forum/${threadId}/reply`, replyData);
        await this.fetchForumData();
        if (this.selectedThread && this.selectedThread.id === parseInt(threadId)) {
          this.selectedThread = this.getThreadById(threadId);
        }
        return response.data;
      } catch (error) {
        console.error('Error adding reply:', error);
        throw error;
      } finally {
        this.submitting = false;
      }
    },

    async editReply(threadId, replyId, editData) {
      this.submitting = true;
      try {
        const response = await axios.put(`http://localhost/NakTicketBackend/forum/${threadId}/reply/${replyId}`, editData);
        await this.fetchForumData();
        if (this.selectedThread && this.selectedThread.id === parseInt(threadId)) {
          this.selectedThread = this.getThreadById(threadId);
        }
        return response.data;
      } catch (error) {
        console.error('Error editing reply:', error);
        throw error;
      } finally {
        this.submitting = false;
      }
    },

    async deleteThread(threadId) {
      try {
        const response = await axios.delete(`http://localhost/NakTicketBackend/forum/${threadId}`);
        this.threads = this.threads.filter(thread => thread.id !== parseInt(threadId));
        if (this.selectedThread && this.selectedThread.id === parseInt(threadId)) {
          this.selectedThread = null;
        }
        return response.data;
      } catch (error) {
        console.error('Error deleting thread:', error);
        throw error;
      }
    },

    async deleteReply(threadId, replyId) {
      try {
        const response = await axios.delete(`http://localhost/NakTicketBackend/forum/${threadId}/reply/${replyId}`);
        await this.fetchForumData();
        if (this.selectedThread && this.selectedThread.id === parseInt(threadId)) {
          this.selectedThread = this.getThreadById(threadId);
        }
        return response.data;
      } catch (error) {
        console.error('Error deleting reply:', error);
        throw error;
      }
    },

    async toggleLike(threadId, replyId = null) {
      try {
        let response;
        if (replyId) {
          // Like a reply
          response = await axios.put(`http://localhost/NakTicketBackend/forum/${threadId}/reply/${replyId}/like`, {
            action: 'like'
          });
        } else {
          // Like a thread
          response = await axios.put(`http://localhost/NakTicketBackend/forum/${threadId}/like`, {
            action: 'like'
          });
        }
        
        // Refresh data to get updated like counts
        await this.fetchForumData();
        if (this.selectedThread && this.selectedThread.id === parseInt(threadId)) {
          this.selectedThread = this.getThreadById(threadId);
        }
        
        return response.data;
      } catch (error) {
        console.error('Error toggling like:', error);
        throw error;
      }
    }
  }
}); 