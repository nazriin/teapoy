import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAddProductMutation, useUpdateProductMutation } from '../../../services/productApi.js' ;


const ProductModal = ({ isOpen, onClose, product, categories = [], sellerId }) => {
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', stock: '', category: '', imageUrl: ''
    });
    const [errors, setErrors] = useState({});

    const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    useEffect(() => {
        if (isOpen) {
            if (product) {
                setFormData({
                    name: product.name || '',
                    description: product.description || '',
                    price: product.price || '',
                    stock: product.stock || '',
                    category: product.category?._id || '',
                    imageUrl: product.imageUrl || '',
                });
            } else {
                setFormData({ name: '', description: '', price: '', stock: '', category: '', imageUrl: '' });
            }
            setErrors({});
        }
    }, [product, isOpen]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.description.trim()) newErrors.description = 'Description is required.';
        if (isNaN(formData.price) || Number(formData.price) <= 0) newErrors.price = 'Price must be a positive number.';
        if (isNaN(formData.stock) || Number(formData.stock) < 0) newErrors.stock = 'Stock must be a non-negative number.';
        if (!formData.category) newErrors.category = 'Category is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            const newErrors = { ...errors };
            delete newErrors[name];
            setErrors(newErrors);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fix the errors in the form.");
            return;
        }

        const action = product ? updateProduct : addProduct;
        const payload = product ? { productId: product._id, ...formData } : { ...formData, seller: sellerId };

        try {
            await action(payload).unwrap();
            toast.success(`Product ${product ? 'updated' : 'added'} successfully!`);
            onClose();
        } catch (err) {
            toast.error(err.data?.message || `Failed to ${product ? 'update' : 'add'} product.`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-full overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{product ? 'Edit Product' : 'Add New Product'}</h3>
                        <button onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Form inputs are kept the same as in the original code */}
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={`w-full p-2.5 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" id="description" rows="3" value={formData.description} onChange={handleChange} className={`w-full p-2.5 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className={`w-full p-2.5 border rounded-lg ${errors.price ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                            </div>
                            <div>
                                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-700">Stock</label>
                                <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className={`w-full p-2.5 border rounded-lg ${errors.stock ? 'border-red-500' : 'border-gray-300'}`} />
                                {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                            <select name="category" id="category" value={formData.category} onChange={handleChange} className={`w-full p-2.5 border rounded-lg ${errors.category ? 'border-red-500' : 'border-gray-300'}`}>
                                <option value="">Select a category</option>
                                {categories?.data.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                            </select>
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                        </div>
                        <div>
                            <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-700">Image URL</label>
                            <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
                            <button type="submit" disabled={isAdding || isUpdating} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
                                {isAdding || isUpdating ? 'Saving...' : 'Save Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;