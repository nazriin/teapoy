// BlogDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBlogByIdQuery } from '../../../services/blogApi'; // Assuming you have a new RTK Query hook for fetching a single blog
import { Bone } from 'lucide-react';

const BlogDetail = () => {
    const { id } = useParams(); // Get the blog ID from the URL parameters
    const { data: blogData, error, isLoading } = useGetBlogByIdQuery(id); // Use a new hook to fetch a single blog by ID

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
                <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">Loading blog details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
                <div className="text-xl font-semibold text-red-600 dark:text-red-400 transition-colors duration-300">Error loading blog: {error.message}</div>
            </div>
        );
    }

    if (!blogData || !blogData.data) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
                <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">Blog not found.</div>
            </div>
        );
    }

    const blog = blogData.data; // Assuming your API returns { data: blogObject }

    return (
        <div className="bg-gray-50 dark:bg-[#111827] transition-colors duration-300 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="text-center mb-10">
                    <div className="flex flex-col items-center mb-4">
                        <Bone className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3 transition-colors duration-300" />
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight transition-colors duration-300">
                            {blog.title}
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        Published on{' '}
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </p>
                    <div className="mt-4">
                        {/* Corrected line: Access blog.category.name and provide a fallback */}
                        <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-sm font-medium px-3 py-1 rounded-full transition-colors duration-300">
                            {blog.category && blog.category.name ? blog.category.name : 'Uncategorized'}
                        </span>
                    </div>
                </header>

                <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-96 object-cover rounded-xl shadow-lg mb-10"
                />

                <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 leading-relaxed transition-colors duration-300">
                    <p>{blog.content}</p>
                    {/* You can add more detailed content here if your blog object has more fields */}
                </div>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
                    >
                        Back to Blogs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;