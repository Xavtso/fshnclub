import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../utils/slices/user-slice";
import eventsSlice from "../utils/slices/events-slice";
import adminSlice from "../utils/slices/admin-slice";
import vouchersSlice from "../utils/slices/vouchers-slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        event: eventsSlice.reducer,
        admin: adminSlice.reducer,
        vouchers: vouchersSlice.reducer
    }
})

export default store;