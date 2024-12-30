import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const LayerForm = () => {
    const [layerName, setLayerName] = useState('');
    const [layerTitle, setLayerTitle] = useState('');
    const [shapefile, setShapefile] = useState(null);
    const [description, setDescription] = useState(null);
    const [error, setError] = useState('');

    // Handle the layer name input change
    const handleLayerNameChange = (e) => {
        setLayerName(e.target.value);
    };

    // Handle the layer title input change
    const handleLayerTitleChange = (e) => {
        setLayerTitle(e.target.value);
    };
    // Handle the layer title input change
    const handleLayerDescription = (e) => {
        setDescription(e.target.value);
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.zip')) {
            setShapefile(file);
        } else {
            setError('Please upload a valid .zip file.');
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!layerName || !layerTitle || !shapefile) {
            setError('All fields are required!');
            return;
        }

        const token = localStorage.authToken;

        const formData = new FormData();
        formData.append('layerName', layerName);
        formData.append('layerTitle', layerTitle);
        formData.append('description', description);
        formData.append('shapefile', shapefile);

        if (layerName === '') {
            toast.error(`Please enter layer's name`);
        }

        try {
            await axios.post('http://127.0.0.1:8088/api/layers/create/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Handle successful response
            // await toast.success('Layer added successfully', {
            //     autoClose: 3000, // Display for 3 seconds
            // });
            window.location.reload();
            setLayerName('');
            setLayerTitle('');
            setDescription('');
            setShapefile(null);
            setError('');
        } catch (err) {
            // Handle error response
            toast.error('Error uploading layer:', err);
            console.error('Error uploading layer:', err);
            setError('Error adding layer.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center">Add Layer</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Layer Name</label>
                    <input
                        type="text"
                        value={layerName}
                        onChange={handleLayerNameChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Layer Title</label>
                    <input
                        type="text"
                        value={layerTitle}
                        onChange={handleLayerTitleChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={handleLayerDescription}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Shapefile (.zip)</label>
                    <input
                        type="file"
                        accept=".zip"
                        onChange={handleFileChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-4">
                    Add Layer
                </button>
            </form>
        </div>
    );
};

export default LayerForm;
