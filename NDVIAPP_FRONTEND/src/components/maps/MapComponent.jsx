import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
// import axios from 'axios';

function MapComponent() {
    const [geoJsonData, setGeoJsonData] = useState(null);

    useEffect(() => {
        // // Replace with your GeoServer API URL
        // const geoJsonUrl = 'http://localhost:8082/api';

        // // Fetch GeoJSON data from backend
        // axios
        //     .get(geoJsonUrl)
        //     .then((response) => {
        //         const geoJson = response.data.data;
        //         console.log('GeoJSON Data:', geoJson);
        //         setGeoJsonData(geoJson);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching GeoJSON from backend:', error);
        //     });

        fetch(
            'http://localhost:8080/geoserver/ne/wms?service=WMS&version=1.1.0&request=GetMap&layers=ne%3Aketquaphanloai&bbox=594928.5%2C1066883.375%2C603311.5%2C1072256.625&width=768&height=492&srs=EPSG%3A32648&styles=&format=application/openlayers',
        ).then((data) => {
            setGeoJsonData(data.data);
            console.log('data', data);
        });
    }, []);

    return (
        <MapContainer
            center={[9.675, 105.9043]}
            zoom={14}
            scrollWheelZoom={true}
            style={{ height: '600px', width: '100%', zIndex: '0' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
            />

            {/* Conditionally render GeoJSON layer once data is fetched */}
            {geoJsonData && <GeoJSON data={geoJsonData} />}
        </MapContainer>
    );
}

export default MapComponent;
