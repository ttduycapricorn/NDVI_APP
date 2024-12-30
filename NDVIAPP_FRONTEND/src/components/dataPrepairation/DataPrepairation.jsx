import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from 'react-icons/tb';
import { AnimatePresence, motion } from 'framer-motion';
import {
    handleNextStep,
    handlePrevStep,
    toggleShowPredictionSteps,
    selectPredictionCurrentStep,
    selectPredictionSteps,
    setPredicted,
} from '../../features/predictionSteps/predictionStepsSlice';

function DataPrepairation() {
    const dispatch = useDispatch();
    const currentStep = useSelector(selectPredictionCurrentStep);
    const steps = useSelector(selectPredictionSteps);

    const [isLoading, setIsLoading] = useState(false);

    const images = [
        { label: 'VV data', imgSrc: '/images/predictionSteps/VH.png' },
        { label: 'VH data', imgSrc: '/images/predictionSteps/VV.png' },
        { label: 'NDVI data', imgSrc: '/images/predictionSteps/freeCloundNDVI.png' },
        { label: 'Free Cloud NDVI', imgSrc: '/images/predictionSteps/NDVI.png' },
        { label: 'Predicted land use status map', imgSrc: '/images/predictionSteps/Result.png' },
    ];

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            dispatch(setPredicted());
        }, 5000);
    }, []);

    const handleStepChange = (action) => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(action());
            setIsLoading(false);
        }, 1000);
    };

    const renderDots = () => {
        return steps.map((_, index) => (
            <span
                key={index}
                className={`w-3 h-3 mx-2 rounded-full transition-all duration-300 ease-in-out ${
                    index + 1 === currentStep ? 'bg-blue-600' : 'bg-gray-400 hover:bg-blue-500'
                }`}
            ></span>
        ));
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="absolute inset-0 flex justify-center items-center h-full bg-white bg-opacity-50">
                    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            );
        }

        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="mt-6">
                            <h4 className="text-xl font-semibold mb-2">Sentinel 1 data</h4>
                            <div className="flex justify-between space-x-4">
                                <div className="flex-1">
                                    <span className="block text-center">{images[0].label}</span>
                                    <img
                                        src={images[0].imgSrc}
                                        alt={images[0].label}
                                        className="mt-2 w-full h-auto rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="block text-center">{images[1].label}</span>
                                    <img
                                        src={images[1].imgSrc}
                                        alt={images[1].label}
                                        className="mt-2 w-full h-auto rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h4 className="text-xl font-semibold mb-2">Sentinel 2 data</h4>
                            <div className="flex justify-between space-x-4">
                                <div className="flex-1">
                                    <span className="block text-center">{images[2].label}</span>
                                    <img
                                        src={images[2].imgSrc}
                                        alt={images[2].label}
                                        className="mt-2 w-full h-auto rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="block text-center">{images[3].label}</span>
                                    <img
                                        src={images[3].imgSrc}
                                        alt={images[3].label}
                                        className="mt-2 w-full h-auto rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col items-center justify-center h-[400px]">
                        <h4 className="text-xl font-semibold mb-4">Predicted land use status map</h4>
                        <img
                            src={images[4].imgSrc}
                            alt={images[4].label}
                            className="max-w-md w-full h-auto rounded-lg shadow-md"
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-col items-center justify-center h-[400px]">
                        <h4 className="text-2xl font-bold text-green-600 mb-4">🎉 Success!</h4>
                        <p className="text-lg">The prediction process has been completed successfully.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleCloseModal = (event) => {
        dispatch(toggleShowPredictionSteps());
    };

    return (
        <div onClick={handleCloseModal} className="fixed inset-0 z-[10000] bg-black bg-opacity-50">
            <div
                onClick={(event) => event.stopPropagation()}
                className="inputPrediction max-w-lg w-full min-h-[400px] mx-auto relative top-1/2 transform -translate-y-1/2 z-[10001] bg-white p-6 rounded-lg space-y-6"
            >
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => handleStepChange(handlePrevStep)}
                        className={`flex items-center justify-center w-12 h-12 text-white rounded-full shadow-md transition duration-300 ease-in-out hover:scale-110 ${
                            currentStep === 1
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:bg-blue-600'
                        }`}
                        disabled={currentStep === 1}
                        title="You cannot go back from the first step."
                    >
                        <TbPlayerTrackPrevFilled className="text-2xl" />
                    </button>

                    <div className="flex-1 text-center">
                        <h2 className="text-lg font-semibold">{steps[currentStep - 1]?.label || 'Step'}</h2>
                    </div>

                    <button
                        onClick={() => handleStepChange(handleNextStep)}
                        className={`flex items-center justify-center w-12 h-12 text-white rounded-full shadow-md transition duration-300 ease-in-out hover:scale-110 ${
                            currentStep === 3
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:bg-blue-600'
                        }`}
                        disabled={currentStep === 3}
                        title="You cannot go forward from the last step."
                    >
                        <TbPlayerTrackNextFilled className="text-2xl" />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default DataPrepairation;
