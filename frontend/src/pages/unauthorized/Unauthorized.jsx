import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-20 h-20 mx-auto text-red-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636M12 2v10m0 0l-3 3m3-3l3 3"
                        />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-3">403</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Unauthorized Access</h2>
                <p className="text-gray-600 mb-6">
                    You do not have the necessary permissions to view this page.
                    Please contact your administrator if you believe this is an error.
                </p>
                <div className="flex flex-col space-y-3">
                    <Link
                        to="/"
                        className="inline-block bg-purple-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-purple-700 transition-colors duration-300"
                    >
                        Go to Home
                    </Link>
                    <Link
                        to="/user/login"
                        className="inline-block text-purple-600 border border-purple-600 font-semibold py-3 px-6 rounded-md hover:bg-purple-50 transition-colors duration-300"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;