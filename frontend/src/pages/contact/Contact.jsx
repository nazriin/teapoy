import React from 'react';
import {Link} from "react-router-dom";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* Header Section */}
            <div className="relative w-full bg-gray-900 text-white py-16 px-4 md:px-8 lg:px-16 flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url(https://wdt-teapoy.myshopify.com/cdn/shop/files/Rectangle_38937_2.jpg?v=1722593355&width=1920)' }}></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Contact</h1>
                    <nav className="text-lg md:text-xl">
                        <Link to='/' className="hover:text-orange-400 mr-4">Home</Link>
                        <Link to='/contact' className="hover:text-orange-400">Contact</Link>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Write Us Section */}
                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Write Us</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                        Send us your inquiries or feedback. Our team is here to assist you!
                    </p>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Contact Information Section */}
                <div className="mt-12 max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                    <p className="mb-2">Address: 123 Tech Lane, Innovation City, IC 45678</p>
                    <p className="mb-2">Phone: +1-234-567-8900</p>
                    <p className="mb-2">Email: support@example.com</p>
                    <div className="mt-4">
                        <iframe
                            title="Google Maps"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434891856!2d-122.41941568458952!3d37.77492997963326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1624678901234!5m2!1sen!2sus"
                            width="100%"
                            height="200"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                            className="rounded-md"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;