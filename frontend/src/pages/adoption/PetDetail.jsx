// PetDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPetByIdQuery } from '../../services/petApi'; // Adjust path as needed
import { PawPrint, Calendar, Heart, MessageCircle } from 'lucide-react'; // Example icons
import AdoptionInquiryForm from './AdoptionInquiryForm'; // New component for the form

const PetDetail = () => {
    const { petId } = useParams(); // Get pet ID from URL
    const { data: pet, isLoading, isError } = useGetPetByIdQuery(petId); // Fetch current pet details
    const [showInquiryForm, setShowInquiryForm] = useState(false); // State to control pop-up visibility

    if (isLoading) {
        return <div className="text-center py-20 text-lg">Pet details are loading...</div>;
    }

    if (isError) {
        return <div className="text-center py-20 text-red-600 text-lg">Pet not found or an error occurred.</div>;
    }

    if (!pet) {
        return <div className="text-center py-20 text-gray-600 text-lg">Pet not available.</div>;
    }

    const handleInquireClick = () => {
        setShowInquiryForm(true);
    };

    const handleCloseForm = () => {
        setShowInquiryForm(false);
    };

    return (
        <section className="container mx-auto px-4 py-8 md:py-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
                {/* Pet Image Section */}
                <div className="md:w-1/2 p-4 flex justify-center items-center">
                    <img
                        src={pet.image || "https://via.placeholder.com/600x400/EEE/31343C?text=No+Image"}
                        alt={pet.name}
                        className="w-full h-auto max-h-96 object-contain rounded-lg"
                    />
                </div>

                {/* Pet Details Section */}
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{pet.name}</h1>
                        <div className="flex items-center text-gray-600 mb-4">
                            <PawPrint className="w-5 h-5 mr-2" />
                            {/* Display breed */}
                            <span className="text-lg font-medium">{pet.breed || 'Unknown Breed'}</span>
                            <Calendar className="w-5 h-5 ml-4 mr-2" />
                            {/* Display age */}
                            <span className="text-lg font-medium">{pet.age ? `${pet.age} years old` : 'Age unknown'}</span>
                        </div>

                        {pet.information && pet.information.length > 0 && (
                            <div className="mb-4">
                                <p className="text-lg font-semibold text-gray-700 mb-2">Key Information:</p>
                                <ul className="list-disc list-inside text-gray-600">
                                    {pet.information.map((info, index) => (
                                        <li key={index}>{info}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <p className="text-gray-700 leading-relaxed mb-6">
                            {pet.description || "No detailed description available for this pet."}
                        </p>

                        <div className="mb-6">
                            <p className="text-lg font-semibold text-gray-700">Status:</p>
                            {pet.isAdopted ? (
                                <span className="text-red-600 font-medium">Adopted</span>
                            ) : (
                                <span className="text-green-600 font-medium">Available for Adoption</span>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 md:mt-0">
                        <button
                            className="w-full bg-rose-600 text-white py-3 px-6 rounded-lg text-lg font-semibold flex items-center justify-center hover:bg-rose-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50"
                            onClick={handleInquireClick}
                            disabled={pet.isAdopted}
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            {pet.isAdopted ? "Already Adopted" : "Inquire to Adopt"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Adoption Inquiry Form Pop-up */}
            {showInquiryForm && (
                <AdoptionInquiryForm petName={pet.name} onClose={handleCloseForm} />
            )}
        </section>
    );
};

export default PetDetail;