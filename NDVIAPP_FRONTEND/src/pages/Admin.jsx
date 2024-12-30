/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { motion } from 'framer-motion';
import { LuFileEdit, LuTrash2 } from 'react-icons/lu';

import '../index.css';

const auth_key = localStorage.getItem('authToken');
const config = {
    headers: {
        Authorization: `Bearer ${auth_key}`, // Use "Bearer" or appropriate schema
    },
};

const dropdownVariants = {
    open: {
        opacity: 1,
        scaleY: 1,
        originY: 0,

        clipPath: 'inset(0% 0% 0% 0% round 10px)',
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.7,
            delayChildren: 0.3,
            staggerChildren: 0.05,
        },
    },
    closed: {
        opacity: 0,
        scaleY: 0,
        originY: 0,

        clipPath: 'inset(10% 50% 90% 50% round 10px)',
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.3,
        },
    },
};

const title_table = [
    {
        action: 'Id',
    },
    {
        action: 'Title',
    },
    {
        action: 'workspace',
    },
    {
        action: 'Actions',
    },
    // {
    //     action: 'Export',
    // },
];

// const list_exports = [
//     {
//         name: 'GeoJSON',
//     },
//     {
//         name: 'PNG',
//     },
//     {
//         name: 'tif',
//     },
//     {
//         name: 'shape file',
//     },
//     {
//         name: 'text',
//     },
// ];

