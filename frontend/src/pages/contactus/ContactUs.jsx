// src/pages/ContactUs.jsx
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSubmitAppointmentFormMutation } from '../../services/contactUsApi'; // Ad dəyişdirildi
import { useGetAllServicesQuery } from '../../services/servicesAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const [submitAppointmentForm, { isLoading, isSuccess, isError, error }] = useSubmitAppointmentFormMutation(); // Ad dəyişdirildi
    const { data: services, isLoading: servicesLoading, isError: servicesError } = useGetAllServicesQuery();

    useEffect(() => {
        if (isSuccess) {
            toast.success('Appointment request sent successfully!');
            formik.resetForm();
        }
        if (isError) {
            toast.error(error?.data?.message || 'Failed to send appointment request.');
        }
    }, [isSuccess, isError, error]);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            petName: '',
            date: '',
            serviceRequest: '',
            message: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required('Full Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            phoneNumber: Yup.string()
                .matches(/^\+?[0-9]{7,15}$/, 'Phone number is not valid')
                .required('Phone Number is required'),
            petName: Yup.string()
                .required('Pet Name is required'),
            date: Yup.date()
                .min(new Date(), 'Date cannot be in the past')
                .required('Date is required'),
            serviceRequest: Yup.string()
                .required('Service selection is required'),
            message: Yup.string(),
        }),
        onSubmit: (values) => {
            submitAppointmentForm(values); // Funksiya çağırışı dəyişdirildi
        },
    });

    if (servicesLoading) return <div className="text-center text-rose-800 dark:text-rose-400 py-8">Loading services...</div>;
    if (servicesError) return <div className="text-center text-red-600 dark:text-red-400 py-8">Error loading services.</div>;

    return (
        <div className="container mx-auto px-4 py-8 bg-rose-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-10 md:text-5xl text-rose-800 dark:text-rose-400">
                Contact Us & Book an Appointment
            </h1>

            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 dark:bg-gray-800 dark:shadow-md">
                <p className="text-center text-lg mb-6 text-gray-700 dark:text-gray-300">
                    Please fill out the form below to send us a message or request an appointment.
                </p>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                            className="mt-1 block w-full px-4 py-2 border border-rose-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        {formik.touched.fullName && formik.errors.fullName ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="mt-1 block w-full px-4 py-2 border border-rose-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                            className="mt-1 block w-full px-4 py-2 border border-rose-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="petName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Pet Name
                        </label>
                        <input
                            type="text"
                            id="petName"
                            name="petName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.petName}
                            className="mt-1 block w-full px-4 py-2 border border-rose-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        {formik.touched.petName && formik.errors.petName ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.petName}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Requested Appointment Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date}
                            className="mt-1 block w-full px-4 py-2 border border-rose-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        {formik.touched.date && formik.errors.date ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.date}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="serviceRequest" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Service of Interest
                        </label>
                        <select
                            id="serviceRequest"
                            name="serviceRequest"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.serviceRequest}
                            className="mt-1 block w-full px-4 py-2 border border-rose-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">Select a service</option>
                            {services && services.map((service) => (
                                <option key={service._id} value={service.name}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.serviceRequest && formik.errors.serviceRequest ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.serviceRequest}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Your Message (Optional)
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.message}
                            className="mt-1 block w-full px-4 py-2 border border-rose-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
                            isLoading ? 'bg-rose-400' : 'bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-300`}
                    >
                        {isLoading ? 'Sending Request...' : 'Send Appointment Request'}
                    </button>
                </form>
            </div>

            <div className="mt-12 text-center text-gray-700 dark:text-gray-300">
                <p>
                    We look forward to hearing from you! Our team will get back to you as soon as possible.
                </p>
            </div>
        </div>
    );
};

export default ContactUs;