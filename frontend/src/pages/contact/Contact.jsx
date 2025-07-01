
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Music, Send, Clock, AlertCircle } from 'lucide-react';

const useFormik = (config) => {
    const [values, setValues] = useState(config.initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        if (config.validationSchema) {
            const fieldErrors = validateField(name, values[name]);
            setErrors(prev => ({ ...prev, ...fieldErrors }));
        }
    };

    const validateField = (fieldName, value) => {
        const errors = {};

        switch (fieldName) {
            case 'name':
                if (!value || value.trim().length === 0) {
                    errors.name = 'Name is required';
                } else if (value.trim().length < 2) {
                    errors.name = 'Name must be at least 2 characters';
                }
                break;
            case 'email':
                if (!value || value.trim().length === 0) {
                    errors.email = 'Email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    errors.email = 'Invalid email address';
                }
                break;
            case 'phone':
                if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
                    errors.phone = 'Invalid phone number';
                }
                break;
            case 'message':
                if (!value || value.trim().length === 0) {
                    errors.message = 'Message is required';
                } else if (value.trim().length < 10) {
                    errors.message = 'Message must be at least 10 characters';
                }
                break;
            case 'consent':
                if (!value) {
                    errors.consent = 'You must agree to the privacy policy';
                }
                break;
        }

        return errors;
    };

    const validateForm = () => {
        const formErrors = {};
        Object.keys(values).forEach(key => {
            const fieldErrors = validateField(key, values[key]);
            Object.assign(formErrors, fieldErrors);
        });
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formErrors = validateForm();
        setErrors(formErrors);
        setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

        if (Object.keys(formErrors).length === 0) {
            await config.onSubmit(values);
        }

        setIsSubmitting(false);
    };

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue: (name, value) => setValues(prev => ({ ...prev, [name]: value })),
        resetForm: () => {
            setValues(config.initialValues);
            setErrors({});
            setTouched({});
        }
    };
};

