import React, { useState } from 'react';

function CompareNDVI() {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('File 1:', file1);
        console.log('File 2:', file2);
        // Call the API to compare NDVI
    };
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 uppercase">Compare NDVI</h1>
            <hr />
            <form className="mt-[10px]" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Upload First File</label>
                    <input type="file" onChange={(e) => setFile1(e.target.files[0])} className="border p-2 w-full" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Upload Second File</label>
                    <input type="file" onChange={(e) => setFile2(e.target.files[0])} className="border p-2 w-full" />
                </div>
                <button type="submit" className="bg-blue-500 rounded text-white px-4 py-2">
                    Compare
                </button>
            </form>
        </div>
    );
}

export default CompareNDVI;
