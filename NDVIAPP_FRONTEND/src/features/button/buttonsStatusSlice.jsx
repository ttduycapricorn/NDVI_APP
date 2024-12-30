// buttonsStatusSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarButton: 'map',
    contentButton: 'googleMap',
    dropdownButton: {
        CRS: [],
        years: [],
        month: [],
    },
};

export const buttonsStatusSlice = createSlice({
    name: 'button',
    initialState,
    reducers: {
        clickButton: (state, action) => {
            state.sidebarButton = action.payload;
        },
    },
});

export const { clickButton } = buttonsStatusSlice.actions;

export default buttonsStatusSlice.reducer;
