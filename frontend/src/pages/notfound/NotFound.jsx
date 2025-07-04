import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-16 h-16 border-2 border-orange-800 rounded-lg transform rotate-12"></div>
                <div className="absolute top-20 right-20 w-12 h-12 border-2 border-orange-800 rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-8 h-8 border-2 border-orange-800 transform rotate-45"></div>
                <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-orange-800 rounded-lg transform -rotate-12"></div>
                <div className="absolute top-1/2 left-1/4 w-6 h-6 border-2 border-orange-800 rounded-full"></div>
                <div className="absolute top-1/3 right-1/3 w-10 h-10 border-2 border-orange-800 transform rotate-45"></div>
            </div>

            {/* Main Content */}
            <div className="text-center z-10 max-w-2xl mx-auto">
                {/* Header Text */}
                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
                    Oops! That Page Can't Be Found.
                </h1>

                <p className="text-white text-lg md:text-xl mb-8 opacity-90 drop-shadow-md">
                    Page doesn't exist or some other error occurred.
                </p>

                {/* 404 Cat Animation */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        {/* Laptop/Computer */}
                        <div className="bg-yellow-400 rounded-lg p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            <div className="bg-white rounded-t-lg p-4 mb-2">
                                <div className="flex items-center justify-center">
                                    <div className="text-orange-500 text-6xl md:text-8xl font-bold">404</div>
                                </div>
                                <div className="text-orange-500 text-xl md:text-2xl font-bold text-center mt-2">
                                    ERROR
                                </div>
                            </div>
                            <div className="bg-yellow-500 rounded-b-lg h-4"></div>
                        </div>

                        {/* Angry Cat */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <div className="relative">
                                {/* Cat Body */}
                                <div className="w-16 h-16 bg-purple-800 rounded-full relative">
                                    {/* Cat Ears */}
                                    <div className="absolute -top-3 left-2 w-4 h-6 bg-purple-800 rounded-t-full transform -rotate-12"></div>
                                    <div className="absolute -top-3 right-2 w-4 h-6 bg-purple-800 rounded-t-full transform rotate-12"></div>
                                    <div className="absolute -top-2 left-3 w-2 h-3 bg-red-600 rounded-t-full transform -rotate-12"></div>
                                    <div className="absolute -top-2 right-3 w-2 h-3 bg-red-600 rounded-t-full transform rotate-12"></div>

                                    {/* Cat Eyes */}
                                    <div className="absolute top-4 left-3 w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="absolute top-4 right-3 w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-black rounded-full"></div>
                                    <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-black rounded-full"></div>

                                    {/* Cat Nose */}
                                    <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full"></div>

                                    {/* Cat Mouth */}
                                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-b-full"></div>

                                    {/* Cat Whiskers */}
                                    <div className="absolute top-7 left-1 w-3 h-0.5 bg-gray-800 rounded-full"></div>
                                    <div className="absolute top-7 right-1 w-3 h-0.5 bg-gray-800 rounded-full"></div>

                                    {/* Cat Paws */}
                                    <div className="absolute -bottom-2 left-2 w-3 h-3 bg-teal-400 rounded-full"></div>
                                    <div className="absolute -bottom-2 right-2 w-3 h-3 bg-teal-400 rounded-full"></div>
                                </div>

                                {/* Anger Steam */}
                                <div className="absolute -top-8 left-1 animate-pulse">
                                    <div className="w-2 h-6 bg-purple-600 rounded-full transform rotate-12 opacity-70"></div>
                                </div>
                                <div className="absolute -top-6 right-1 animate-pulse" style={{ animationDelay: '0.5s' }}>
                                    <div className="w-2 h-4 bg-purple-600 rounded-full transform -rotate-12 opacity-70"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <Home size={20} />
                        Home Page
                    </button>
                </div>

                {/* Additional Help Text */}
                <div className="mt-8 text-white opacity-80">
                    <p className="text-sm md:text-base">
                        The page you're looking for might have been moved, deleted, or doesn't exist.
                    </p>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-8 h-8 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-32 right-16 w-12 h-12 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-8 w-6 h-6 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-10 h-10 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
    );
}