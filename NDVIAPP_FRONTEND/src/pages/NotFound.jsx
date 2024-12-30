import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import Button from '../components/button/Button';

function NotFound() {
    useEffect(() => {
        document.title = '404 - Page Not Found';
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-blue-700 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/">
                    <Button content="Go back home" customStyle="rounded px-6"></Button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
