import { useState } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';

const places = [
    { value: { lat: 9.2, lng: 105.5 }, label: 'Place A' },
    { value: { lat: 9.5, lng: 105.8 }, label: 'Place B' },
    { value: { lat: 10.0, lng: 106.4 }, label: 'Place C' },
];

function PredictNDVI() {
    const [formData, setFormData] = useState({
        dateRange: ['2019-09-01', '2020-10-01'],
        longitudeRange: [105.5, 106.4],
        latitudeRange: [9.2, 10.0],
        selectedPlace: null,
    });

    const handlePlaceSelect = (selectedOption) => {
        setFormData({
            ...formData,
            selectedPlace: selectedOption,
            longitudeRange: [selectedOption.value.lng, selectedOption.value.lng],
            latitudeRange: [selectedOption.value.lat, selectedOption.value.lat],
        });
    };

    const handleInputChange = (field, index, value) => {
        setFormData((prev) => {
            const updatedField = [...prev[field]];
            updatedField[index] = value;
            return { ...prev, [field]: updatedField };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        alert(formData);
        // Perform further actions, like sending data to an API
    };
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-primary text-center uppercase">Predict NDVI</h1>
            <hr />
            <form onSubmit={handleSubmit} className="w-full max-w-full p-6 shadow-md bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-6 text-center uppercase">get NDVI file</h2>

                {/* Date Range */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Date Range:</label>
                    <div className="flex space-x-4">
                        <motion.input
                            type="date"
                            value={formData.dateRange[0]}
                            onChange={(e) => handleInputChange('dateRange', 0, e.target.value)}
                            className="p-3 rounded w-full outline-none border border-gray-300 focus:border-blue-500"
                            whileFocus={{ scale: 1.05, borderColor: '#23a9e1' }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.input
                            type="date"
                            value={formData.dateRange[1]}
                            onChange={(e) => handleInputChange('dateRange', 1, e.target.value)}
                            className="p-3 rounded w-full outline-none border border-gray-300 focus:border-blue-500"
                            whileFocus={{ scale: 1.05, borderColor: '#23a9e1' }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                </div>

                {/* Select Place */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Chọn địa phương:</label>
                    <Select
                        options={places}
                        onChange={handlePlaceSelect}
                        value={formData.selectedPlace}
                        placeholder="Chọn một địa phương"
                        className="w-full"
                    />
                </div>

                {/* Longitude and Latitude */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Longitude and Latitude:</label>
                    <div className="flex space-x-4">
                        <motion.input
                            type="number"
                            value={formData.longitudeRange[0]}
                            readOnly
                            className="p-3 rounded w-full bg-gray-100 cursor-not-allowed"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.input
                            type="number"
                            value={formData.latitudeRange[0]}
                            readOnly
                            className="p-3 rounded w-full bg-gray-100 cursor-not-allowed"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                </div>

                <motion.button
                    type="submit"
                    className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    Submit
                </motion.button>
            </form>
        </div>
    );
}

export default PredictNDVI;