function Map() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState();
    const [listLayers, setListLayers] = useState([]);
    const [listWorkspace, setListWorkspace] = useState([]);
    const [isOpen, setIsOpen] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Select an option');
    const [deleteModal, setDeleteModal] = useState({});
    const [layerName, setLayerName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

    const navigate = useNavigate();

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const OpenDeleteModal = (id) => {
        setDeleteModal((prev) => ({ ...prev, [id]: true }));
    };

    const CloseDeleteModal = (id) => {
        setDeleteModal((prev) => ({ ...prev, [id]: false }));
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleReturnMapPage = () => {
        navigate('/');
    };

    const handleDeleteLayer = async (id) => {
        console.log(`http://127.0.0.1:8088/api/layers/delete/${id}/`);
        try {
            await axios.delete(`http://127.0.0.1:8088/api/layers/delete_layer/${id}/`, config);
            setListLayers((prev) => prev.filter((layer) => layer.id !== id)); // Update UI
            toast.success(`Layer ${id} deleted successfully.`);
        } catch (error) {
            toast.error(`Failed to delete layer ${id}.`);
        }
        CloseDeleteModal(id); // Close modal
    };

    const handleCreateLayer = async (e) => {
        e.preventDefault();

        // FormData to send multipart data
        const formData = new FormData();
        formData.append('layerName', layerName);
        formData.append('description', description);
        formData.append('shapefile', file);

        try {
            const response = await axios.post(
                'http://127.0.0.1:8088/api/layers/create/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
                config,
            );

            if (response.status === 201) {
                setStatusMessage('Layer created successfully!');
                setIsOpen(false);
            } else {
                setStatusMessage('Failed to create layer.');
            }
        } catch (error) {
            console.error('Error creating layer:', error);
            setStatusMessage('An error occurred while creating the layer.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const layersResponse = await axios.get('http://127.0.0.1:8088/api/layers/get_all_layers/', config);
                setListLayers(layersResponse.data.data.layers);

                const workspaceResponse = await axios.get('http://127.0.0.1:8088/api/layers/get_workspaces/', config);
                setListWorkspace(workspaceResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="admin">
            <div className="wrapper flex w-screen bg-[#ededed] ">
                <div className="bg-[#fff] flex-grow relative max-custom:ml-0">
                    <div className="flex flex-col items-center justify-center min-h-screen bg-[#536489]">
                        <div className="flex gap-[40px]">
                            <motion.div
                                className="box "
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                <button
                                    className="uppercase font-bold bg-[#1F2739] mb-[40px] text-[#fff] rounded-xl h-[60px] w-auto px-[15px]"
                                    onClick={onOpenModal}
                                >
                                    add layer to server
                                </button>
                            </motion.div>
                            <motion.div
                                className="box "
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                <button
                                    className="uppercase font-bold bg-[#1F2739] mb-[40px] text-[#fff] rounded-xl h-[60px] w-auto px-[15px]"
                                    onClick={handleReturnMapPage}
                                >
                                    Return The Map
                                </button>
                            </motion.div>
                        </div>
                        <Modal open={open} center onClose={onCloseModal}>
                            <div className="uppercase text-center font-bold mb-[25px]">Update layer</div>
                            <form
                                className="h-auto align-middle flex flex-col items-center"
                                onSubmit={handleCreateLayer}
                            >
                                <label htmlFor="name">Name</label>
                                <input
                                    className="w-[400px] border-[2px] h-[40px] pl-[5px] mb-[15px]"
                                    type="text"
                                    id="layerName"
                                    value={layerName}
                                    onChange={(e) => setLayerName(e.target.value)}
                                    required
                                />

                                <label htmlFor="title">Description</label>
                                <input
                                    className="w-[400px] border-[2px] h-[40px] pl-[5px] mb-[15px]"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />

                                <label htmlFor="file"></label>
                                <input
                                    className="w-[400px] border-[2px] h-[40px] pl-[5px] mb-[15px]"
                                    type="file"
                                    id="file"
                                    accept=".zip"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    required
                                />

                                <button
                                    className="uppercase w-[100px] h-[50px] rounded-[7px] bg-[#1F2739] text-[#fff] hover:bg-[#fff] hover:text-[black] hover:shadow-md custom-td-hover"
                                    type="submit"
                                >
                                    Update
                                </button>
                            </form>
                        </Modal>

                        <table className="container rounded-[20px]">
                            <thead className="rounded-xl">
                                <tr className="odd:bg-[#323C50]">
                                    {title_table.map((item) => {
                                        return (
                                            <th
                                                className="pt-[2%] pb-[2%] pl-[2%] bg-[#1F2739] p-2 text-left"
                                                key={item.action}
                                            >
                                                <h1 className="text-[#185875] uppercase">{item.action}</h1>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {listLayers.map((item) => {
                                    return (
                                        <tr
                                            className="w-auto odd:bg-[#323C50] even:bg-[#2C3446] hover:bg-[#464A52] hover:shadow-md"
                                            key={item.id}
                                        >
                                            <td className="custom-td-hover p-4 text-[#FB667A]">{item.id}</td>
                                            <td className="custom-td-hover p-4 text-[#FB667A]">{item.id}</td>
                                            <td className="custom-td-hover p-4 text-[#FB667A]">{item.workspace}</td>
                                            <td className="text-[#fff] relative uppercase">
                                                <div className="custom-td-hover-edit absolute cursor-pointer w-[40%] h-[100%] top-0 left-0 flex items-center justify-center">
                                                    <LuFileEdit className="h-[20px] w-[20px]" />
                                                </div>
                                                <div
                                                    className="custom-td-hover-delete absolute cursor-pointer w-[40%] h-[100%] top-0 right-0 flex items-center justify-center"
                                                    onClick={() => OpenDeleteModal(item.id)}
                                                >
                                                    <LuTrash2 className="h-[20px] w-[20px]" />
                                                </div>
                                                <Modal
                                                    open={deleteModal[item.id] || false}
                                                    center
                                                    onClose={() => CloseDeleteModal(item.id)}
                                                >
                                                    <div className="flex-col place-items-center">
                                                        <div className="uppercase text-center font-bold mb-[25px]">
                                                            Are you sure you want to delete layer{' '}
                                                            <div className="uppercase text-center font-bold mb-[25px]">
                                                                "{item.id}"?
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteLayer(item.id)}
                                                            className="uppercase w-[100px] h-[50px] rounded-[7px] bg-[#1F2739] text-[#fff] hover:bg-[#ac4242] hover:text-[white] hover:shadow-md custom-td-hover"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </Modal>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;
