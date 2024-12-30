import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Map from './pages/Map.jsx';
import Chart from './pages/Chart.jsx';
import NotFound from './pages/NotFound.jsx';
import Admin from './pages/Admin.jsx';
import LoginPage from './pages/Login.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/chart" element={<Chart />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/layermanagement" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
