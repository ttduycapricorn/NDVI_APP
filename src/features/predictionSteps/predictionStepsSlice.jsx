import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStep: 1,
    isShowPredictionSteps: false,
    status: 'success',
    steps: [
        { label: 'Step 1: Data Upload', description: 'Upload your data files.' },
        { label: 'Step 2: Preprocessing', description: 'Prepare the data for prediction.' },
        { label: 'Step 3: Success', description: 'Prediction process completed successfully.' },
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
    },
    extraReducers: (builder) => {
        // builder.addCase;
    },
});

export const selectPredictionCurrentStep = (state) => state.predictionSteps.currentStep;
export const selectPredictionStatus = (state) => state.predictionSteps.status;
export const selectPredictionSteps = (state) => state.predictionSteps.steps;
export const selectIsShowpredictionSteps = (state) => state.predictionSteps.isShowPredictionSteps;

export const { handlePrevStep, handleNextStep, toggleShowPredictionSteps } = predictionSteps.actions;

export default predictionSteps.reducer;
