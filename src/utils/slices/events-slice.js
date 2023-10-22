import { createSlice } from "@reduxjs/toolkit";



const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: []
    },
    reducers: {
        storeEvents(state,action) {
            state.events = action.payload;
        },
        deleteEvent(state, action) {
            const filteredEvents = state.events.filter(event => event.id !== action.payload)
            state.events = filteredEvents;
        }


    }
})

export const eventsSliceActions = eventsSlice.actions;

export default eventsSlice;