import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';

const MapInfoDisplay = () => {
    const map = useMap();
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [zoomLevel, setZoomLevel] = useState(map.getZoom());

    // Cập nhật tọa độ khi di chuyển chuột
    useEffect(() => {
        const handleMouseMove = (event) => {
            const { lat, lng } = event.latlng;
            setCoordinates({ lat, lng });
        };

        // Cập nhật zoom level khi thay đổi
        const updateZoomLevel = () => {
            setZoomLevel(map.getZoom());
        };

        map.on('mousemove', handleMouseMove);
        map.on('zoomend', updateZoomLevel);

        return () => {
            map.off('mousemove', handleMouseMove);
            map.off('zoomend', updateZoomLevel);
        };
    }, [map]);

    return (
        <div className="absolute bottom-5 right-5 px-3 flex gap-x-2 bg-white bg-opacity-80 p-2 rounded-2xl shadow z-[10000]">
            <div>
                <span>Zoom Level: {zoomLevel}</span>
            </div>
            <div className="flex gap-x-2">
                <p>Latitude: {coordinates.lat?.toFixed(5) || 'N/A'}</p>
                <p>Longitude: {coordinates.lng?.toFixed(5) || 'N/A'}</p>
            </div>
        </div>
    );
};

export default MapInfoDisplay;
