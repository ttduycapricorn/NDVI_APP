import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../features/language/languageSlice.jsx';
import crsReducer from '../features/CRS/crsSlice.jsx';
import buttonReducer from '../features/button/buttonsStatusSlice.jsx';
import layerReducer from '../features/layer/layerSlice.jsx';
import inputPredictionReducer from '../features/InputMapProperties/inputPredictionSlice.jsx';
import chartReducer from '../features/setting/settingSlice.jsx';
import predictionStepsReducer from '../features/predictionSteps/predictionStepsSlice.jsx';

const store = configureStore({
    reducer: {
        language: languageReducer,
        CRS: crsReducer,
        button: buttonReducer,
        layer: layerReducer,
        inputPrediction: inputPredictionReducer,
        settings: chartReducer,
        predictionSteps: predictionStepsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
