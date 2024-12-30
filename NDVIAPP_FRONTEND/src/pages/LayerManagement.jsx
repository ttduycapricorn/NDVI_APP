import { useEffect, useState } from 'react';
import axios from 'axios';

function LayerManagement() {
    const [layers, setLayers] = useState([]);
    const [stores, setStores] = useState([]); // Trạng thái cho danh sách stores
    const [currentLayer, setCurrentLayer] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', title: '', workspace: '', store: '', shpFile: null });

    const API_AUTH = { auth: { username: 'admin', password: 'geoserver' } };

    const fetchLayers = () => {
        axios
            .get('/geoserver/rest/layers', API_AUTH)
            .then((response) => setLayers(response.data.layers.layer))
            .catch((error) => console.error('Error fetching layers:', error));
    };

    const fetchStores = () => {
        axios
            .get('/geoserver/rest/workspaces/minhkha/datastores', API_AUTH)
            .then((response) => setStores(response.data.dataStores.dataStore))
            .catch((error) => console.error('Error fetching stores:', error));
    };

    useEffect(() => {
        fetchLayers();
        fetchStores();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: files ? files[0] : value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const endpoint = `/geoserver/rest/workspaces/minhkha/datastores/graduation_thesis/file.shp`;

        if (formData.shpFile) {
            const data = new FormData();
            data.append('file', formData.shpFile);

            axios
                .put(endpoint, data, {
                    ...API_AUTH,
                    headers: { 'Content-Type': 'application/zip' },
                })
                .then(() => {
                    fetchLayers();
                    // resetForm();
                })
                .catch((error) => console.error('Error uploading SHP:', error));
        } else {
            console.log('No SHP file provided.');
        }
    };

    const handleEditLayer = (layer) => {
        setCurrentLayer(layer);
        setFormData({ name: layer.name, title: layer.title, workspace: layer.workspace, store: layer.store });
        setIsFormVisible(true);
    };

    const handleDeleteLayer = (layerName) => {
        axios
            .delete(`/geoserver/rest/layers/${layerName}`, API_AUTH)
            .then(() => fetchLayers())
            .catch((error) => console.error('Error deleting layer:', error));
    };

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
        setFormData({ name: '', title: '', workspace: '', store: '', shpFile: null });
        setCurrentLayer(null);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">GeoServer Layer Management</h1>
                <button onClick={toggleForm} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                    {isFormVisible ? 'Close Form' : 'Add Layer'}
                </button>
            </div>

            {isFormVisible && (
                <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-4">{currentLayer ? 'Edit Layer' : 'Add Layer'}</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Layer Name"
                            className="input"
                        />
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="Title"
                            className="input"
                        />
                        <input
                            type="text"
                            name="workspace"
                            value={formData.workspace}
                            onChange={handleInputChange}
                            required
                            placeholder="Workspace"
                            className="input"
                        />

                        <select
                            name="store"
                            value={formData.store}
                            onChange={handleInputChange}
                            required
                            className="input"
                        >
                            <option value="">Select Store</option>
                            {stores.map((store) => (
                                <option key={store.name} value={store.name}>
                                    {store.name}
                                </option>
                            ))}
                        </select>

                        {/* Hiển thị trường upload file SHP nếu store là PostgreSQL */}
                        {formData.store === 'graduation_thesis' && (
                            <input type="file" name="shpFile" onChange={handleInputChange} className="input" />
                        )}

                        <button type="submit" className="w-full px-4 py-2 mt-4 bg-green-600 text-white rounded-md">
                            {currentLayer ? 'Update Layer' : 'Add Layer'}
                        </button>
                    </div>
                </form>
            )}

            {/* Danh sách các layer hiện có với các nút Edit và Delete */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-200 text-left">Layer Name</th>
                            <th className="py-2 px-4 bg-gray-200 text-left">Title</th>
                            <th className="py-2 px-4 bg-gray-200 text-left">Workspace</th>
                            <th className="py-2 px-4 bg-gray-200 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {layers.map((layer) => (
                            <tr key={layer.name}>
                                <td className="border px-4 py-2">{layer.name}</td>
                                <td className="border px-4 py-2">{layer.title || 'No title'}</td>
                                <td className="border px-4 py-2">{layer.workspace || 'No workspace'}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        disabled
                                        onClick={() => handleEditLayer(layer)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteLayer(layer.name)}
                                        className="bg-red-600 text-white px-3 py-1 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LayerManagement;
