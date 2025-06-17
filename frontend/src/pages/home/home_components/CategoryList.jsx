
import React from 'react';
import CategoryCard from './CategoryCard';

const CategoryList = ({ categories, onCategoryClick }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => (
                <CategoryCard
                    key={category._id}
                    category={category}
                    onClick={() => onCategoryClick(category._id)}
                />
            ))}
        </div>
    );
};

export default CategoryList;