import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleNN, togglePNN, toggleTQ, resetCompareLayer } from '../../features/layer/layerSlice.jsx';
import { IoIosSettings } from 'react-icons/io';
import { FaRegCheckCircle } from 'react-icons/fa';
import GetStatusLandUseMap from '../../services/getStatusLandUseMap.js';
import GetPNNMap from '../../services/getPNNMap.js';
import GetNNMap from '../../services/getNNMap.js';
import { useTranslation } from 'react-i18next';
import { selectDistricted } from '../../features/predictionSteps/predictionStepsSlice.jsx';

function LayerSelector() {
    const { t } = useTranslation();
    const [isMapListVisible, setIsMapListVisible] = useState(false);
    const mapListRef = useRef(null);
    const [PNN, setPNN] = useState(null);
    const [NN, setNN] = useState(null);
    const [TQ, setTQ] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState('ThuanHoa');
    const [selectedYear, setSelectedYear] = useState(2022);

    const dispatch = useDispatch();
    const { compareLayer } = useSelector((state) => state.layer);
    const isPredicted = useSelector(selectDistricted);

    const toggleMapList = () => {
        setIsMapListVisible((prev) => !prev);
    };

    // const [layers, setLayers] = useState([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mapListRef.current && !mapListRef.current.contains(event.target)) {
                setIsMapListVisible(false);
            }
        };

        if (isMapListVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMapListVisible]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataPNN = await GetPNNMap();
                const dataNN = await GetNNMap();
                const dataTQ = await GetStatusLandUseMap();
                setNN(dataNN);
                setTQ(dataTQ);
                setPNN(dataPNN);
            } catch (error) {
                console.log('error');

                setPNN((prev) => null);
                setNN((prev) => null);
                setTQ((prev) => null);
            }
        };
        fetchData();
    }, [selectedRegion, selectedYear, isPredicted]);

    const handleToggleNN = () => {
        dispatch(toggleNN({ ...NN }));
    };

    const handleTogglePNN = () => {
        dispatch(togglePNN({ ...PNN }));
    };

    const handleToggleTQ = () => {
        dispatch(toggleTQ({ ...TQ }));
    };

    const handleRegionChange = (event) => {
        dispatch(resetCompareLayer());
        setSelectedRegion(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div className="absolute z-[9998] right-5 top-[10%] ">
            <div className="relative flex justify-end items-center space-x-4" ref={mapListRef}>
                <div
                    className={`map-list absolute top-10 right-10 bg-white bg-opacity-[0.8] p-5 rounded-lg shadow-lg flex flex-col min-w-[300px] transition-all duration-300 ease-in-out origin-top-right transform ${
                        isMapListVisible ? 'scale-100' : 'scale-0'
                    } border border-gray-200`}
                >
                    <div className="flex flex-col items-center gap-y-3 w-full mb-4">
                        <label className="w-full" htmlFor="region">
                            {t('Region')}
                            <select
                                name="region"
                                id="region"
                                value={selectedRegion}
                                onChange={handleRegionChange}
                                className="w-full border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            >
                                {isPredicted ? (
                                    <option value="thuanhoa">Thuận Hòa</option>
                                ) : (
                                    <option value="">Not predicted yet</option>
                                )}
                            </select>
                        </label>
                        <label className="w-full" htmlFor="region">
                            {t('Year')}
                            <select
                                name="year"
                                id="year"
                                value={selectedYear}
                                onChange={handleYearChange}
                                className="w-full border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            >
                                {isPredicted ? (
                                    <option value="2023">2023</option>
                                ) : (
                                    <option value="">Not predicted yet</option>
                                )}
                            </select>
                        </label>
                    </div>
                    {isPredicted ? (
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleTogglePNN}
                                className={`relative flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap ${
                                    compareLayer['PNN']
                                        ? 'border-2 border-blue-500 bg-blue-50'
                                        : 'border-2 border-transparent'
                                } hover:scale-105`}
                            >
                                {compareLayer['PNN'] && (
                                    <FaRegCheckCircle className="absolute top-1 right-1 text-blue-500" />
                                )}
                                {t('Overlay Non-Agricultural Land Changes')}
                            </button>

                            <button
                                onClick={handleToggleNN}
                                className={`relative flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap ${
                                    compareLayer['NN']
                                        ? 'border-2 border-blue-500 bg-blue-50'
                                        : 'border-2 border-transparent'
                                } hover:scale-105`}
                            >
                                {compareLayer['NN'] && (
                                    <FaRegCheckCircle className="absolute top-1 right-1 text-blue-500" />
                                )}
                                {t('Overlay Agricultural Land Changes')}
                            </button>

                            <button
                                onClick={handleToggleTQ}
                                className={`relative flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap ${
                                    compareLayer['TQ']
                                        ? 'border-2 border-blue-500 bg-blue-50'
                                        : 'border-2 border-transparent'
                                } hover:scale-105`}
                            >
                                {compareLayer['TQ'] && (
                                    <FaRegCheckCircle className="absolute top-1 right-1 text-blue-500" />
                                )}
                                {t('Overlay Predicted Land Use Status')}
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <button
                    onClick={toggleMapList}
                    className="p-2 rounded-full bg-white shadow hover:bg-blue-500 transition duration-300 text-gray-600 hover:text-white"
                    title={t('Settings')}
                >
                    <IoIosSettings
                        className={`text-2xl transform transition-transform duration-300 ${
                            isMapListVisible ? 'rotate-90' : 'rotate-0'
                        }`}
                    />
                </button>
            </div>
        </div>
    );
}

export default LayerSelector;
