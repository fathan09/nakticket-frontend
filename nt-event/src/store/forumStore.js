import { defineStore } from 'pinia';

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
        const response = await fetch('/dummyForum.json');
        if (!response.ok) {
          throw new Error('Failed to fetch forum data');
        }
        this.threads = await response.json();
      } catch (error) {
        console.error('Error loading forum data:', error);
      } finally {
        this.loading = false;
      }
    },
    
    selectThread(id) {
      this.selectedThread = this.getThreadById(id);
    },

    // Add more functions here
  }
}); 