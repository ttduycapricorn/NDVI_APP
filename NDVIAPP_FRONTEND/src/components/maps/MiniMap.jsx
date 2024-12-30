import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';
import L from 'leaflet';
import 'leaflet-minimap';
import { useEffect, useRef } from 'react';

const MiniMapControl = ({ geoJsonData }) => {
    const map = useMap();
    const miniMapRef = useRef(null); // Reference to store the minimap instance
    const geoJsonLayerRef = useRef(null); // Reference for geoJSON layer

    useEffect(() => {
        if (!miniMapRef.current) {
            const miniMapLayer = new L.TileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
                minZoom: 0,
                maxZoom: 13,
            });

            // Create the minimap control and store it in the ref
            miniMapRef.current = new L.Control.MiniMap(miniMapLayer, {
                toggleDisplay: true,
                minimized: false,
                position: 'bottomleft',
            }).addTo(map);
        }

        // Create or update the geoJSON layer
        if (geoJsonLayerRef.current) {
            // If a geoJSON layer already exists, remove it before adding a new one
            miniMapRef.current._miniMap.removeLayer(geoJsonLayerRef.current);
        }
        geoJsonLayerRef.current = L.geoJSON(geoJsonData);
        miniMapRef.current._miniMap.addLayer(geoJsonLayerRef.current);

        return () => {
            // Clean up minimap when the component unmounts
            if (miniMapRef.current) {
                miniMapRef.current.remove();
                miniMapRef.current = null;
            }
        };
    }, [map, geoJsonData]);

    return null;
};

export default MiniMapControl;
