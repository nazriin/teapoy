// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useLoginUserMutation } from '../../services/authApi';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
//
// const SellerLogin = () => {
//     const [loginUser, { isLoading }] = useLoginUserMutation();
//     const navigate = useNavigate();
//
//     const validationSchema = Yup.object({
//         email: Yup.string().email('Invalid email').required('Email is required'),
//         password: Yup.string().required('Password is required'),
//     });
//
//     const formik = useFormik({
//         initialValues: { email: '', password: '' },
//         validationSchema,
//         onSubmit: async (values) => {
//             try {
//                 const res = await loginUser({ ...values, role: 'seller' }).unwrap();
//                 // Store token in localStorage
//                 if (res.token) {
//                     localStorage.setItem('token', res.token);
//                 }
//                 toast.success(res.message || 'Login successful');
//                 navigate('/seller/dashboard'); // Match ProtectedRoute's expected route
//             } catch (error) {
//                 toast.error(error.data?.message || 'Login failed');
//             }
//         },
//     });
//
//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Seller Login</h2>
//
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.email}
//                     className="border p-2 w-full mb-2"
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                     <div className="text-red-500 text-sm mb-2">{formik.errors.email}</div>
//                 )}
//
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.password}
//                     className="border p-2 w-full mb-2"
//                 />
//                 {formik.touched.password && formik.errors.password && (
//                     <div className="text-red-500 text-sm mb-2">{formik.errors.password}</div>
//                 )}
//
//                 <button
//                     type="submit"
//                     disabled={isLoading}
//                     className={`p-2 w-full rounded ${isLoading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white mt-2`}
//                 >
//                     {isLoading ? 'Logging in...' : 'Login'}
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default SellerLogin;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginUserMutation } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SellerLogin = () => {
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await loginUser({ ...values, role: 'seller' }).unwrap();
                // Store token in localStorage
                if (res.token) {
                    localStorage.setItem('token', res.token);
                }
                toast.success(res.message || 'Login successful');
                navigate('/seller/dashboard'); // Match ProtectedRoute's expected route
            } catch (error) {
                toast.error(error.data?.message || 'Login failed');
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-orange-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-48 h-48 bg-orange-200 rounded-full opacity-30 blur-2xl pointer-events-none animate-float-1"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-60 h-60 bg-yellow-200 rounded-full opacity-30 blur-2xl pointer-events-none animate-float-2"></div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-xl pointer-events-none animate-float-3"></div>

            <form onSubmit={formik.handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto z-10">
                <div className="flex flex-col items-center mb-6">
                    <img src="https://demo2.themelexus.com/ziggy/wp-content/uploads/2022/05/logo.svg" alt="PetShop Logo" className="h-12 mb-2" /> {/* Replace with your actual logo path */}
                </div>

                <div className="flex flex-col items-center mb-6">

                    <h2 className="text-xl font-bold text-gray-800 mb-1">Seller Login</h2>
                    <p className="text-gray-500 text-sm">Access your store dashboard</p>
                </div>

                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                    )}
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Don't have an account? <span className="text-orange-500 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/signup')}>Sign Up</span>
                </p>
            </form>
            {/* Tailwind Keyframes for floating effect */}
            <style jsx>{`
                @keyframes float-1 {
                    0% { transform: translate(-25%, -25%) rotate(0deg); }
                    50% { transform: translate(-20%, -30%) rotate(5deg); }
                    100% { transform: translate(-25%, -25%) rotate(0deg); }
                }
                @keyframes float-2 {
                    0% { transform: translate(25%, 25%) rotate(0deg); }
                    50% { transform: translate(30%, 20%) rotate(-5deg); }
                    100% { transform: translate(25%, 25%) rotate(0deg); }
                }
                @keyframes float-3 {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(5%, -5%) rotate(3deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                .animate-float-1 { animation: float-1 10s ease-in-out infinite; }
                .animate-float-2 { animation: float-2 12s ease-in-out infinite; }
                .animate-float-3 { animation: float-3 8s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default SellerLogin;