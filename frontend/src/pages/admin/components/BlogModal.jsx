// /src/pages/Admin/components/BlogModal.jsx
import React, { useState, useEffect } from 'react';

const BlogModal = ({ isOpen, onClose, onSubmit, initialData, isLoading, categories }) => { // Receive categories prop
    const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '', category: '' });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    title: initialData.title || '',
                    content: initialData.content || '',
                    imageUrl: initialData.imageUrl || '',
                    // When editing, initialData.category will be an object. We need its _id.
                    category: initialData.category?._id || '',
                });
            } else {
                setFormData({ title: '', content: '', imageUrl: '', category: '' });
            }
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure category is sent as an ObjectId (string)
        onSubmit({ ...formData, category: formData.category });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{initialData ? 'Bloqu Yenilə' : 'Yeni Blog Əlavə Et'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Başlıq</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Məzmun</label>
                        <textarea
                            name="content"
                            id="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="5"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Şəkil URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            id="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    {/* Category Selection */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kateqoriya</label>
                        <select
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        >
                            <option value="">Kateqoriya seçin</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Ləğv Et</button>
                        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
                            {isLoading ? 'Yaddaşda saxlanılır...' : 'Yadda Saxla'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogModal;