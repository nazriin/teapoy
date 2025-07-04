// Services.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cat, Scissors, Home, Heart, Bone } from 'lucide-react';
import { useGetAllServicesQuery } from '../../../services/servicesAPI.js';

// Mapping for icons
const iconMap = {
    Cat: Cat,
    Scissors: Scissors,
    Home: Home,
    Heart: Heart,
    Bone: Bone,
    // Add more mappings as needed
};

const PetServicesSection = () => {
    const navigate = useNavigate();
    const { data: services, isLoading, isError, error } = useGetAllServicesQuery();

    const handleViewMore = (serviceId) => {
        navigate(`/services/${serviceId}`);
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-gray-800 dark:text-gray-200">Loading services...</div>;
    }

    if (isError) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">Error loading services: {error.message}</div>;
    }

    return (
        <div className="min-h-screen transition-colors duration-300 bg-[#FCF2EF] dark:bg-gray-900">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center">
                            <Bone className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-rose-800 dark:text-rose-300">
                        OUR SERVICES
                    </h1>

                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                        Professional pet care services designed to keep your furry friends happy, healthy, and well-cared for.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services?.map((service) => {
                        const IconComponent = iconMap[service.icon] || Bone;
                        return (
                            <div
                                key={service._id}
                                className="group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 hover:bg-rose-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl"
                            >
                                {/* Icon */}
                                <div className="mb-6 text-rose-600 dark:text-rose-400">
                                    {IconComponent && <IconComponent className="w-12 h-12" />}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold mb-4 text-rose-800 dark:text-rose-300">
                                    {service.name}
                                </h3>

                                {/* Description */}
                                <p className="text-sm leading-relaxed mb-6 text-gray-600 dark:text-gray-400">
                                    {service.description}
                                </p>

                                {/* View More Button */}
                                <button
                                    onClick={() => handleViewMore(service._id)}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 font-semibold transition-all duration-300 group-hover:scale-105 border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 hover:bg-rose-600 dark:hover:bg-rose-400 hover:text-white dark:hover:text-gray-900"
                                >
                                    <span className="w-2 h-2 rounded-full bg-current"></span>
                                    VIEW MORE
                                </button>

                                {/* Decorative Elements */}
                                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10 bg-rose-600 dark:bg-rose-400"></div>
                                <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full opacity-5 bg-rose-600 dark:bg-rose-400"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Decorative Element */}
                <div className="flex justify-center mt-16">
                    <div className="w-32 h-2 rounded-full bg-rose-600 opacity-20 dark:bg-rose-400 dark:opacity-30"></div>
                </div>
            </div>
        </div>
    );
};

export default PetServicesSection;