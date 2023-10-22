import { createSlice } from "@reduxjs/toolkit";


const vouchersSlice = createSlice({
    name: 'vouchers',
    initialState: {
        vouchers: []
    },
    reducers: {
        fetchVouchers(state,action) {
            state.vouchers = action.payload;
        },
        createNewVoucher(state,action) {
            state.vouchers.push(action.payload)
        },
        deleteVoucher(state, action) {
            const filteredVouchers = state.vouchers.filter(voucher => voucher.id !== action.payload)
            state.vouchers = filteredVouchers;
        }
    }
})

export const vouchersSliceActions = vouchersSlice.actions;

export default vouchersSlice;