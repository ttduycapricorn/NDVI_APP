import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function UpdateMapCenter({ center }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.flyTo(center, map.getZoom());
        }
    }, [center, map]);

    return null;
}
