// Favorites.jsx

import React, { useState } from "react";
import { useGetCategoriesQuery } from "../../../services/categoryApi";
import { useGetAllProductsQuery } from "../../../services/productApi";
import { Bone, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PetsFavourites = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery({ page: 1, limit: 20 });
    const { data: products, isLoading: isLoadingProducts } = useGetAllProductsQuery(selectedCategory);

    const categories = categoriesData?.data || [];

    if (isLoadingCategories || isLoadingProducts) {
        return <div className="text-center py-20 dark:text-gray-200">Yüklənir...</div>;
    }

    const handleAddToCartClick = () => {
        navigate("/signup");
    };

    return (
        // 1. BÜTÜN SƏHİFƏNİ ƏHATƏ EDƏN XARİCİ WRAPPER
        // Bu div arxa fon rəngini bütün enə tətbiq edir.
        <div className="min-h-screen bg-[#FCF2EF] dark:bg-gray-900">
            {/* 2. KÖHNƏ SECTİON İNDİ DAXİLİ CONTENT ÜÇÜNDÜR (ARXA FON RƏNGİ SİLİNİB) */}
            {/* Bu section isə contenti ortalayır və ölçüsünü məhdudlaşdırır. */}
            <section className="w-full px-4 py-10 max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-6">
                    <Bone className="w-8 h-8 text-rose-600 dark:text-rose-400 mb-2" />
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100">Pets favourites</h2>
                </div>

                {/* Kateqoriya filtr düymələri */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm ${selectedCategory === null ? "bg-rose-600 text-white shadow-md" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
                    >
                        Show all
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category._id}
                            onClick={() => setSelectedCategory(category._id)}
                            className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm ${selectedCategory === category._id ? "bg-rose-600 text-white shadow-md" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Məhsulların siyahısı */}
                {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col relative group">
                                <Link to={`/product/${product._id}`} className="block">
                                    <img
                                        src={product.imageUrl || "https://via.placeholder.com/300"}
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-x-0 top-0 h-48 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Eye className="w-10 h-10 text-white" />
                                    </div>
                                </Link>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate" title={product.name}>{product.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.category?.name || 'Kateqoriyasız'}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 h-10 overflow-hidden flex-grow">{product.description}</p>
                                    <div className="flex justify-between items-center mt-auto pt-2">
                                        <p className="text-xl font-bold text-rose-700 dark:text-rose-500">${product.price.toFixed(2)}</p>
                                        <button
                                            onClick={handleAddToCartClick}
                                            className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm hover:bg-rose-700 transition-colors"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-xl text-gray-600 dark:text-gray-300">Məhsul tapılmadı.</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Bu kateqoriyada hələ heç bir məhsul yoxdur.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default PetsFavourites;