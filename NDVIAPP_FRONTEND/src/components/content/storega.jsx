import { useState, useEffect } from 'react';
import axios from 'axios';

const StoragePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from API (replace with your endpoint)
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('/api/ndvi-files'); // Replace with your endpoint
    //             setData(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching NDVI files:', error);
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-primary mb-6">NDVI Raster Storage</h1>

            <div className="bg-black shadow-md rounded-lg p-4">
                {/* Table Title */}
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Table of NDVI Files Without Noise Reduction Cloud
                </h2>

                {loading ? (
                    <div className="text-center text-gray-600">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th className="py-2 px-4 text-left">ID</th>
                                    <th className="py-2 px-4 text-left">Title</th>
                                    <th className="py-2 px-4 text-left">Start Year</th>
                                    <th className="py-2 px-4 text-left">End Year</th>
                                    <th className="py-2 px-4 text-left">Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id || index} className="hover:bg-gray-100 border-b">
                                        <td className="py-2 px-4">{item.id}</td>
                                        <td className="py-2 px-4">{item.title}</td>
                                        <td className="py-2 px-4">{item.year_start}</td>
                                        <td className="py-2 px-4">{item.year_end}</td>
                                        <td className="py-2 px-4">{item.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoragePage;
