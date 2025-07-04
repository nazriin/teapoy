// ProductDetail.jsx
import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useGetProductByIdQuery, useGetAllProductsQuery } from '../../../services/productApi'; // Import useGetAllProductsQuery
import {Eye, ShoppingCart, Star} from 'lucide-react';

const ProductDetail = () => {
    const { productId } = useParams(); // Get product ID from URL
    const { data: product, isLoading, isError } = useGetProductByIdQuery(productId); // Fetch current product details

    // Fetch related products based on the current product's category
    const {
        data: relatedProducts,
        isLoading: isLoadingRelated,
        isError: isErrorRelated
    } = useGetAllProductsQuery(product?.category?._id, {
        skip: !product?.category?._id, // Skip fetching if category ID is not available yet
    });

    if (isLoading) {
        return <div className="text-center py-20 text-lg text-gray-800 dark:text-gray-200">Məhsul detalları yüklənir...</div>;
    }

    if (isError) {
        return <div className="text-center py-20 text-red-600 dark:text-red-400 text-lg">Məhsul tapıla bilmədi və ya xəta baş verdi.</div>;
    }

    if (!product) {
        return <div className="text-center py-20 text-gray-600 dark:text-gray-300 text-lg">Məhsul mövcud deyil.</div>;
    }

    // Filter out the current product from related products and take a few
    const filteredRelatedProducts = relatedProducts
        ? relatedProducts.filter(p => p._id !== product._id).slice(0, 4) // Show up to 4 related products
        : [];

    return (
        <section className="container mx-auto px-4 py-8 md:py-12 bg-[#FCF2EF] dark:bg-[#111827] transition-colors duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl overflow-hidden md:flex border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                {/* Product Image Section */}
                <div className="md:w-1/2 p-4 flex justify-center items-center">
                    <img
                        src={product.imageUrl || "https://via.placeholder.com/600x400"}
                        alt={product.name}
                        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Product Details Section */}
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-3 transition-colors duration-300">{product.name}</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">
                            Category: <span className="font-semibold text-rose-700 dark:text-rose-400 transition-colors duration-300">{product.category?.name || 'Kateqoriyasız'}</span>
                        </p>
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < (product.rating || 4) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'} transition-colors duration-300`}
                                    fill={`${i < (product.rating || 4) ? 'currentColor' : 'none'}`}
                                />
                            ))}
                            <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">({product.reviewsCount || 0} reviews)</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 transition-colors duration-300">
                            {product.description || "Bu məhsul haqqında ətraflı məlumat yoxdur."}
                        </p>

                        <div className="flex items-baseline mb-6">
                            <p className="text-4xl font-extrabold text-rose-800 dark:text-rose-400 mr-3 transition-colors duration-300">${product.price.toFixed(2)}</p>
                            {product.oldPrice && (
                                <p className="text-xl text-gray-500 dark:text-gray-400 line-through transition-colors duration-300">${product.oldPrice.toFixed(2)}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">Stock:</p>
                            {product.stock > 0 ? (
                                <span className="text-green-600 dark:text-green-400 font-medium transition-colors duration-300">In stock ({product.stock} pieces)</span>
                            ) : (
                                <span className="text-red-600 dark:text-red-400 font-medium transition-colors duration-300">Anbarda yoxdur</span>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 md:mt-0">
                        <button
                            className="w-full bg-rose-600 dark:bg-rose-700 text-white py-3 px-6 rounded-lg text-lg font-semibold flex items-center justify-center hover:bg-rose-700 dark:hover:bg-rose-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:ring-opacity-50"
                            disabled={product.stock === 0}
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {filteredRelatedProducts.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 transition-colors duration-300">Related products</h2>
                    {isLoadingRelated ? (
                        <div className="text-center text-gray-600 dark:text-gray-300 transition-colors duration-300">Related products are loading...</div>
                    ) : isErrorRelated ? (
                        <div className="text-center text-red-600 dark:text-red-400 transition-colors duration-300">Error loading related products.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredRelatedProducts.map((p) => (
                                <div key={p._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col relative group border border-gray-200 dark:border-gray-700">
                                    <Link to={`/product/${p._id}`} className="block">
                                        <img
                                            src={p.imageUrl || "https://via.placeholder.com/300"}
                                            alt={p.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute inset-x-0 top-0 h-48 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Eye className="w-10 h-10 text-white" />
                                        </div>
                                    </Link>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate transition-colors duration-300" title={p.name}>{p.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">{p.category?.name || 'Kateqoriyasız'}</p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 h-10 overflow-hidden flex-grow transition-colors duration-300">{p.description}</p>
                                        <div className="flex justify-between items-center mt-auto pt-2">
                                            <p className="text-xl font-bold text-rose-700 dark:text-rose-400 transition-colors duration-300">${p.price.toFixed(2)}</p>
                                            <button className="bg-rose-600 dark:bg-rose-700 text-white px-3 py-1 rounded-full text-sm hover:bg-rose-700 dark:hover:bg-rose-800 transition-colors duration-300">Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default ProductDetail;