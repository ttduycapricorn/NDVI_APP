import { useState, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { FaHome } from 'react-icons/fa';

export default function ResetCenterButton({ center }) {
    const map = useMap();
    const [isResetting, setIsResetting] = useState(false);
    const timeoutRef = useRef(null);

    const handleReset = () => {
        if (isResetting) return;
        setIsResetting(true);
        map.flyTo(center, Math.round(map.getZoom()));

        timeoutRef.current = setTimeout(() => {
            setIsResetting(false);
        }, 1000);
    };

    return (
        <>
            <button
                className={`absolute z-[9997] top-[22%] right-5 flex items-center text-xl px-2 py-2 rounded-3xl bg-white hover:bg-blue-500 transition-all duration-500 ease-in-out text-gray-600 hover:text-white group ${
                    isResetting ? 'opacity-50' : 'opacity-100'
                }`}
                onClick={handleReset}
                disabled={isResetting}
            >
                <FaHome />
                <span className="overflow-hidden text-sm max-w-0 opacity-0 transform group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 group-hover:translate-x-0 transition-all duration-500 ease-in-out whitespace-nowrap">
                    Reset center
                </span>
            </button>
        </>
    );
}
