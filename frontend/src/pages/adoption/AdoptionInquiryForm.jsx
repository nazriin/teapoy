// AdoptionInquiryForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';
import { useSendAdoptionInquiryMutation } from '../../services/adoptionApi'; // New API slice

const AdoptionInquiryForm = ({ petName, onClose }) => {
    const [sendAdoptionInquiry, { isLoading, isSuccess, isError, error }] = useSendAdoptionInquiryMutation();

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
        message: Yup.string(),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await sendAdoptionInquiry({ ...values, petName }).unwrap();
            resetForm();
            onClose(); // Close the form on success
        } catch (err) {
            console.error('Failed to send adoption inquiry:', err);
            // Error message will be handled by isError and error states
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Inquire About {petName}</h2>

                {isSuccess && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">Inquiry sent successfully!</div>}
                {isError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">Error: {error?.data?.message || 'Failed to send inquiry.'}</div>}

                <Formik
                    initialValues={{ fullName: '', email: '', phoneNumber: '', message: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <Field
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                />
                                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <Field
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                />
                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message (Optional)</label>
                                <Field
                                    as="textarea"
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                />
                                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-rose-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-rose-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50"
                                disabled={isSubmitting || isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send Inquiry'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdoptionInquiryForm;