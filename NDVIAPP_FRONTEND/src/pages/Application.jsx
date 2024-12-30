import { useState } from 'react';

import AppSidebar from '../components/sidebar/AppSidebar';
import PredictNDVI from '../components/content/PredictNDVI';
import CompareNDVI from '../components/content/CompareNDVI';
import StoragePage from '../components/content/storega';

function ApplicationPage() {
    const [activePage, setActivePage] = useState('predict');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <AppSidebar setActivePage={setActivePage} activePage={activePage} />

            {/* Main Content */}
            <div
                className={`flex-grow p-6 bg-white text-text transition-all duration-300 ${
                    isSidebarOpen ? 'ml-[250px]' : 'ml-0'
                }`}
            >
                {/* Active Page */}
                {activePage === 'predict' && (
                    <h1 className="text-3xl text-primary">
                        <PredictNDVI />
                    </h1>
                )}
                {activePage === 'compare' && (
                    <h1 className="text-3xl text-primary">
                        <CompareNDVI />
                    </h1>
                )}
                {activePage === 'Storage' && (
                    <h1 className="text-3xl text-primary">
                        <StoragePage />
                    </h1>
                )}
            </div>
        </div>
    );
}

export default ApplicationPage;
