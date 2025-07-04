import React from 'react';
import { toast } from 'react-toastify';
import { useDeleteProductMutation } from '../../../services/productApi.js';

const ProductCard = ({ product, onEdit }) => {
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(product._id).unwrap();
                toast.success("Product deleted successfully!");
            } catch (err) {
                toast.error(err.data?.message || "Failed to delete product.");
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/EEE/31343C?text=No+Image' }}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.category?.name || 'Uncategorized'}</p>
                <p className="text-gray-600 mt-2 text-sm truncate">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                    <p className="text-sm font-medium text-gray-700">Stock: {product.stock}</p>
                </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
                <button onClick={() => onEdit(product)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
                <button onClick={handleDelete} disabled={isDeleting} className="text-sm font-medium text-red-600 hover:text-red-800 disabled:text-gray-400">
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;