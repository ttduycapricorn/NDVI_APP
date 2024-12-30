import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLayerGeoJson = createAsyncThunk('layer/fetchLayerGeoJson', async () => {
    const response = await axios.get(`/geoserver/wfs`, {
        params: {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            // typeName: 'minhkha:thuanhoa2022_4326',
            typeName: 'minhkha:thuahoa_tkdd2022_crs4326',
            outputFormat: 'application/json',
        },
    });

    return response.data;
});

export const fetchNNGeoJson = createAsyncThunk('layer/fetchNNGeoJson', async () => {
    const response = await axios.get(`/geoserver/wfs`, {
        params: {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            typeName: 'minhkha:thuanhoa_tkdd2019',
            outputFormat: 'application/json',
        },
    });
    return response.data;
});
