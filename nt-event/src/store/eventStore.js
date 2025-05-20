import { defineStore } from 'pinia';
import eventData from '@/assets/data/dummyEvent.json';

export const useEventStore = defineStore('eventStore', {
    state: () => ({
        events: [eventData],
        selectedEvent: null,
    }),
    getters:{
        getAllEvents: (state) => state.events,
    },
    actions: {
        getEventById(id){
            this.selectedEvent = this.events.find(e => e.id === parseInt(id));
        }
    }
});