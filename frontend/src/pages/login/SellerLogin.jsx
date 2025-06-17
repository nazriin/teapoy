import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginSellerMutation } from '../../services/authApi';
import { toast } from 'react-toastify';

const SellerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loginSeller, { isLoading }] = useLoginSellerMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!formData.email || !formData.password) {
            toast.error('Email and password are required');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error('Invalid email address');
            return;
        }

        try {
            const response = await loginSeller(formData).unwrap();
            toast.success(response.message);

            // Store token
            localStorage.setItem('token', response.token);

            // Redirect to seller dashboard
            navigate('/seller/dashboard');
        } catch (error) {
            const message =
                error.data?.message ||
                error.data?.errors?.[0]?.message ||
                'Failed to login';
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-600">
                    Seller Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400 transition duration-200"
                    >
                        {isLoading ? 'Logging In...' : 'Log In'}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-medium">
                            Sign Up
                        </Link>
                    </p>
                    <p className="mt-2">
                        <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">
                            Forgot Password?
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SellerLogin;