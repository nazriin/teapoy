// src/pages/shop/Shop.jsx
import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/categoryApi";
import { useGetAllProductsQuery } from "../../services/productApi";
import {
    SlidersHorizontal,
    ChevronDown,
    LayoutGrid,
    List,
    Search,
    Eye,
    Heart,
    ShoppingCart,
} from "lucide-react";
import { useAddItemToBasketMutation } from "../../services/basketApi";
import { useAddWishlistItemMutation } from "../../services/wishlistApi";
import { toast, ToastContainer } from "react-toastify";

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
    const [layout, setLayout] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Get userId from Outlet context (Provided by ProtectedRoute)
    const { userId } = useOutletContext() || {};

    // Debounce search term
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    const {
        data: categoriesData,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
    } = useGetCategoriesQuery({ page: 1, limit: 50 });
    const {
        data: productsData,
        isLoading: isLoadingProducts,
        isError: isErrorProducts,
    } = useGetAllProductsQuery();

    // Initialize the addItemToBasket mutation
    const [addItemToBasket, { isLoading: isAddingToBasket }] =
        useAddItemToBasketMutation();
    // Initialize the addWishlistItem mutation
    const [addWishlistItem, { isLoading: isAddingToWishlist }] =
        useAddWishlistItemMutation();

    const categories = categoriesData?.data || [];
    const allProducts = productsData || [];

    const filteredProducts = allProducts.filter((product) => {
        const matchesCategory =
            selectedCategory === null || product.category?._id === selectedCategory;
        const matchesPrice =
            product.price >= priceRange.min && product.price <= priceRange.max;
        const matchesSearch =
            debouncedSearchTerm === "" ||
            product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
    });

    // Function to handle adding product to cart
    const handleAddToCart = async (productId, productName) => {
        if (!userId) {
            toast.error("Please log in to add items to your basket.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try {
            await addItemToBasket({ productId, count: 1, userId }).unwrap();
            toast.success(`${productName} sepete eklendi!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error("Error adding to basket:", error);
            const errorMessage =
                error.data?.message || `"${productName}" sepete eklenirken hata oluştu.`;
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const handleAddToWishlist = async (productId, productName) => {
        if (!userId) {
            toast.error("Please log in to add items to your wishlist.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try {
            await addWishlistItem({ userId, productId }).unwrap();
            toast.success(`${productName} added to wishlist!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            const errorMessage =
                error.data?.message || `"${productName}" could not be added to wishlist.`;
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    if (isLoadingCategories || isLoadingProducts) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#FCF2EF] dark:bg-[#111827] transition-colors duration-300">
                <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">Loading...</div>
            </div>
        );
    }

    if (isErrorCategories || isErrorProducts) {
        console.error("Categories Error:", isErrorCategories);
        console.error("Products Error:", isErrorProducts);
        return (
            <div className="flex justify-center items-center h-screen text-red-600 bg-[#FCF2EF] dark:bg-[#111827] transition-colors duration-300">
                Error loading data. Please try again later.
            </div>
        );
    }

    const getProductCount = (categoryId) => {
        if (!productsData) return 0;
        return productsData.filter((product) => product.category?._id === categoryId)
            .length;
    };

    return (
        <section className="w-full px-4 py-10 bg-[#FCF2EF] dark:bg-[#111827] min-h-screen transition-colors duration-300">
            <ToastContainer />
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <nav className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <Link to="/" className="text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-200">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-gray-800 dark:text-gray-200">Shop</span>
                        </li>
                    </ol>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        {/* Price Filter */}
                        <div className="mb-8">
                            <h3 className="font-bold text-lg mb-4 flex items-center text-gray-800 dark:text-gray-200">
                                <SlidersHorizontal className="w-5 h-5 mr-2 text-rose-600 dark:text-rose-400" /> Price
                                filter
                            </h3>
                            <div className="flex items-center justify-between mb-2 text-gray-700 dark:text-gray-300">
                                <span>${priceRange.min}</span>
                                <span>${priceRange.max}</span>
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    Max Price: ${priceRange.max}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    value={priceRange.max}
                                    onChange={(e) =>
                                        setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))
                                    }
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    Min Price: ${priceRange.min}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    value={priceRange.min}
                                    onChange={(e) =>
                                        setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))
                                    }
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    console.log("Apply filter clicked");
                                }}
                                className="w-full bg-rose-600 dark:bg-rose-700 text-white py-2 rounded-md hover:bg-rose-700 dark:hover:bg-rose-800 transition-colors duration-300"
                            >
                                APPLY
                            </button>
                        </div>

                        {/* Categories Filter */}
                        <div>
                            <h3 className="font-bold text-lg mb-4 flex items-center text-gray-800 dark:text-gray-200">Categories</h3>
                            <ul>
                                <li className="mb-2">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`text-left w-full py-1 px-3 rounded-md transition-colors duration-300 ${
                                            selectedCategory === null
                                                ? "bg-rose-100 text-rose-700 font-semibold dark:bg-rose-800 dark:text-rose-100"
                                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                        }`}
                                    >
                                        Show all ({allProducts.length})
                                    </button>
                                </li>
                                {categories.map((category) => (
                                    <li key={category._id} className="mb-2">
                                        <button
                                            onClick={() => setSelectedCategory(category._id)}
                                            className={`text-left w-full flex justify-between items-center py-1 px-3 rounded-md transition-colors duration-300 ${
                                                selectedCategory === category._id
                                                    ? "bg-rose-100 text-rose-700 font-semibold dark:bg-rose-800 dark:text-rose-100"
                                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                            }`}
                                        >
                                            {category.name} ({getProductCount(category._id)})
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4">
                        {/* Top Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                            <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-0 transition-colors duration-300">
                                Showing {filteredProducts.length} of {allProducts.length} results
                            </p>
                            <div className="flex items-center space-x-4">
                                {/* Search Bar */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                                    />
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                                </div>

                                {/* Layout Toggles */}
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setLayout("grid")}
                                        className={`p-2 rounded-md transition-colors duration-300 ${
                                            layout === "grid"
                                                ? "bg-rose-600 text-white dark:bg-rose-700 dark:text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        }`}
                                        title="Grid View"
                                    >
                                        <LayoutGrid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setLayout("list")}
                                        className={`p-2 rounded-md transition-colors duration-300 ${
                                            layout === "list"
                                                ? "bg-rose-600 text-white dark:bg-rose-700 dark:text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        }`}
                                        title="List View"
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Listing */}
                        {filteredProducts.length > 0 ? (
                            <div
                                className={`${
                                    layout === "grid"
                                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                        : "flex flex-col gap-6"
                                }`}
                            >
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className={`${
                                            layout === "grid"
                                                ? "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col relative group border border-gray-200 dark:border-gray-700"
                                                : "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row items-center relative group border border-gray-200 dark:border-gray-700"
                                        } transition-colors duration-300`}
                                    >
                                        <Link
                                            to={`/product/${product._id}`}
                                            className={`${
                                                layout === "grid"
                                                    ? "block"
                                                    : "w-full sm:w-1/3 flex-shrink-0"
                                            }`}
                                        >
                                            <img
                                                src={
                                                    product.imageUrl ||
                                                    product.image ||
                                                    "https://via.placeholder.com/300"
                                                }
                                                alt={product.name}
                                                className={`${
                                                    layout === "grid"
                                                        ? "w-full h-48 object-cover"
                                                        : "w-full h-48 sm:h-auto sm:w-48 object-cover"
                                                }`}
                                            />
                                            <div className="absolute inset-x-0 top-0 h-48 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Eye className="w-10 h-10 text-white" />
                                            </div>
                                        </Link>
                                        <div
                                            className={`${
                                                layout === "grid"
                                                    ? "p-4 flex flex-col flex-grow"
                                                    : "p-4 flex flex-col flex-grow w-full sm:w-2/3"
                                            }`}
                                        >
                                            <h3
                                                className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate"
                                                title={product.name}
                                            >
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                {product.category?.name || "Uncategorized"}
                                            </p>
                                            {layout === "list" && (
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                                    {product.description}
                                                </p>
                                            )}
                                            <div className="flex justify-between items-center mt-auto pt-2">
                                                <p className="text-xl font-bold text-rose-700 dark:text-rose-400">
                                                    ${product.price?.toFixed(2) || "N/A"}
                                                </p>
                                                <div className="flex space-x-2">
                                                    {/* Cart Button with Icon Only */}
                                                    <button
                                                        onClick={() => handleAddToCart(product._id, product.name)}
                                                        className={`p-2 rounded-full text-sm transition-colors duration-300 ${
                                                            userId
                                                                ? "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
                                                                : "bg-gray-400 text-gray-200 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                                                        }`}
                                                        disabled={!userId || isAddingToBasket}
                                                        title={isAddingToBasket ? "Adding to cart..." : "Add to Cart"}
                                                    >
                                                        {isAddingToBasket ? (
                                                            <span className="text-xs">...</span>
                                                        ) : (
                                                            <ShoppingCart className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    {/* Wishlist Button with Icon Only */}
                                                    <button
                                                        onClick={() => handleAddToWishlist(product._id, product.name)}
                                                        className={`p-2 rounded-full text-sm transition-colors duration-300 ${
                                                            userId
                                                                ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                                                                : "bg-gray-400 text-gray-200 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                                                        }`}
                                                        disabled={!userId || isAddingToWishlist}
                                                        title={
                                                            isAddingToWishlist ? "Adding to wishlist..." : "Add to Wishlist"
                                                        }
                                                    >
                                                        {isAddingToWishlist ? (
                                                            <span className="text-xs">...</span>
                                                        ) : (
                                                            <Heart className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                                <h3 className="text-xl text-gray-600 dark:text-gray-300">No products found.</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">
                                    Try adjusting your filters or search term.
                                </p>
                                <div className="mt-4 text-sm text-gray-400 dark:text-gray-500">
                                    <p>Total products available: {allProducts.length}</p>
                                    <p>
                                        Current filters: Price ${priceRange.min}-${priceRange.max}, Search: "
                                        {debouncedSearchTerm}"
                                    </p>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
};

export default Shop;