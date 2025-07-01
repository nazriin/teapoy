// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useCreateUserMutation, useCreateSellerMutation } from '../../services/authApi';
// // import { toast } from 'react-toastify';
// //
// // const Signup = () => {
// //     const [formData, setFormData] = useState({
// //         name: '',
// //         email: '',
// //         password: '',
// //         role: 'user',
// //         storeName: '',
// //         storeDescription: '',
// //     });
// //     const [createUser, { isLoading: isUserLoading }] = useCreateUserMutation();
// //     const [createSeller, { isLoading: isSellerLoading }] = useCreateSellerMutation();
// //     const navigate = useNavigate();
// //
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData((prev) => ({ ...prev, [name]: value }));
// //     };
// //
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //
// //         // Frontend validation
// //         if (!formData.name || !formData.email || !formData.password) {
// //             toast.error('Name, email, and password are required');
// //             return;
// //         }
// //         if (formData.password.length < 6) {
// //             toast.error('Password must be at least 6 characters');
// //             return;
// //         }
// //         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// //             toast.error('Invalid email address');
// //             return;
// //         }
// //         if (formData.role === 'seller' && !formData.storeName) {
// //             toast.error('Store name is required for sellers');
// //             return;
// //         }
// //         if (formData.role === 'seller' && formData.storeDescription.length > 500) {
// //             toast.error('Store description must be 500 characters or less');
// //             return;
// //         }
// //
// //         try {
// //             const mutation = formData.role === 'user' ? createUser : createSeller;
// //             const response = await mutation(formData).unwrap();
// //             toast.success(response.message);
// //
// //             // Role-based redirection
// //             if (response.user.role === 'user') {
// //                 navigate('/user/login');
// //             } else if (response.user.role === 'seller') {
// //                 navigate('/seller/login');
// //             }
// //         } catch (error) {
// //             const message =
// //                 error.data?.message ||
// //                 error.data?.errors?.[0]?.msg ||
// //                 'Failed to sign up';
// //             toast.error(message);
// //         }
// //     };
// //
// //     return (
// //         <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
// //                 <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                     <div>
// //                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
// //                             Name
// //                         </label>
// //                         <input
// //                             type="text"
// //                             id="name"
// //                             name="name"
// //                             value={formData.name}
// //                             onChange={handleChange}
// //                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                             required
// //                         />
// //                     </div>
// //                     <div>
// //                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// //                             Email
// //                         </label>
// //                         <input
// //                             type="email"
// //                             id="email"
// //                             name="email"
// //                             value={formData.email}
// //                             onChange={handleChange}
// //                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                             required
// //                         />
// //                     </div>
// //                     <div>
// //                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// //                             Password
// //                         </label>
// //                         <input
// //                             type="password"
// //                             id="password"
// //                             name="password"
// //                             value={formData.password}
// //                             onChange={handleChange}
// //                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                             required
// //                         />
// //                     </div>
// //                     <div>
// //                         <label htmlFor="role" className="block text-sm font-medium text-gray-700">
// //                             Role
// //                         </label>
// //                         <select
// //                             id="role"
// //                             name="role"
// //                             value={formData.role}
// //                             onChange={handleChange}
// //                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                         >
// //                             <option value="user">User</option>
// //                             <option value="seller">Seller</option>
// //                         </select>
// //                     </div>
// //                     {formData.role === 'seller' && (
// //                         <>
// //                             <div>
// //                                 <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
// //                                     Store Name
// //                                 </label>
// //                                 <input
// //                                     type="text"
// //                                     id="storeName"
// //                                     name="storeName"
// //                                     value={formData.storeName}
// //                                     onChange={handleChange}
// //                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                                     required
// //                                 />
// //                             </div>
// //                             <div>
// //                                 <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700">
// //                                     Store Description (Optional)
// //                                 </label>
// //                                 <textarea
// //                                     id="storeDescription"
// //                                     name="storeDescription"
// //                                     value={formData.storeDescription}
// //                                     onChange={handleChange}
// //                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //                                     rows="4"
// //                                 />
// //                             </div>
// //                         </>
// //                     )}
// //                     <button
// //                         type="submit"
// //                         disabled={isUserLoading || isSellerLoading}
// //                         className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
// //                     >
// //                         {isUserLoading || isSellerLoading ? 'Signing Up...' : 'Sign Up'}
// //                     </button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };
// //
// // export default Signup;
//
//
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Add for navigation
//
// const Signup = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         role: 'user',
//         storeName: '',
//         description: '',
//         surname: '', // Add for seller registration
//     });
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState({ type: '', text: '' });
//     const navigate = useNavigate(); // Initialize navigate
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (message.text) setMessage({ type: '', text: '' });
//     };
//
//     const validateForm = () => {
//         const { name, email, password, role, storeName, surname } = formData;
//
//         if (!name.trim()) return 'Name is required';
//         if (!email.trim()) return 'Email is required';
//         if (!password) return 'Password is required';
//
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) return 'Please enter a valid email address';
//
//         if (password.length < 6) return 'Password must be at least 6 characters long';
//
//         if (role === 'seller') {
//             if (!storeName.trim()) return 'Store name is required for sellers';
//             if (!surname.trim()) return 'Surname is required for sellers';
//         }
//
//         return null;
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         const validationError = validateForm();
//         if (validationError) {
//             setMessage({ type: 'error', text: validationError });
//             return;
//         }
//
//         setLoading(true);
//         setMessage({ type: '', text: '' });
//
//         try {
//             const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
//             const endpoint = formData.role === 'user'
//                 ? `${baseUrl}/api/users/register`
//                 : `${baseUrl}/api/sellers/register`;
//
//             const payload = formData.role === 'user'
//                 ? {
//                     name: formData.name,
//                     email: formData.email,
//                     password: formData.password,
//                     role: formData.role
//                 }
//                 : {
//                     name: formData.name,
//                     email: formData.email,
//                     password: formData.password,
//                     surname: formData.surname, // Add required field
//                     storeName: formData.storeName,
//                     description: formData.description,
//                     // Note: avatar, banner, businessLicense, address are not included as they require file uploads
//                 };
//
//             const response = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });
//
//             const contentType = response.headers.get('content-type');
//             const text = await response.text();
//             let data = {};
//
//             if (contentType && contentType.includes('application/json')) {
//                 if (text) {
//                     try {
//                         data = JSON.parse(text);
//                     } catch (parseError) {
//                         console.error('JSON parse error:', parseError);
//                         throw new Error('Invalid server response');
//                     }
//                 } else {
//                     throw new Error('Empty response from server');
//                 }
//             } else {
//                 throw new Error(text || `Server error: ${response.status}`);
//             }
//
//             if (!response.ok) {
//                 throw new Error(data.message || `Registration failed (${response.status})`);
//             }
//
//             setMessage({
//                 type: 'success',
//                 text: data.message || 'Registration successful! Please log in.'
//             });
//
//             // Reset form and navigate
//             setFormData({
//                 name: '',
//                 email: '',
//                 password: '',
//                 role: 'user',
//                 storeName: '',
//                 description: '',
//                 surname: '',
//             });
//
//             // Role-based redirection
//             navigate(formData.role === 'user' ? '/user/login' : '/seller/login');
//
//         } catch (error) {
//             console.error('Error:', error);
//             setMessage({
//                 type: 'error',
//                 text: error.message || 'Something went wrong. Please try again.'
//             });
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//             <div className="w-full max-w-md">
//                 <div className="bg-white rounded-2xl shadow-xl p-8">
//                     <div className="text-center mb-8">
//                         <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
//                         <p className="text-gray-600">Join us and start your journey</p>
//                     </div>
//
//                     {message.text && (
//                         <div className={`mb-6 p-4 rounded-lg border ${
//                             message.type === 'success'
//                                 ? 'bg-green-50 border-green-200 text-green-800'
//                                 : 'bg-red-50 border-red-200 text-red-800'
//                         }`}>
//                             <p className="text-sm font-medium">{message.text}</p>
//                         </div>
//                     )}
//
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-3">
//                                 I want to register as:
//                             </label>
//                             <div className="grid grid-cols-2 gap-3">
//                                 <button
//                                     type="button"
//                                     onClick={() => setFormData(prev => ({ ...prev, role: 'user', storeName: '', description: '', surname: '' }))}
//                                     className={`p-3 rounded-lg border-2 transition-all duration-200 ${
//                                         formData.role === 'user'
//                                             ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
//                                             : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
//                                     }`}
//                                 >
//                                     <div className="text-center">
//                                         <div className="font-semibold">User</div>
//                                         <div className="text-xs mt-1">Browse & buy products</div>
//                                     </div>
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setFormData(prev => ({ ...prev, role: 'seller' }))}
//                                     className={`p-3 rounded-lg border-2 transition-all duration-200 ${
//                                         formData.role === 'seller'
//                                             ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
//                                             : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
//                                     }`}
//                                 >
//                                     <div className="text-center">
//                                         <div className="font-semibold">Seller</div>
//                                         <div className="text-xs mt-1">Sell your products</div>
//                                     </div>
//                                 </button>
//                             </div>
//                         </div>
//
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Full Name *
//                             </label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//                                 placeholder="Enter your full name"
//                                 required
//                             />
//                         </div>
//
//                         {formData.role === 'seller' && (
//                             <div>
//                                 <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Surname *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="surname"
//                                     name="surname"
//                                     value={formData.surname}
//                                     onChange={handleChange}
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//                                     placeholder="Enter your surname"
//                                     required
//                                 />
//                             </div>
//                         )}
//
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Email Address *
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//                                 placeholder="Enter your email"
//                                 required
//                             />
//                         </div>
//
//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Password *
//                             </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//                                 placeholder="Create a password (min. 6 characters)"
//                                 required
//                             />
//                         </div>
//
//                         {formData.role === 'seller' && (
//                             <div className="space-y-6 pt-2 border-t border-gray-100">
//                                 <h3 className="text-lg font-semibold text-gray-900">Store Information</h3>
//                                 <div>
//                                     <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-2">
//                                         Store Name *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="storeName"
//                                         name="storeName"
//                                         value={formData.storeName}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
//                                         placeholder="Enter your store name"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//                                         Store Description (Optional)
//                                     </label>
//                                     <textarea
//                                         id="description"
//                                         name="description"
//                                         value={formData.description}
//                                         onChange={handleChange}
//                                         rows="3"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
//                                         placeholder="Describe your store and what you sell..."
//                                     />
//                                 </div>
//                             </div>
//                         )}
//
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                         >
//                             {loading ? (
//                                 <div className="flex items-center justify-center">
//                                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                                     Creating Account...
//                                 </div>
//                             ) : (
//                                 `Create ${formData.role === 'user' ? 'User' : 'Seller'} Account`
//                             )}
//                         </button>
//                     </form>
//
//                     <div className="mt-8 text-center">
//                         <p className="text-sm text-gray-600">
//                             Already have an account?{' '}
//                             <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
//                                 Sign in here
//                             </a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Signup;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSignupUserMutation } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [signupUser, { isLoading }] = useSignupUserMutation();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        role: Yup.string().oneOf(['user', 'seller'], 'Invalid role').required('Role is required'),
        storeName: Yup.string().when('role', {
            is: 'seller',
            then: schema => schema.required('Store name is required'),
            otherwise: schema => schema.notRequired()
        }),
        storeDescription: Yup.string().notRequired(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: 'user',
            storeName: '',
            storeDescription: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await signupUser(values).unwrap();
                toast.success(res.message);

                setTimeout(() => {
                    if (values.role === 'user') {
                        navigate('/user/login');
                    } else {
                        navigate('/seller/login');
                    }
                }, 500);

            } catch (error) {
                toast.error(error.data?.message || "Registration failed");
            }
        }
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="border p-2 w-full mb-2"
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm mb-2">{formik.errors.name}</div>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="border p-2 w-full mb-2"
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm mb-2">{formik.errors.email}</div>
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="border p-2 w-full mb-2"
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm mb-2">{formik.errors.password}</div>
                )}

                <select
                    name="role"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                    className="border p-2 w-full mb-2"
                >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                </select>
                {formik.touched.role && formik.errors.role && (
                    <div className="text-red-500 text-sm mb-2">{formik.errors.role}</div>
                )}

                {formik.values.role === 'seller' && (
                    <>
                        <input
                            type="text"
                            name="storeName"
                            placeholder="Store Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.storeName}
                            className="border p-2 w-full mb-2"
                        />
                        {formik.touched.storeName && formik.errors.storeName && (
                            <div className="text-red-500 text-sm mb-2">{formik.errors.storeName}</div>
                        )}

                        <input
                            type="text"
                            name="storeDescription"
                            placeholder="Store Description (optional)"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.storeDescription}
                            className="border p-2 w-full mb-2"
                        />
                    </>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`p-2 w-full rounded ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white mt-2`}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
