// FaqSec.jsx
import React, { useState } from 'react';
import { useSendAppointmentRequestMutation } from '../../../services/contactApi'; // Adjust the import path based on your project structure

const FAQPage = ({ theme }) => {
    // Form fields state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        petName: '',
        date: '',
        serviceRequest: '',
    });

    // RTK Query mutation hook for sending the appointment request
    const [sendAppointmentRequest, { isLoading, isSuccess, isError, error }] = useSendAppointmentRequestMutation();

    // FAQ state
    const [faqs, setFaqs] = useState([
        {
            id: 1,
            question: 'How do I make an appointment?',
            answer: 'You can make an appointment by filling out the form on this page or calling our office directly. We recommend using the contact information your veterinarian has on file.',
            isOpen: false
        },
        {
            id: 2,
            question: 'Do I need to have the initial consultation? I\'m in a hurry.',
            answer: 'Yes, an initial consultation is required for all new patients. This helps us understand your pet\'s medical history and current needs to provide the best care possible.',
            isOpen: false
        },
        {
            id: 3,
            question: 'What kind of animals do we care for?',
            answer: 'We provide comprehensive veterinary care for dogs, cats, and other small animals. Our experienced team is equipped to handle routine checkups, vaccinations, emergency care, and specialized treatments.',
            isOpen: false
        },
        {
            id: 4,
            question: 'How many times a day will you visit my pet?',
            answer: 'For hospitalized pets, we conduct regular check-ups throughout the day. The frequency depends on your pet\'s condition and treatment plan. We\'ll keep you informed about your pet\'s progress.',
            isOpen: false
        },
    ]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Basic client-side validation
        if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.petName || !formData.date || !formData.serviceRequest) {
            alert('Please fill in all fields before sending the request.');
            return;
        }

        try {
            // Call the mutation to send the data to the backend
            await sendAppointmentRequest(formData).unwrap();
            alert('Appointment request sent successfully!');
            // Reset form after successful submission
            setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                petName: '',
                date: '',
                serviceRequest: '',
            });
        } catch (err) {
            console.error('Failed to send appointment request:', err);
            // Display error message from backend if available, otherwise a generic one
            alert(err.data?.message || 'Failed to send appointment request. Please try again.');
        }
    };

    const toggleFAQ = (id) => {
        setFaqs(prevFaqs =>
            prevFaqs.map(faq =>
                faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
            )
        );
    };

    return (
        <div className="container mx-auto p-4 md:p-8 lg:p-12 min-h-screen bg-[#FCF2EF] dark:bg-gray-900 transition-colors duration-300">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Request an Appointment Section */}
                <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <h2 className="text-xl font-bold text-rose-800 dark:text-rose-300 mb-4 transition-colors duration-300">
                        REQUEST AN APPOINTMENT
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                        Make sure you use the email or phone number your veterinarian has on file.
                    </p>
                    <div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="petName"
                                placeholder="Pet Name"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                                value={formData.petName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="date"
                                name="date"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <select
                                name="serviceRequest"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                                value={formData.serviceRequest}
                                onChange={handleInputChange}
                            >
                                <option value="">Service Request</option>
                                <option value="Pet training">Pet training</option>
                                <option value="Medical Care">Medical Care</option>
                                <option value="Vaccination">Vaccination</option>
                                <option value="Animal adoption">Animal adoption</option>
                                <option value="Boarding">Boarding</option>
                                <option value="Dog walking">Dog walking</option>
                                <option value="Grooming">Grooming</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={handleFormSubmit}
                            className="w-full bg-rose-600 dark:bg-rose-700 text-white py-3 rounded-md hover:bg-rose-700 dark:hover:bg-rose-800 transition duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'SENDING...' : 'SEND REQUEST'}
                        </button>
                        {/* Display success/error messages */}
                        {isSuccess && <p className="text-green-600 dark:text-green-400 mt-2 transition-colors duration-300">Request sent successfully!</p>}
                        {isError && <p className="text-red-600 dark:text-red-400 mt-2 transition-colors duration-300">Error: {error?.data?.message || 'Failed to send request.'}</p>}
                    </div>
                </div>

                {/* Questions & Answers Section */}
                <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <div className="relative h-48 md:h-64 lg:h-72">
                        <img
                            src="https://cdn.shopify.com/s/files/1/0905/2012/files/pawful-img-10.png"
                            alt="Golden Retriever"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <h2 className="text-white text-2xl md:text-3xl font-bold">
                                QUESTIONS & ANSWERS
                            </h2>
                        </div>
                    </div>
                    <div className="p-6">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="mb-4 border-b border-gray-200 dark:border-gray-600 last:border-b-0 transition-colors duration-300">
                                <button
                                    className="flex justify-between items-center w-full py-3 text-left font-semibold text-gray-800 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 focus:outline-none transition duration-200"
                                    onClick={() => toggleFAQ(faq.id)}
                                >
                                    <span>{faq.question}</span>
                                    <span className="text-rose-500 dark:text-rose-400 text-xl font-bold transition-colors duration-300">
                                        {faq.isOpen ? '−' : '+'}
                                    </span>
                                </button>
                                {faq.isOpen && (
                                    <div className="pb-3 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;