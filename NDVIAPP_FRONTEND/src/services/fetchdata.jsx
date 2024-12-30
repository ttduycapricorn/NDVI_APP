import axios from 'axios';
import toast from 'react-hot-toast';

const fetchData = async () => {
    try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Make a GET request with the token in the Authorization header
        const response = await axios.get('http://127.0.0.1:8088/api/', {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token
            },
        });

        console.log(response.data); // Handle the data
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
        // Optionally handle token expiration or other errors
        if (error.response?.status === 401) {
            toast.error('Session expired. Please log in again.');
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    }
};

export default fetchData;
