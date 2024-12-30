import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
const itemsPerPage = 5;

export default function PaginatedList() {
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const currentItems = items.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);

    const paginate = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div style={{ width: '300px', margin: '0 auto', textAlign: 'center' }}>
            <AnimatePresence exitBeforeEnter>
                <motion.ul
                    key={currentPage} // Key ensures AnimatePresence recognizes page changes
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    style={{ listStyle: 'none', padding: 0 }}
                >
                    {currentItems.map((item, index) => (
                        <motion.li
                            key={index}
                            style={{
                                background: '#3498db',
                                color: '#fff',
                                padding: '10px',
                                margin: '5px 0',
                                borderRadius: '5px',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {item}
                        </motion.li>
                    ))}
                </motion.ul>
            </AnimatePresence>

            <div
                className="flex justify-center items-center bg-gray-700 text-white py-2 px-4 rounded-lg"
                style={{ marginTop: '20px' }}
            >
                <button
                    className="px-3 py-1 bg-gray-500 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span style={{ margin: '0 10px' }}>{`Page ${currentPage + 1} of ${totalPages}`}</span>
                <button
                    className="px-3 py-1 bg-gray-500 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
