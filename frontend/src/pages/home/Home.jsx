import React, { useState, useEffect } from 'react';
import CategoryList from './home_components/CategoryList';
import ProductList from './home_components/ProductList';

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Fetch products when a category is clicked (Bonus)
    const handleCategoryClick = async (categoryId) => {
        setSelectedCategory(categoryId);
        try {
            const response = await fetch(`http://localhost:5000/api/products/category/${categoryId}`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Shop by Category</h1>
            <CategoryList categories={categories} onCategoryClick={handleCategoryClick} />
            {selectedCategory && <ProductList products={products} />}
        </div>
    );
};

export default HomePage;