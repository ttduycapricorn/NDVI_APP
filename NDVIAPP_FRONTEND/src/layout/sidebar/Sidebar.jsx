import { useState } from 'react';
import { IoMdCloudDownload, IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebarStatus, toggleSidebar } from '../../features/setting/settingSlice';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CiSearch } from 'react-icons/ci';
import { MdUpload } from 'react-icons/md';
import { selectDistricted } from '../../features/predictionSteps/predictionStepsSlice.jsx';
import downloadLayerAsShapefile from '../../services/downloadLayer.js';

function Sidebar() {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectSidebarStatus);
    const { i18n } = useTranslation();
    const [showLayerList, setShowLayerList] = useState(false);
    const [selectedLayer, setSelectedLayer] = useState(null);

    const isPredictted = useSelector(selectDistricted);

    const layers = ['NN_changes', 'PNN_changes', 'output_raster_to_shp_with_mapping'];

    const layerNames = {
        NN_changes: 'layer1',
        PNN_changes: 'layer2',
        output_raster_to_shp_with_mapping: 'layer3',
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const handleSaveClick = () => {
        setShowLayerList(!showLayerList); // Toggle hiển thị/ẩn danh sách layer
    };

    const handleLayerSelect = (layer) => {
        setSelectedLayer(layer);
        setShowLayerList(false); // Đóng danh sách layer khi đã chọn
        downloadLayerAsShapefile(layer);
    };
    // const downloadLayerAsShapefile = (layer) => {
    //     const url = `/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=minhkha:${layer}&outputFormat=SHAPE-ZIP`;

    //     fetch(url)
    //         .then((response) => response.blob())
    //         .then((blob) => {
    //             const link = document.createElement('a');
    //             const url = window.URL.createObjectURL(blob);
    //             link.href = url;
    //             link.download = `${layer}.zip`;
    //             link.click();
    //         })
    //         .catch((error) => {
    //             console.error('Error downloading the layer:', error);
    //         });
    // };

    return (
        <div
            className={`relative h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col transition-all duration-300 top-0 ${
                isOpen ? 'p-4 w-[400px] left-[0] shadow-xl' : 'w-[0] p-0 left-[-100%] pointer-events-none'
            }`}
        >
            <div
                className="close absolute top-2 right-2 cursor-pointer text-white hover:text-teal-400 transition-colors duration-200"
                onClick={() => dispatch(toggleSidebar())}
            >
                <IoIosCloseCircleOutline className="text-3xl" />
            </div>

            <div className="flex items-center mb-8 mt-4">
                <img
                    className="w-16 h-16 mr-4 rounded-lg shadow-md"
                    src="https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png"
                    alt="CTU Logo"
                />
                <h1 className="text-2xl font-semibold text-gray-200">{i18n.t('logoText')}</h1>
            </div>

            <div className="flex items-center bg-gray-700 pl-3 py-2 rounded-2xl mb-6 hover:bg-gray-600">
                <CiSearch className="text-white text-xl" />
                <input
                    disabled
                    type="text"
                    className="mx-3 bg-transparent text-white flex-grow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded-lg"
                    placeholder={i18n.t('searchPlaceholder')}
                />
            </div>

            <div className="flex flex-col items-start space-y-3">
                <button
                    className="flex items-center justify-center bg-teal-500 text-white w-full py-2 rounded-xl hover:bg-teal-400 focus:outline-none transition-colors duration-300"
                    onClick={handleSaveClick}
                >
                    <IoMdCloudDownload className="mr-2 text-xl" />
                    {i18n.t('saveButton')}
                </button>

                {/* Hiển thị danh sách layer dưới nút Save */}
                {showLayerList && (
                    <div className="absolute top-[24%] bg-white text-black p-4 rounded-lg shadow-lg w-[310px] mt-2">
                        <h3 className="text-lg font-semibold mb-2 text-teal-600">{i18n.t('selectLayer')}</h3>
                        {isPredictted ? (
                            <ul className="space-y-2">
                                {layers.map((layer, index) => (
                                    <li
                                        key={index}
                                        className="cursor-pointer hover:text-teal-500 hover:bg-teal-100 px-2 py-1 rounded-lg transition-colors duration-200"
                                        onClick={() => handleLayerSelect(layer)}
                                    >
                                        {i18n.t(layerNames[layer])}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Not predicted yet</p>
                        )}
                    </div>
                )}

                <Link
                    to={'/layermanagement'}
                    className="flex items-center justify-center bg-teal-500 text-white w-full py-2 rounded-xl hover:bg-teal-400 focus:outline-none transition-colors duration-300"
                >
                    <MdUpload className="mr-2 text-xl" />
                    {i18n.t('uploadButton')}
                </Link>
            </div>

            <div className="flex justify-center gap-x-4 mt-auto mb-4">
                <button
                    onClick={() => changeLanguage('vi')}
                    className={`text-lg focus:outline-none ${
                        i18n.language === 'vi' ? 'text-teal-400 font-bold' : 'text-white hover:text-teal-400'
                    }`}
                >
                    VI
                </button>
                <span className="text-white">|</span>
                <button
                    onClick={() => changeLanguage('en')}
                    className={`text-lg focus:outline-none ${
                        i18n.language === 'en' ? 'text-teal-400 font-bold' : 'text-white hover:text-teal-400'
                    }`}
                >
                    ENG
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
