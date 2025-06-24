import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRequestOtpSignupMutation, useVerifyOtpRegisterMutation } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [signupUser, { isLoading: isRequestingOtp }] = useRequestOtpSignupMutation();
    const [verifyOtpAndRegister, { isLoading: isVerifyingOtp }] = useVerifyOtpRegisterMutation();
    const navigate = useNavigate();

    // State to manage the signup steps
    const [step, setStep] = useState(1); // 1: Initial signup, 2: OTP verification
    const [registrationDetails, setRegistrationDetails] = useState(null); // To store details after OTP request

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        role: Yup.string().oneOf(['user', 'seller'], 'Invalid role').required('Role is required'),
        storeName: Yup.string().when('role', {
            is: 'seller',
            then: (schema) => schema.required('Store name is required'),
            otherwise: (schema) => schema.notRequired(),
        }),
        storeDescription: Yup.string().notRequired(),
    });

    const otpValidationSchema = Yup.object().shape({
        otp: Yup.string().matches(/^\d{6}$/, 'OTP must be a 6-digit number').required('OTP is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: 'user',
            storeName: '',
            storeDescription: '',
            otp: '', // Added OTP field
        },
        validationSchema: step === 1 ? validationSchema : otpValidationSchema,
        onSubmit: async (values) => {
            if (step === 1) {
                // Step 1: Request OTP
                try {
                    const res = await signupUser({ email: values.email }).unwrap();
                    toast.success(res.message);
                    setRegistrationDetails(values); // Store all form values
                    setStep(2); // Move to OTP verification step
                } catch (error) {
                    toast.error(error.data?.message || 'Failed to request OTP');
                }
            } else if (step === 2) {
                // Step 2: Verify OTP and register
                try {
                    const finalValues = {
                        ...registrationDetails,
                        otp: values.otp,
                    };
                    const res = await verifyOtpAndRegister(finalValues).unwrap();
                    toast.success(res.message);

                    setTimeout(() => {
                        if (registrationDetails.role === 'user') {
                            navigate('/user/login');
                        } else {
                            navigate('/seller/login');
                        }
                    }, 500);
                } catch (error) {
                    toast.error(error.data?.message || 'OTP verification failed');
                }
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
                    <p className="text-gray-500 text-sm mt-1">Join our pet-loving community!</p>
                </div>

                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">Create Account</h2>
                </div>

                {step === 1 && (
                    <>
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                            )}
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

                        <div className="flex space-x-3 mb-6">
                            <button
                                type="button"
                                onClick={() => formik.setFieldValue('role', 'user')}
                                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-xl transition duration-300 ease-in-out ${
                                    formik.values.role === 'user' ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                Pet Owner
                            </button>
                            <button
                                type="button"
                                onClick={() => formik.setFieldValue('role', 'seller')}
                                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-xl transition duration-300 ease-in-out ${
                                    formik.values.role === 'seller' ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                Store Owner
                            </button>
                        </div>
                        {formik.touched.role && formik.errors.role && (
                            <div className="text-red-500 text-sm mb-4">{formik.errors.role}</div>
                        )}

                        {formik.values.role === 'seller' && (
                            <>
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        name="storeName"
                                        placeholder="Store Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.storeName}
                                        className="pl-3 pr-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                    />
                                    {formik.touched.storeName && formik.errors.storeName && (
                                        <div className="text-red-500 text-sm mt-1">{formik.errors.storeName}</div>
                                    )}
                                </div>

                                <div className="relative mb-6">
                                    <textarea
                                        name="storeDescription"
                                        placeholder="Store Description (optional)"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.storeDescription}
                                        rows="3"
                                        className="pl-3 pr-3 py-2 border border-gray-300 rounded-lg w-full resize-y focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                    ></textarea>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={isRequestingOtp}
                            className={`w-full py-3 rounded-full text-white font-semibold transition duration-300 ease-in-out ${
                                isRequestingOtp ? 'bg-orange-300 cursor-not-allowed' : 'bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 shadow-lg'
                            }`}
                        >
                            {isRequestingOtp ? 'Requesting OTP...' : 'Join PetShop Family'}
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <p className="text-center text-gray-600 mb-4 text-sm">An OTP has been sent to your email. Please enter it below to complete registration.</p>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <input
                                type="text"
                                name="otp"
                                placeholder="Enter 6-digit OTP"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.otp}
                                className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-center tracking-widest text-lg"
                                maxLength="6"
                            />
                            {formik.touched.otp && formik.errors.otp && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.otp}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isVerifyingOtp}
                            className={`w-full py-3 rounded-full text-white font-semibold transition duration-300 ease-in-out ${
                                isVerifyingOtp ? 'bg-green-300 cursor-not-allowed' : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg'
                            } mb-3`}
                        >
                            {isVerifyingOtp ? 'Verifying...' : 'Verify OTP & Register'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setStep(1); // Go back to step 1
                                formik.resetForm(); // Reset the form values
                            }}
                            className="w-full py-3 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition duration-300 ease-in-out"
                        >
                            Back to Signup
                        </button>
                    </>
                )}

                <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an account? <span className="text-orange-500 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/user/login')}>Sign In</span>
                </p>
                <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an Store Account? <span className="text-orange-500 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/seller/login')}>Sign In</span>
                </p>
            </form>
        </div>
    );
};

export default SignUp;