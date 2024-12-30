import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStep: 1,
    isShowPredictionSteps: false,
    isPredicted: false,
    status: 'success',
    steps: [
        { label: 'Step 1: Data Preparing', description: 'Preparing your data files.' },
        { label: 'Step 2: Predicting', description: 'Prepare the data for prediction.' },
        { label: 'Step 3: Comparing', description: 'Prediction process completed successfully.' },
    ],
};

export const predictionSteps = createSlice({
    name: 'predictionSteps',
    initialState,
    reducers: {
        handlePrevStep: (state) => {
            state.currentStep = state.currentStep > 1 ? state.currentStep - 1 : state.currentStep;
        },
        handleNextStep: (state) => {
            state.currentStep = state.currentStep < 3 ? state.currentStep + 1 : state.currentStep;
        },
        toggleShowPredictionSteps: (state) => {
            state.currentStep = 1;
            state.isShowPredictionSteps = !state.isShowPredictionSteps;
        },
        setPredicted: (state) => {
            state.isPredicted = true;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase;
    },
});

export const selectPredictionCurrentStep = (state) => state.predictionSteps.currentStep;
export const selectPredictionStatus = (state) => state.predictionSteps.status;
export const selectPredictionSteps = (state) => state.predictionSteps.steps;
export const selectIsShowpredictionSteps = (state) => state.predictionSteps.isShowPredictionSteps;
export const selectDistricted = (state) => state.predictionSteps.isPredicted;

export const { handlePrevStep, handleNextStep, toggleShowPredictionSteps, setPredicted } = predictionSteps.actions;

export default predictionSteps.reducer;
