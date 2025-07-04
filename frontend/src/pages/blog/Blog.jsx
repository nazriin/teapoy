// src/pages/blog/Blog.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal, LayoutGrid, List, Search, Eye } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useGetBlogsQuery } from "../../services/blogApi";
import { useGetBlogCategoriesQuery } from "../../services/blogCategoryApi";

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [layout, setLayout] = useState("grid"); // Default layout

    // Debounce search term
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    // Fetch blogs and categories
    const { data: blogsData, isLoading: isLoadingBlogs, isError: isErrorBlogs } = useGetBlogsQuery();
    const { data: categoriesData, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetBlogCategoriesQuery();

    const allBlogs = blogsData?.data || [];
    const categories = categoriesData?.data || [];

    const filteredBlogs = allBlogs.filter(blog => {
        const matchesCategory = selectedCategory === null || blog.category?._id === selectedCategory;
        const matchesSearch = debouncedSearchTerm === "" || blog.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || blog.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (isLoadingBlogs || isLoadingCategories) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-semibold">Loading blogs...</div>
            </div>
        );
    }

    if (isErrorBlogs || isErrorCategories) {
        console.error("Blogs Error:", isErrorBlogs);
        console.error("Categories Error:", isErrorCategories);
        return (
            <div className="flex justify-center items-center h-screen text-red-600">
                Error loading blog data. Please try again later.
            </div>
        );
    }

    const getBlogCount = (categoryId) => {
        if (!blogsData) return 0;
        return blogsData.data.filter(blog => blog.category?._id === categoryId).length;
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <ToastContainer />

            {/* Breadcrumbs */}
            <nav className="text-gray-600 mb-6">
                <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center">
                        <Link to="/" className="text-purple-600 hover:text-purple-800">Home</Link>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-gray-800">Blog</span>
                    </li>
                </ol>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
                    {/* Categories Filter */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 flex items-center">
                            Categories
                        </h3>
                        <ul>
                            <li className="mb-2">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`text-left w-full py-1 px-3 rounded-md transition-colors ${selectedCategory === null ? "bg-purple-100 text-purple-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}
                                >
                                    Show all ({allBlogs.length})
                                </button>
                            </li>
                            {categories.map((category) => (
                                <li key={category._id} className="mb-2">
                                    <button
                                        onClick={() => setSelectedCategory(category._id)}
                                        className={`text-left w-full flex justify-between items-center py-1 px-3 rounded-md transition-colors ${selectedCategory === category._id ? "bg-purple-100 text-purple-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}
                                    >
                                        {category.name} ({getBlogCount(category._id)})
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-full lg:w-3/4">
                    {/* Top Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-md">
                        <p className="text-gray-700 mb-4 sm:mb-0">
                            Showing {filteredBlogs.length} of {allBlogs.length} results
                        </p>
                        <div className="flex items-center space-x-4">
                            {/* Search Bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search blogs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>

                            {/* Layout Toggles */}
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setLayout("grid")}
                                    className={`p-2 rounded-md ${layout === "grid" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                                    title="Grid View"
                                >
                                    <LayoutGrid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setLayout("list")}
                                    className={`p-2 rounded-md ${layout === "list" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                                    title="List View"
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Blog Listing */}
                    {filteredBlogs.length > 0 ? (
                        <div className={`${layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-6"}`}>
                            {filteredBlogs.map((blog) => (
                                <div key={blog._id} className={`${layout === "grid" ? "bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col relative group" : "bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row items-center relative group"}`}>
                                    <Link to={`/blog/${blog._id}`} className={`${layout === "grid" ? "block" : "w-full sm:w-1/3 flex-shrink-0"}`}>
                                        <img
                                            src={blog.imageUrl || "https://via.placeholder.com/400x250"}
                                            alt={blog.title}
                                            className={`${layout === "grid" ? "w-full h-48 object-cover" : "w-full h-48 sm:h-auto sm:w-48 object-cover"}`}
                                        />
                                        <div className="absolute inset-x-0 top-0 h-48 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Eye className="w-10 h-10 text-white" />
                                        </div>
                                    </Link>
                                    <div className={`${layout === "grid" ? "p-4 flex flex-col flex-grow" : "p-4 flex flex-col flex-grow w-full sm:w-2/3"}`}>
                                        <h3 className="text-lg font-semibold text-gray-800 truncate" title={blog.title}>{blog.title}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{blog.category?.name || 'Uncategorized'}</p>
                                        {layout === "list" && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.content}</p>}
                                        <div className="flex justify-between items-center mt-auto pt-2">
                                            <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
                                            <Link to={`/blog/${blog._id}`} className="px-3 py-1 rounded-full text-sm bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl text-gray-600">No blogs found.</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
                            <div className="mt-4 text-sm text-gray-400">
                                <p>Total blogs available: {allBlogs.length}</p>
                                <p>Current search: "{debouncedSearchTerm}"</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Blog;