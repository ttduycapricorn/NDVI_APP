import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaChartLine, FaList, FaBars, FaTimes } from 'react-icons/fa';
import { IoGitCompareSharp } from 'react-icons/io5';
import { MdStorage } from 'react-icons/md';
import { motion } from 'framer-motion';

function AppSidebar({ setActivePage, activePage }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const sidebarVariants = {
        open: {
            x: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 20 },
        },
        closed: {
            x: -250,
            opacity: 0,
            transition: { type: 'spring', stiffness: 100, damping: 20 },
        },
    };
    return (
        <div className="relative h-screen">
            {/* toggle button */}
            <motion.button
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="absolute top-4 right-4 z-20 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-secondary transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    initial={{ rotate: 0, scale: 1, opacity: 1 }}
                    animate={
                        isSidebarOpen ? { rotate: 180, scale: 1.2, opacity: 1 } : { rotate: 0, scale: 1, opacity: 1 }
                    }
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </motion.div>
            </motion.button>

            {/* sidebar */}
            <motion.div
                className=" bg-primary text-colors-text h-full w-[250px] shadow-lg"
                initial="closed"
                animate={isSidebarOpen ? 'open' : 'closed'}
                variants={sidebarVariants}
            >
                <Sidebar>
                    <Menu className="font-semibold">
                        <MenuItem
                            icon={<FaChartLine />}
                            onClick={() => setActivePage('predict')}
                            className={activePage === 'predict' ? 'bg-textWhite' : 'hover:bg-secondary'}
                        >
                            Predict NDVI
                        </MenuItem>
                        <MenuItem
                            icon={<IoGitCompareSharp />}
                            onClick={() => setActivePage('compare')}
                            className={activePage === 'compare' ? 'bg-textWhite' : 'hover:bg-secondary'}
                        >
                            Compare NDVI
                        </MenuItem>
                        <MenuItem
                            icon={<MdStorage />}
                            onClick={() => setActivePage('Storages')}
                            className={activePage === 'Storages' ? 'bg-textWhite' : 'hover:bg-secondary'}
                        >
                            Storages
                        </MenuItem>
                    </Menu>
                </Sidebar>
            </motion.div>
        </div>
    );
}

export default AppSidebar;
