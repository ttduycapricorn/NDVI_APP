import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    startDate: null,
    endDate: null,
    modelName: null,
    area: null,
    isPredictionFormOpen: false,
};

export const inputPredictionSlice = createSlice({
    name: 'inputPrediction',
    initialState,
    reducers: {
        submitInputPrediction: (state, action) => {
            return { ...state, ...action.payload };
        },
        togglePredictionForm: (state) => {
            state.isPredictionFormOpen = !state.isPredictionFormOpen;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase;
    },
});

export const selectPredictionFormStatus = (state) => state.inputPrediction.isPredictionFormOpen;

export const { submitInputPrediction, togglePredictionForm } = inputPredictionSlice.actions;

export default inputPredictionSlice.reducer;
