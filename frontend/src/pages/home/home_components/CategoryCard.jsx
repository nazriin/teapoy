// src/components/CategoryCard.jsx
import React from 'react';

const CategoryCard = ({ category, onClick }) => {
    return (
        <div
            className="border rounded-lg p-4 shadow-md hover:shadow-lg cursor-pointer transition"
            onClick={onClick}
        >
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <p className="text-gray-600">{category.description || 'Explore products in this category'}</p>
        </div>
    );
};

export default CategoryCard;