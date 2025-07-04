// src/components/AdminLogin.jsx
import React from 'react'; // No need for useEffect here as we're not reading from a slice for initial redirect
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginAdminMutation } from '../../services/adminApi'; // Adjust path if necessary
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    // Use the useLoginAdminMutation hook from your adminApi
    const [loginAdmin, { isLoading }] = useLoginAdminMutation();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        usernameOrEmail: Yup.string()
            .required('Username or Email is required')
            .min(3, 'Must be at least 3 characters long'), // Basic validation
        password: Yup.string().required('Password is required'),
    });

    // Formik hook for form management
    const formik = useFormik({
        initialValues: { usernameOrEmail: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            try {
                // Call the loginAdmin mutation.
                // The 'res' here contains the data returned by your backend's login endpoint.
                // We no longer dispatch it to a separate Redux slice.
                const res = await loginAdmin(values).unwrap();

                // Upon successful login, the HTTP-only 'jwt' cookie is set by the backend.
                // The AdminPrivateRoute will pick this up on its next render/check.

                toast.success(res.message || "Admin login successful!");
                navigate('/admin/dashboard'); // Redirect to admin dashboard

            } catch (error) {
                console.error("Login error:", error); // Log the full error for debugging
                // Accessing error details from RTK Query's error object
                toast.error(error.data?.message || error.error || "Admin login failed.");
            }
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-orange-50 relative overflow-hidden font-inter">
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-48 h-48 bg-orange-200 rounded-full opacity-30 blur-2xl pointer-events-none animate-float-1"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-60 h-60 bg-yellow-200 rounded-full opacity-30 blur-2xl pointer-events-none animate-float-2"></div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-xl pointer-events-none animate-float-3"></div>

            <form onSubmit={formik.handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto z-10">
                <div className="flex flex-col items-center mb-6">
                    {/* Replace with your actual logo path */}
                    <img src="https://demo2.themelexus.com/ziggy/wp-content/uploads/2022/05/logo.svg" alt="PetShop Logo" className="h-12 mb-2" />
                    <p className="text-gray-500 text-sm mt-1">Welcome, Admin!</p>
                </div>

                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">Admin Login</h2>
                </div>

                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {/* Icon for username/email field */}
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <input
                        type="text"
                        name="usernameOrEmail"
                        placeholder="Username or Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.usernameOrEmail}
                        className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                    {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.usernameOrEmail}</div>
                    )}
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {/* Icon for password field */}
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-full text-white font-semibold transition duration-300 ease-in-out ${
                        isLoading ? 'bg-orange-300 cursor-not-allowed' : 'bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 shadow-lg'
                    }`}
                >
                    {isLoading ? 'Logging in...' : 'Login as Admin'}
                </button>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Need Admin Access? Contact Support.
                </p>
            </form>
        </div>
    );
};

export default AdminLogin;