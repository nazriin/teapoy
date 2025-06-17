// src/components/ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            {products.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;