import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MdLock } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [toggle, setToggle] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleDropdown = (name) => {
        setToggle(name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for empty fields
        if (!username || !password) {
            toast.error('Please fill in both username and password!');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8088/api/login/', {
                username: username,
                password: password,
            });

            const token = response.data.token;

            localStorage.setItem('authToken', token.access);

            navigate('/layermanagement');
        } catch (err) {
            setError('Invalid username or password.');
            toast.error(error);
        }
        toast.success('Login successful');
        // Redirect or further actions after successful login
    };

    // const mockLogin = (username, password) => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             if (username === 'user' && password === 'password') {
    //                 resolve(true); // Simulating successful login
    //             } else {
    //                 resolve(false); // Invalid login
    //             }
    //         }, 1000);
    //     });
    // };

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-cover"
            style={{ backgroundImage: 'url(/images/background/background.jpg)' }}
        >
            <div className="bg-white p-6 rounded-md shadow-md w-[500px] h-[500px] flex flex-col items-center">
                <img alt="Logo ctu" src="/images/LogoCTU.png" />
                <form onSubmit={handleSubmit} className="mt-[30px] w-[100%]">
                    <div className="mb-4 relative">
                        <IoPerson className="absolute top-[34%] left-[10px] text-[#205ca9]" />
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="w-full h-[50px] pl-[40px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow font-bold"
                            placeholder="Username"
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <MdLock className="absolute top-[34%] left-[10px] text-[#205ca9]" />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            className="w-full h-[50px] pl-[40px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow font-bold"
                            required
                        />
                    </div>
                </form>
                <button
                    type="submit"
                    className="bg-[#205ca9] text-white py-2 font-bold w-[165px] h-[60px]"
                    onClick={handleSubmit}
                >
                    Log in
                </button>

                <hr className="w-[100%] mt-[20px] font-bold" />

                {/* <div className="relative mt-[20px]">
                    <button onClick={toggleDropdown} className="text-[#eba602] p-2 rounded-lg">
                        Vietnamese (Vi)
                    </button>

                    <motion.ul
                        className="absolute bg-white shadow-lg rounded-lg mt-2 w-48"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <li className="p-2 hover:bg-gray-200 cursor-pointer">Vietnamese (Vi)</li>
                        <li className="p-2 hover:bg-gray-200 cursor-pointer">English (en)</li>
                    </motion.ul>
                </div> */}
            </div>
        </div>
    );
};

export default LoginPage;
