import { defineStore } from 'pinia';


export const useEventStore = defineStore('eventStore', {
    state: () => ({
        events: [],
    }),
    getters:{
        getAllEvents: (state) => state.events,
    },
    actions: {
        getEventById(id){
            this.selectedEvent = this.events.find(e => e.id === parseInt(id));
        },

        updateEventDescription(eventId, desc){
            const eventDesc = this.events.find(i => i.id === eventId)
            if (eventDesc) {
                eventDesc.description = desc
            }
        },

        removeEventListener(eventId){
            this.events = this.events.filter(event => event.id !== eventId)
        }
    }
});