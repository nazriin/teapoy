import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation, useCreateSellerMutation } from '../../services/authApi';
import { toast } from 'react-toastify';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        storeName: '',
        storeDescription: '',
    });
    const [createUser, { isLoading: isUserLoading }] = useCreateUserMutation();
    const [createSeller, { isLoading: isSellerLoading }] = useCreateSellerMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!formData.name || !formData.email || !formData.password) {
            toast.error('Name, email, and password are required');
            return;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error('Invalid email address');
            return;
        }
        if (formData.role === 'seller' && !formData.storeName) {
            toast.error('Store name is required for sellers');
            return;
        }
        if (formData.role === 'seller' && formData.storeDescription.length > 500) {
            toast.error('Store description must be 500 characters or less');
            return;
        }

        try {
            const mutation = formData.role === 'user' ? createUser : createSeller;
            const response = await mutation(formData).unwrap();
            toast.success(response.message);

            // Role-based redirection
            if (response.user.role === 'user') {
                navigate('/user/login');
            } else if (response.user.role === 'seller') {
                navigate('/seller/login');
            }
        } catch (error) {
            const message =
                error.data?.message ||
                error.data?.errors?.[0]?.msg ||
                'Failed to sign up';
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    {formData.role === 'seller' && (
                        <>
                            <div>
                                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                                    Store Name
                                </label>
                                <input
                                    type="text"
                                    id="storeName"
                                    name="storeName"
                                    value={formData.storeName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700">
                                    Store Description (Optional)
                                </label>
                                <textarea
                                    id="storeDescription"
                                    name="storeDescription"
                                    value={formData.storeDescription}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    rows="4"
                                />
                            </div>
                        </>
                    )}
                    <button
                        type="submit"
                        disabled={isUserLoading || isSellerLoading}
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
                    >
                        {isUserLoading || isSellerLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;