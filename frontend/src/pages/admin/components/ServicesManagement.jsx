// components/ServicesManagement.jsx
import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react';
import {
    useGetAllServicesQuery,
    useAddServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} from '../../../services/servicesAPI.js';

// Modal Component
const EditServiceModal = ({ isOpen, onClose, formData, handleInputChange, handleUpdateService, editingServiceId }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl mx-4">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Service</h3>
                <form onSubmit={handleUpdateService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Service Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="icon"
                        placeholder="Service Icon (e.g., 'Cat', 'Scissors')"
                        value={formData.icon}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Short Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md md:col-span-2"
                        rows="2"
                        required
                    ></textarea>
                    <textarea
                        name="longDescription"
                        placeholder="Long Description"
                        value={formData.longDescription}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md md:col-span-2"
                        rows="4"
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="price"
                        placeholder="Price (e.g., $25/day)"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0"
                        max="5"
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        name="reviews"
                        placeholder="Number of Reviews"
                        value={formData.reviews}
                        onChange={handleInputChange}
                        min="0"
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="features"
                        placeholder="Features (comma-separated)"
                        value={formData.features}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md md:col-span-2"
                    />
                    <input
                        type="text"
                        name="gallery"
                        placeholder="Gallery Image URLs (comma-separated)"
                        value={formData.gallery}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md md:col-span-2"
                    />
                    <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            <Save className="w-5 h-5" /> Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center gap-2 px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
                        >
                            <XCircle className="w-5 h-5" /> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ServicesManagement = ({ showNotification }) => {
    const { data: services, isLoading, isError, error, refetch } = useGetAllServicesQuery();
    const [addService] = useAddServiceMutation();
    const [updateService] = useUpdateServiceMutation();
    const [deleteService] = useDeleteServiceMutation();

    const [isAdding, setIsAdding] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal
    const [editingServiceId, setEditingServiceId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        longDescription: '',
        price: '',
        rating: 0,
        reviews: 0,
        features: '', // Comma-separated string for input
        gallery: '',  // Comma-separated string for input
        icon: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        try {
            const serviceData = {
                ...formData,
                features: formData.features.split(',').map(f => f.trim()).filter(f => f),
                gallery: formData.gallery.split(',').map(g => g.trim()).filter(g => g),
                rating: parseFloat(formData.rating),
                reviews: parseInt(formData.reviews, 10),
            };
            await addService(serviceData).unwrap();
            showNotification('success', 'Service added successfully!');
            setIsAdding(false);
            setFormData({
                name: '',
                description: '',
                longDescription: '',
                price: '',
                rating: 0,
                reviews: 0,
                features: '',
                gallery: '',
                icon: '',
            });
            refetch();
        } catch (err) {
            showNotification('error', `Failed to add service: ${err.data?.message || err.error}`);
        }
    };

    const handleEditClick = (service) => {
        setEditingServiceId(service._id);
        setFormData({
            name: service.name,
            description: service.description,
            longDescription: service.longDescription,
            price: service.price,
            rating: service.rating,
            reviews: service.reviews,
            features: service.features.join(', '),
            gallery: service.gallery.join(', '),
            icon: service.icon,
        });
        setIsModalOpen(true); // Open the modal
    };

    const handleUpdateService = async (e) => {
        e.preventDefault();
        try {
            const serviceData = {
                id: editingServiceId,
                ...formData,
                features: formData.features.split(',').map(f => f.trim()).filter(f => f),
                gallery: formData.gallery.split(',').map(g => g.trim()).filter(g => g),
                rating: parseFloat(formData.rating),
                reviews: parseInt(formData.reviews, 10),
            };
            await updateService(serviceData).unwrap();
            showNotification('success', 'Service updated successfully!');
            setIsModalOpen(false); // Close modal on success
            setEditingServiceId(null);
            setFormData({
                name: '',
                description: '',
                longDescription: '',
                price: '',
                rating: 0,
                reviews: 0,
                features: '',
                gallery: '',
                icon: '',
            });
            refetch();
        } catch (err) {
            showNotification('error', `Failed to update service: ${err.data?.message || err.error}`);
        }
    };

    const handleDeleteService = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(id).unwrap();
                showNotification('success', 'Service deleted successfully!');
                refetch();
            } catch (err) {
                showNotification('error', `Failed to delete service: ${err.data?.message || err.error}`);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingServiceId(null); // Clear editing state
        setFormData({ // Reset form data
            name: '',
            description: '',
            longDescription: '',
            price: '',
            rating: 0,
            reviews: 0,
            features: '',
            gallery: '',
            icon: '',
        });
    };

    if (isLoading) return <div className="text-center py-8">Loading services...</div>;
    if (isError) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Services Management</h2>

            {/* Add New Service Form */}
            <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-4"
                >
                    <PlusCircle className="w-5 h-5" />
                    {isAdding ? 'Cancel Add Service' : 'Add New Service'}
                </button>

                {isAdding && (
                    <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Service Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <input
                            type="text"
                            name="icon"
                            placeholder="Service Icon (e.g., 'Cat', 'Scissors')"
                            value={formData.icon}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Short Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md md:col-span-2"
                            rows="2"
                            required
                        ></textarea>
                        <textarea
                            name="longDescription"
                            placeholder="Long Description"
                            value={formData.longDescription}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md md:col-span-2"
                            rows="4"
                            required
                        ></textarea>
                        <input
                            type="text"
                            name="price"
                            placeholder="Price (e.g., $25/day)"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="number"
                            name="rating"
                            placeholder="Rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            step="0.1"
                            min="0"
                            max="5"
                            className="p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="number"
                            name="reviews"
                            placeholder="Number of Reviews"
                            value={formData.reviews}
                            onChange={handleInputChange}
                            min="0"
                            className="p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            name="features"
                            placeholder="Features (comma-separated)"
                            value={formData.features}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md md:col-span-2"
                        />
                        <input
                            type="text"
                            name="gallery"
                            placeholder="Gallery Image URLs (comma-separated)"
                            value={formData.gallery}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md md:col-span-2"
                        />
                        <div className="md:col-span-2 flex justify-end gap-2">
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                <Save className="w-5 h-5" /> Add Service
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="flex items-center gap-2 px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
                            >
                                <XCircle className="w-5 h-5" /> Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Services List */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                    <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6">Icon</th>
                        <th className="py-3 px-6">Description</th>
                        <th className="py-3 px-6">Price</th>
                        <th className="py-3 px-6">Rating</th>
                        <th className="py-3 px-6">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                    {services.map((service) => (
                        <tr key={service._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-6">{service.name}</td>
                            <td className="py-3 px-6">{service.icon}</td>
                            <td className="py-3 px-6">{service.description}</td>
                            <td className="py-3 px-6">{service.price}</td>
                            <td className="py-3 px-6">{service.rating}</td>
                            <td className="py-3 px-6 flex items-center space-x-2">
                                <button
                                    onClick={() => handleEditClick(service)}
                                    className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                                >
                                    <Edit className="w-4 h-4" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteService(service._id)}
                                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Service Modal */}
            <EditServiceModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                formData={formData}
                handleInputChange={handleInputChange}
                handleUpdateService={handleUpdateService}
                editingServiceId={editingServiceId}
            />
        </div>
    );
};

export default ServicesManagement;