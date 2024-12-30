import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function MapResizeHandler({ isSidebarOpen }) {
    const map = useMap();

    useEffect(() => {
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
            }, 500);
        }
    }, [isSidebarOpen, map]);

    return null;
}

export default MapResizeHandler;
