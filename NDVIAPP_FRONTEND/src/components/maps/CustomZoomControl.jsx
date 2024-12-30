import { useMap } from 'react-leaflet';
import { FaPlus, FaMinus, FaReact } from 'react-icons/fa';

function CustomZoomControl() {
    const map = useMap();

    const zoomIn = () => {
        map.setZoom(map.getZoom() + 1);
    };

    const zoomOut = () => {
        map.setZoom(map.getZoom() - 1);
    };

    return (
        <div className="absolute top-[10%] left-5 flex flex-col z-[1000] bg-white rounded-2xl shadow-lg">
            <button
                onClick={zoomIn}
                className="group flex justify-center items-center p-2 rounded-t-2xl hover:bg-blue-500 transition-all duration-300 text-gray-600 hover:text-white"
            >
                <FaPlus className="text-sm" />
            </button>
            <div className="w-full h-[40px] bg-gray-300 flex justify-center items-center text-xl group hover:bg-blue-500 transition-all duration-300 text-gray-600 hover:text-white">
                <FaReact />
            </div>
            <button
                onClick={zoomOut}
                className="group flex justify-center items-center p-2 rounded-b-2xl hover:bg-blue-500 transition-all duration-300 text-gray-600 hover:text-white"
            >
                <FaMinus className="text-sm" />
            </button>
        </div>
    );
}

export default CustomZoomControl;
