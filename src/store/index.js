import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../utils/slices/user-slice";
import eventsSlice from "../utils/slices/events-slice";
import adminSlice from "../utils/slices/admin-slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        event: eventsSlice.reducer,
        admin: adminSlice.reducer,
    }
})

export default store;