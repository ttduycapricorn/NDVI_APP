import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState('');
    const [showLocation, setShowLocation] = useState(false);

    const map = useMap();

    const icon = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const getAddress = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
            );
            setAddress(response.data.display_name);
        } catch (error) {
            console.error('Không thể lấy địa chỉ:', error);
            setAddress('Không thể lấy địa chỉ');
        }
    };

    const handleLocate = () => {
        map.locate({
            setView: false,
            maxZoom: 16,
        })
            .on('locationfound', (e) => {
                const { lat, lng } = e.latlng;
                setPosition(e.latlng);
                map.flyTo(e.latlng, 16);
                getAddress(lat, lng);
                setShowLocation(false);
            })
            .on('locationerror', (e) => {
                console.error('Không thể xác định vị trí:', e);
                setShowLocation(false);
            });
    };

    useEffect(() => {
        if (showLocation) {
            handleLocate();
        }
    }, [showLocation]);

    return (
        <>
            <button
                onClick={() => setShowLocation(true)}
                className="absolute z-[9997] top-[16%] right-5 flex items-center text-xl px-2 py-2 rounded-3xl bg-white hover:bg-blue-500 transition-all duration-500 ease-in-out text-gray-600 hover:text-white group"
            >
                <FaLocationDot />
                <span className="overflow-hidden text-sm max-w-0 opacity-0 transform group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 group-hover:translate-x-0 transition-all duration-500 ease-in-out whitespace-nowrap">
                    Your Location
                </span>
            </button>

            {position && (
                <Marker position={position} icon={icon}>
                    <Popup>
                        <b>Địa chỉ hiện tại:</b> <br />
                        {address || 'Đang lấy địa chỉ...'}
                    </Popup>
                </Marker>
            )}
        </>
    );
}

export default LocationMarker;
