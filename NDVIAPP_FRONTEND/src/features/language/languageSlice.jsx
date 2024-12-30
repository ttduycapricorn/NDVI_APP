import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state ban đầu
const initialState = {
    status: 'vi',
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        change: (state) => {
            return state;
        },
    },
});

export const { change } = languageSlice.actions;

export default languageSlice.reducer;
