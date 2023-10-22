import { createSlice } from "@reduxjs/toolkit";


const vouchersSlice = createSlice({
    name: 'vouchers',
    initialState: {
        vouchers: []
    },
    reducers: {
        
    }
})

export const vouchersSliceActions = vouchersSlice.actions;

export default vouchersSlice;