import { useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { selectMapType, selectMapTypeList, setMapType } from '../../features/setting/settingSlice.jsx';
import { useSelector, useDispatch } from 'react-redux';

function MapSetting({ isOpen }) {
    const mapType = useSelector(selectMapType);
    const MapTypeList = useSelector(selectMapTypeList);

    const dispatch = useDispatch();

    const [heading, setHeading] = useState(MapTypeList[mapType].title);
    const [selectedType, setSelectedType] = useState(mapType);

    const handleSelectMapType = (type) => {
        setSelectedType(type);
        dispatch(setMapType(type));
    };

    return (
        <div
            className={`absolute top-11 right-[60%] z-[10000] bg-[#3f4854] bg-opacity-[0.9] shadow p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out origin-top-right ${
                isOpen ? 'scale-100' : 'scale-0'
            }`}
        >
            <div>
                <h2 className="text-lg text-white font-semibold mb-3">{heading}</h2>
                <ul className="map-type-list flex flex-wrap min-w-[300px]">
                    {Object.keys(MapTypeList).map((type, index) => (
                        <li
                            key={index}
                            className="w-1/3 p-2 relative"
                            onMouseOver={() => setHeading(MapTypeList[type].title)}
                            onMouseLeave={() => setHeading(MapTypeList[mapType].title)}
                        >
                            <button
                                onClick={() => handleSelectMapType(type)}
                                className={`relative flex items-center justify-center p-2 rounded-lg transition-all duration-300 ease-in-out ${
                                    mapType === type
                                        ? 'border-2 border-blue-500 scale-105 shadow-lg'
                                        : 'border-2 border-transparent'
                                } hover:scale-105 hover:border-gray-300`}
                            >
                                {mapType === type && (
                                    <FaRegCheckCircle className="absolute top-1 right-1 text-blue-500" />
                                )}
                                <img src={MapTypeList[type].image} alt="" className="w-full h-auto rounded-md" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MapSetting;
