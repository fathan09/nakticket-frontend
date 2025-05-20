import { defineStore } from 'pinia';
import forumData from '@/assets/data/dummyForum.json';

export const useForumStore = defineStore('forumStore', {
  state: () => ({
    threads: forumData,
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
    selectThread(id) {
      this.selectedThread = this.getThreadById(id);
    },
  }
}); 