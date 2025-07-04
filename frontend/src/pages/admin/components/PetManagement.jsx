// components/PetManagement.jsx
import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react';
import {
    useGetAllPetsQuery,
    useAddPetMutation,
    useUpdatePetMutation,
    useDeletePetMutation,
} from '../../../services/petAPI.js'; // Adjust path as per your project structure

// Modal Component for Editing Pet
const EditPetModal = ({ isOpen, onClose, formData, handleInputChange, handleUpdatePet, editingPetId }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl mx-auto md:mx-4 animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Pet</h3>
                <form onSubmit={handleUpdatePet} className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Pet Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="breed"
                        placeholder="Breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    <input // Changed type to "text"
                        type="text"
                        name="age"
                        placeholder="Age (e.g., '2 years', '6 months')"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Pet Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isAdopted"
                            checked={formData.isAdopted || false}
                            onChange={handleInputChange}
                            id="isAdopted"
                            className="mr-2"
                        />
                        <label htmlFor="isAdopted" className="text-gray-700">Adopted</label>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        {formData.information && formData.information.map((info, index) => (
                            <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                                <span>{info}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newInfo = formData.information.filter((_, i) => i !== index);
                                        handleInputChange({ target: { name: 'information', value: newInfo } });
                                    }}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    <XCircle className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            placeholder="Add info..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                                    e.preventDefault();
                                    const newInfo = [...formData.information, e.target.value.trim()];
                                    handleInputChange({ target: { name: 'information', value: newInfo } });
                                    e.target.value = '';
                                }
                            }}
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 flex-grow"
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center gap-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                        >
                            <XCircle className="w-5 h-5" /> Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Save className="w-5 h-5" /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PetManagement = () => {
    const { data: pets, isLoading, isError, error, refetch } = useGetAllPetsQuery();
    const [addPet] = useAddPetMutation();
    const [updatePet] = useUpdatePetMutation();
    const [deletePet] = useDeletePetMutation();

    const [newPetFormData, setNewPetFormData] = useState({
        name: '',
        description: '',
        breed: '',
        age: '',   // Initialized as string
        image: '',
        information: [],
        isAdopted: false,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        breed: '',
        age: '',   // Initialized as string for edit modal
        image: '',
        information: [],
        isAdopted: false,
    });
    const [editingPetId, setEditingPetId] = useState(null);

    const handleNewPetInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPetFormData({
            ...newPetFormData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAddPet = async (e) => {
        e.preventDefault();
        try {
            await addPet(newPetFormData).unwrap();
            setNewPetFormData({
                name: '',
                description: '',
                breed: '',
                age: '', // Reset to empty string
                image: '',
                information: [],
                isAdopted: false,
            });
            refetch(); // Refetch data after adding
        } catch (err) {
            console.error('Failed to add pet:', err);
        }
    };

    const handleEditClick = (pet) => {
        setFormData({
            name: pet.name,
            description: pet.description,
            breed: pet.breed,
            age: pet.age,     // Set existing age as string
            image: pet.image,
            information: pet.information || [],
            isAdopted: pet.isAdopted || false,
        });
        setEditingPetId(pet._id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPetId(null);
        setFormData({
            name: '',
            description: '',
            breed: '',
            age: '', // Reset to empty string
            image: '',
            information: [],
            isAdopted: false,
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleUpdatePet = async (e) => {
        e.preventDefault();
        try {
            await updatePet({ id: editingPetId, ...formData }).unwrap();
            handleCloseModal();
            refetch(); // Refetch data after updating
        } catch (err) {
            console.error('Failed to update pet:', err);
        }
    };

    const handleDeletePet = async (id) => {
        if (window.confirm('Are you sure you want to delete this pet?')) {
            try {
                await deletePet(id).unwrap();
                refetch(); // Refetch data after deleting
            } catch (err) {
                console.error('Failed to delete pet:', err);
            }
        }
    };

    if (isLoading) {
        return <div className="text-center py-20 text-lg">Loading pets...</div>;
    }

    if (isError) {
        return <div className="text-center py-20 text-red-600 text-lg">Error loading pets: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Pet Management</h2>

            {/* Add New Pet Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Pet</h3>
                <form onSubmit={handleAddPet} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Pet Name"
                        value={newPetFormData.name}
                        onChange={handleNewPetInputChange}
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="breed"
                        placeholder="Breed"
                        value={newPetFormData.breed}
                        onChange={handleNewPetInputChange}
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    <input // Changed type to "text"
                        type="text"
                        name="age"
                        placeholder="Age (e.g., '2 years', '6 months')"
                        value={newPetFormData.age}
                        onChange={handleNewPetInputChange}
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL (optional)"
                        value={newPetFormData.image}
                        onChange={handleNewPetInputChange}
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newPetFormData.description}
                        onChange={handleNewPetInputChange}
                        rows="3"
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 col-span-1 md:col-span-2"
                        required
                    ></textarea>
                    <div className="flex items-center col-span-1 md:col-span-2">
                        <input
                            type="checkbox"
                            name="isAdopted"
                            checked={newPetFormData.isAdopted}
                            onChange={handleNewPetInputChange}
                            id="newIsAdopted"
                            className="mr-2"
                        />
                        <label htmlFor="newIsAdopted" className="text-gray-700">Adopted</label>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex flex-wrap items-center gap-2">
                        {newPetFormData.information.map((info, index) => (
                            <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                                <span>{info}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newInfo = newPetFormData.information.filter((_, i) => i !== index);
                                        setNewPetFormData({ ...newPetFormData, information: newInfo });
                                    }}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    <XCircle className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            placeholder="Add information (e.g., 'Vaccinated', 'Friendly')... Press Enter to add."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                                    e.preventDefault();
                                    setNewPetFormData({
                                        ...newPetFormData,
                                        information: [...newPetFormData.information, e.target.value.trim()],
                                    });
                                    e.target.value = '';
                                }
                            }}
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 flex-grow"
                        />
                    </div>
                    <button
                        type="submit"
                        className="col-span-1 md:col-span-2 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <PlusCircle className="w-5 h-5" /> Add Pet
                    </button>
                </form>
            </div>

            {/* Pets List */}
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Pets</h3>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Breed
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Age
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {pets.map((pet) => (
                        <tr key={pet._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{pet.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{pet.breed || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{pet.age || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 truncate max-w-xs">{pet.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pet.isAdopted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {pet.isAdopted ? 'Adopted' : 'Available'}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => handleEditClick(pet)}
                                        className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-xs sm:text-sm w-full sm:w-auto justify-center"
                                    >
                                        <Edit className="w-4 h-4" /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeletePet(pet._id)}
                                        className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-xs sm:text-sm w-full sm:w-auto justify-center"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Pet Modal */}
            <EditPetModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                formData={formData}
                handleInputChange={handleInputChange}
                handleUpdatePet={handleUpdatePet}
                editingPetId={editingPetId}
            />
        </div>
    );
};

export default PetManagement;