const toggleDarkMode = () => {
    setDarkMode(!darkMode);
};import React, { useState, useEffect } from 'react';
import { useGetBlogsQuery } from '../../../services/blogApi';
import { Bone } from "lucide-react";
import { Link } from 'react-router-dom';

const BlogPageWrapper = () => {
    const { data: blogsData, error, isLoading } = useGetBlogsQuery();
    const [darkMode, setDarkMode] = useState(false);

    // Check for saved dark mode preference or system preference
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            setDarkMode(JSON.parse(savedMode));
        } else {
            // Check system preference
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(systemPrefersDark);
        }
    }, []);

    // Apply dark mode class to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-orange-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading blogs...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-orange-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="text-xl font-semibold text-red-600 dark:text-red-400">
                    Error loading blogs: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 bg-[#FCF2EF] dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">


                <header className="text-center mb-16">
                    <div className="flex flex-col items-center mb-6">
                        <Bone className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
                            Latest News
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                        incididunt ut labore et dolore
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {blogsData?.data?.map((blog) => (
                        <article
                            key={blog._id}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg dark:shadow-gray-900/20 transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700"
                        >
                            <Link to={`/blog/${blog._id}`} className="block">
                                <div className="relative">
                                    <img
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-6 left-6 bg-purple-600 dark:bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg">
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        }).toUpperCase()}
                                    </div>
                                </div>
                            </Link>

                            <div className="p-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer transition-colors duration-300">
                                        {blog.category?.name || 'Uncategorized'}
                                    </span>
                                </div>

                                <Link to={`/blog/${blog._id}`}>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                        {blog.title}
                                    </h2>
                                </Link>

                                <p className="text-gray-600 dark:text-gray-300 text-base mb-6 leading-relaxed line-clamp-3">
                                    {blog.content}
                                </p>

                                <Link
                                    to={`/blog/${blog._id}`}
                                    className="inline-flex items-center text-gray-900 dark:text-white font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 group"
                                >
                                    <span className="w-2 h-2 bg-current rounded-full mr-3"></span>
                                    READ MORE
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPageWrapper;