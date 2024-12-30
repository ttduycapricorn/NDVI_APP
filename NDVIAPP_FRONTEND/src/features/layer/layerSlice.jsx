import { createSlice } from '@reduxjs/toolkit';
import { fetchLayerGeoJson, fetchNNGeoJson } from '../../app/action';

const layerSlice = createSlice({
    name: 'layer',
    initialState: {
        layer: [],
        compareLayer: {
            NN: null,
            PNN: null,
            TQ: null,
        },
        loading: false,
        error: null,
    },
    reducers: {
        toggleTQ: (state, action) => {
            // Không cần gán loading ở đây
            state.compareLayer.TQ = state.compareLayer.TQ !== null ? null : action.payload;
        },
        toggleNN: (state, action) => {
            // Không cần gán loading ở đây
            state.compareLayer.NN = state.compareLayer.NN !== null ? null : action.payload;
        },
        togglePNN: (state, action) => {
            // Không cần gán loading ở đây

            state.compareLayer.PNN = state.compareLayer.PNN !== null ? null : action.payload;
        },
        resetCompareLayer: (state) => {
            state.compareLayer = {
                NN: null,
                PNN: null,
                TQ: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLayerGeoJson.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLayerGeoJson.fulfilled, (state, action) => {
                state.loading = false;
                state.layer = action.payload;
            })
            .addCase(fetchLayerGeoJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchNNGeoJson.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNNGeoJson.fulfilled, (state, action) => {
                state.loading = false;
                state.layer = action.payload;
            })
            .addCase(fetchNNGeoJson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { toggleTQ, toggleNN, togglePNN, resetCompareLayer } = layerSlice.actions;

export default layerSlice.reducer;
