// ServiceDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Cat, Scissors, Home, Heart, Bone, ArrowLeft, Check } from 'lucide-react';
import { useGetServiceByIdQuery } from '../../../services/servicesAPI.js';

// Mapping for icons
const iconMap = {
    Cat: Cat,
    Scissors: Scissors,
    Home: Home,
    Heart: Heart,
    Bone: Bone,
    // Add more mappings as needed
};

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();

    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array ensures this runs only once on mount

    const { data: service, isLoading, isError, error } = useGetServiceByIdQuery(serviceId);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-gray-800" style={{ backgroundColor: '#FCF2EF' }}>Loading service details...</div>;
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600" style={{ backgroundColor: '#FCF2EF' }}>
                Error loading service: {error.message || 'Service not found.'}
                <button onClick={() => navigate('/services')} className="ml-4 text-rose-600 hover:text-rose-700">Go Back</button>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-800" style={{ backgroundColor: '#FCF2EF' }}>
                Service not found.
                <button onClick={() => navigate('/services')} className="ml-4 text-rose-600 hover:text-rose-700">Go Back</button>
            </div>
        );
    }

    const CurrentIcon = iconMap[service.icon] || Bone;

    return (
        <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: '#FCF2EF' }}>
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 mb-8 text-rose-600 hover:text-rose-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 rounded-lg shadow-md">
                    {/* Left Column - Images */}
                    <div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="aspect-video rounded-2xl overflow-hidden">
                                <img
                                    src={service.gallery[0]}
                                    alt={service.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-video rounded-xl overflow-hidden">
                                    <img
                                        src={service.gallery[1]}
                                        alt={service.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="aspect-video rounded-xl overflow-hidden">
                                    <img
                                        src={service.gallery[2]}
                                        alt={service.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-rose-600 rounded-full text-white">
                                {CurrentIcon && <CurrentIcon className="w-12 h-12" />}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {service.name}
                                </h1>
                            </div>
                        </div>

                        <div className="mb-6">
                            <span className="text-2xl font-bold text-rose-600">
                                {service.price}
                            </span>
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {service.longDescription}
                        </p>

                        {/* Features */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                What's Included
                            </h3>
                            <ul className="space-y-3">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;