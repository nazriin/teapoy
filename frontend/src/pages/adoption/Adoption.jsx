// Adoption.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllPetsQuery } from '../../services/petApi';
import { Bone, Eye } from 'lucide-react';

const Adoption = ({ theme }) => {
    const { data: pets, isLoading, isError } = useGetAllPetsQuery();

    if (isLoading) {
        return (
            <div className="text-center py-20 text-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#111827] min-h-screen flex items-center justify-center transition-colors duration-300">
                Pets are loading...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-20 text-red-600 dark:text-red-400 text-lg bg-gray-50 dark:bg-[#111827] min-h-screen flex items-center justify-center transition-colors duration-300">
                Error loading pets.
            </div>
        );
    }

    if (!pets || pets.length === 0) {
        return (
            <div className="text-center py-20 text-gray-600 dark:text-gray-300 text-lg bg-gray-50 dark:bg-[#111827] min-h-screen flex items-center justify-center transition-colors duration-300">
                <div>
                    <h3 className="text-xl text-gray-600 dark:text-gray-300">No pets available for adoption at the moment.</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Please check back later!</p>
                </div>
            </div>
        );
    }

    return (
        <section className="w-full px-4 py-10 bg-[#FCF2EF] dark:bg-[#111827] min-h-screen transition-colors duration-300">
            {/* This div will now be centered and constrain the content */}
            <div className="max-w-7xl mx-auto"> {/* Added max-w-7xl and mx-auto */}
                <div className="flex flex-col items-center mb-6">
                    <Bone className="w-8 h-8 text-rose-600 dark:text-rose-400 mb-2 transition-colors duration-300" />
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white text-center mb-4 transition-colors duration-300">
                        Find Your New Best Friend
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl transition-colors duration-300">
                        Browse through our adorable pets currently looking for their forever homes. Each one is waiting to bring joy and companionship into your life.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pets.map((pet) => (
                        <div key={pet._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
                            <Link to={`/pet/${pet._id}`} className="block relative h-48 w-full overflow-hidden">
                                <img
                                    src={pet.image || "https://via.placeholder.com/600x400/EEE/31343C?text=No+Image"}
                                    alt={pet.name}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <Eye className="w-10 h-10 text-white" />
                                </div>
                            </Link>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate transition-colors duration-300" title={pet.name}>
                                    {pet.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize transition-colors duration-300">
                                    {pet.breed || 'Unknown Breed'}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 h-10 overflow-hidden flex-grow transition-colors duration-300">
                                    {pet.description || "No description available."}
                                </p>
                                <div className="flex justify-between items-center mt-auto pt-2">
                                    <span className="text-md font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                                        {pet.age ? `${pet.age} years old` : 'Age unknown'}
                                    </span>
                                    <Link
                                        to={`/pet/${pet._id}`}
                                        className="bg-rose-600 dark:bg-rose-700 text-white px-3 py-1 rounded-full text-sm hover:bg-rose-700 dark:hover:bg-rose-800 transition-colors duration-300"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Adoption;