const ContactSection = () => {
    const [submitStatus, setSubmitStatus] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            message: '',
            consent: false
        },
        onSubmit: async (values) => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));

                console.log('Form submitted:', values);
                setSubmitStatus('success');
                formik.resetForm();

                setTimeout(() => setSubmitStatus(''), 5000);
            } catch (error) {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus(''), 5000);
            }
        }
    });

    const getFieldError = (fieldName) => {
        return formik.touched[fieldName] && formik.errors[fieldName];
    };

    return (
        <>
            <section className="relative h-[500px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
                    <div className="absolute inset-0 opacity-30">
                        <div className="w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                    </div>
                </div>

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-indigo-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
                </div>

                <div className="relative z-10 flex flex-col justify-center h-full px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-6">
                            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                                <Mail className="w-4 h-4 mr-2" />
                                Get In Touch
                            </div>
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                            Contact
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Us
                            </span>
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>

                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <circle cx="5" cy="5" r="1" fill="white" opacity="0.3"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)"/>
                    </svg>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        <div className="relative">
                            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-900/10 p-8 lg:p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full -translate-y-16 translate-x-16"></div>

                                <div className="relative z-10">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Send us a message</h2>
                                        <p className="text-gray-600">Fill out the form below and we'll get back to you shortly.</p>
                                    </div>

                                    {submitStatus === 'success' && (
                                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</span>
                                            </div>
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                                            <div className="flex items-center">
                                                <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                                                <span className="text-red-800 font-medium">Something went wrong. Please try again.</span>
                                            </div>
                                        </div>
                                    )}

                                    <div onSubmit={formik.handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={formik.values.name}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="John Doe"
                                                        className={`w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                                                            getFieldError('name')
                                                                ? 'focus:ring-red-500 bg-red-50'
                                                                : 'focus:ring-blue-500'
                                                        }`}
                                                    />
                                                    {getFieldError('name') && (
                                                        <div className="mt-2 flex items-center text-red-600 text-sm">
                                                            <AlertCircle className="w-4 h-4 mr-1" />
                                                            {formik.errors.name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        value={formik.values.phone}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="+1 (555) 000-0000"
                                                        className={`w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                                                            getFieldError('phone')
                                                                ? 'focus:ring-red-500 bg-red-50'
                                                                : 'focus:ring-blue-500'
                                                        }`}
                                                    />
                                                    {getFieldError('phone') && (
                                                        <div className="mt-2 flex items-center text-red-600 text-sm">
                                                            <AlertCircle className="w-4 h-4 mr-1" />
                                                            {formik.errors.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder="john@example.com"
                                                className={`w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                                                    getFieldError('email')
                                                        ? 'focus:ring-red-500 bg-red-50'
                                                        : 'focus:ring-blue-500'
                                                }`}
                                            />
                                            {getFieldError('email') && (
                                                <div className="mt-2 flex items-center text-red-600 text-sm">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {formik.errors.email}
                                                </div>
                                            )}
                                        </div>


                                        <div>
                                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Your Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                value={formik.values.message}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder="Tell us about your project or inquiry..."
                                                className={`w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                                                    getFieldError('message')
                                                        ? 'focus:ring-red-500 bg-red-50'
                                                        : 'focus:ring-blue-500'
                                                }`}
                                            />
                                            {getFieldError('message') && (
                                                <div className="mt-2 flex items-center text-red-600 text-sm">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {formik.errors.message}
                                                </div>
                                            )}
                                        </div>


                                        <div>
                                            <div className="flex items-start">
                                                <div className="flex items-center h-6">
                                                    <input
                                                        id="consent"
                                                        name="consent"
                                                        type="checkbox"
                                                        checked={formik.values.consent}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`w-5 h-5 text-blue-600 bg-gray-50 border-0 rounded-lg focus:ring-2 ${
                                                            getFieldError('consent')
                                                                ? 'focus:ring-red-500'
                                                                : 'focus:ring-blue-500'
                                                        }`}
                                                    />
                                                </div>
                                                <label htmlFor="consent" className="ml-3 text-sm text-gray-600 leading-relaxed">
                                                    I agree to the collection and processing of my personal data in accordance with the privacy policy. *
                                                </label>
                                            </div>
                                            {getFieldError('consent') && (
                                                <div className="mt-2 flex items-center text-red-600 text-sm">
                                                    <AlertCircle className="w-4 h-4 mr-1" />
                                                    {formik.errors.consent}
                                                </div>
                                            )}
                                        </div>


                                        <button
                                            type="button"
                                            onClick={formik.handleSubmit}
                                            disabled={formik.isSubmitting}
                                            className="w-full sm:w-auto group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            <span className="flex items-center justify-center">
                                                {formik.isSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="group bg-white rounded-2xl shadow-lg shadow-gray-900/5 p-6 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300 border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Phone className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                                            <p className="text-gray-600">Ready to talk? Give us a call</p>
                                            <a href="tel:+12125556789" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                                                +1 212-555-6789
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="group bg-white rounded-2xl shadow-lg shadow-gray-900/5 p-6 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300 border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Mail className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                                            <p className="text-gray-600">Send us an email anytime</p>
                                            <a href="mailto:contact@example.com" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                                                contact@example.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="group bg-white rounded-2xl shadow-lg shadow-gray-900/5 p-6 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300 border border-gray-100">
                                    <div className="flex items-start">
                                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                            <MapPin className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                                            <p className="text-gray-600">Come say hello at our office</p>
                                            <div className="text-purple-600 font-semibold">
                                                <div>3949 State Route 38B,</div>
                                                <div>Newark Valley, NY 13811, USA</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="group bg-white rounded-2xl shadow-lg shadow-gray-900/5 p-6 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300 border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Clock className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                                            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                            <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                                <p className="text-gray-300 mb-6">Stay connected with us on social media</p>

                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                                        aria-label="Facebook"
                                    >
                                        <Facebook className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                                    </a>
                                    <a
                                        href="#"
                                        className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-sky-500 transition-all duration-300 hover:scale-110"
                                        aria-label="Twitter"
                                    >
                                        <Twitter className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                                    </a>
                                    <a
                                        href="#"
                                        className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110"
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                                    </a>
                                    <a
                                        href="#"
                                        className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110"
                                        aria-label="Music Platform"
                                    >
                                        <Music className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactSection;