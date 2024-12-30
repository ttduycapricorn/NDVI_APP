import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state ban đầu
const initialState = {
    selected: 'EPSG:4326',
    CRS: [
        {
            value: 'EPSG:4326',
        },
        {
            value: 'EPSG:4326',
        },
        {
            value: 'EPSG:4326',
        },
        {
            value: 'EPSG:4326',
        },
        {
            value: 'EPSG:4326',
        },
    ],
};

export const crsSlice = createSlice({
    name: 'CRS',
    initialState,
    reducers: {
        select: (state) => {
            return state;
        },
    },
    extraReducers: (builder) => {},
});

// Export các action được tự động tạo ra từ slice
export const { change } = crsSlice.actions;

// Export reducer của slice
export default crsSlice.reducer;
