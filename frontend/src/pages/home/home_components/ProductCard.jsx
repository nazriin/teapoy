// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{product.description || 'No description available'}</p>
        </div>
    );
};

export default ProductCard;