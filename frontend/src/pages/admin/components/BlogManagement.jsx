// /src/pages/Admin/components/BlogManagement.jsx
import React, { useState, useEffect } from 'react'; // useEffect'i ekledik
import { Plus, Edit, Trash2, AlertCircle, X } from 'lucide-react'; // X ikonunu ekledik
import { toast } from 'react-toastify';

import {
    useGetBlogsQuery,
    useAddBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation
} from '../../../services/blogApi.js';
import {
    useGetBlogCategoriesQuery,
    useAddBlogCategoryMutation,
    useUpdateBlogCategoryMutation, // Kategori düzenlemek için
    useDeleteBlogCategoryMutation // Kategori silmek için
} from '../../../services/blogCategoryApi.js';
import BlogModal from './BlogModal.jsx';

const BlogManagement = ({ showNotification }) => {
    // Blog Yönetimi Durumları
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    // Kategori Yönetimi Durumları
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null); // Yeni: Düzenlenen kategori için durum
    const [isEditingCategory, setIsEditingCategory] = useState(false); // Yeni: Kategori düzenleme modunda mı?

    // RTK Query Hook'ları
    const { data: blogsData, isLoading: isLoadingBlogs, error: blogsError } = useGetBlogsQuery();
    const { data: categoriesData, isLoading: isLoadingCategories, error: categoriesError } = useGetBlogCategoriesQuery();
    const [addBlog, { isLoading: isAddingBlog }] = useAddBlogMutation();
    const [updateBlog, { isLoading: isUpdatingBlog }] = useUpdateBlogMutation();
    const [deleteBlog, { isLoading: isDeletingBlog }] = useDeleteBlogMutation();
    const [addBlogCategory, { isLoading: isAddingCategory }] = useAddBlogCategoryMutation();
    const [updateBlogCategory, { isLoading: isUpdatingCategory }] = useUpdateBlogCategoryMutation(); // Yeni: Kategori güncelleme mutasyonu
    const [deleteBlogCategory, { isLoading: isDeletingCategory }] = useDeleteBlogCategoryMutation(); // Yeni: Kategori silme mutasyonu

    // Blog Modal İşleyicileri
    const handleOpenBlogModal = (blog = null) => {
        setEditingBlog(blog);
        setIsBlogModalOpen(true);
    };

    const handleBlogSubmit = async (formData) => {
        try {
            if (editingBlog) {
                await updateBlog({ blogId: editingBlog._id, ...formData }).unwrap();
                showNotification('success', "Blog uğurla yeniləndi!");
            } else {
                await addBlog(formData).unwrap();
                showNotification('success', "Blog uğurla əlavə edildi!");
            }
            setIsBlogModalOpen(false);
        } catch (err) {
            console.error('Bloqu yadda saxlamaq alınmadı:', err);
            showNotification('error', `Bloqu yadda saxlamaq alınmadı: ${err.data?.message || err.error}`);
        }
    };

    const handleDeleteBlog = async (blogId) => {
        if (window.confirm('Bu bloqu silmək istədiyinizə əminsinizmi?')) {
            try {
                await deleteBlog(blogId).unwrap();
                showNotification('success', "Blog uğurla silindi!");
            } catch (err) {
                console.error('Bloqu silmək alınmadı:', err);
                showNotification('error', `Bloqu silmək alınmadı: ${err.data?.message || err.error}`);
            }
        }
    };

    // Kategori Ekleme/Düzenleme İşleyicisi
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) {
            showNotification('error', 'Kateqoriya adı boş ola bilməz!');
            return;
        }

        try {
            if (isEditingCategory && editingCategory) {
                // Kategori düzenleme
                await updateBlogCategory({ id: editingCategory._id, name: newCategoryName }).unwrap();
                showNotification('success', 'Kateqoriya uğurla yeniləndi!');
            } else {
                // Yeni kategori ekleme
                await addBlogCategory({ name: newCategoryName }).unwrap();
                showNotification('success', 'Kateqoriya uğurla əlavə edildi!');
            }
            setNewCategoryName(''); // Formu sıfırla
            setEditingCategory(null); // Düzenleme modunu kapat
            setIsEditingCategory(false); // Düzenleme modunu kapat
        } catch (err) {
            console.error('Kateqoriya əməliyyatı alınmadı:', err);
            showNotification('error', `Kateqoriya əməliyyatı alınmadı: ${err.data?.message || err.error}`);
        }
    };

    // Kategori Düzenleme Moduna Girme İşleyicisi
    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setNewCategoryName(category.name); // Mevcut adı inputa doldur
        setIsEditingCategory(true); // Düzenleme modunu aç
    };

    // Kategori Silme İşleyicisi
    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('Bu kateqoriyanı silmək istədiyinizə əminsinizmi? Bu kateqoriyaya aid bloqlar kateqoriyasız qalacaq.')) {
            try {
                await deleteBlogCategory(categoryId).unwrap();
                showNotification('success', 'Kateqoriya uğurla silindi!');
            } catch (err) {
                console.error('Kateqoriyanı silmək alınmadı:', err);
                showNotification('error', `Kateqoriyanı silmək alınmadı: ${err.data?.message || err.error}`);
            }
        }
    };

    // Yükleme Durumları
    if (isLoadingBlogs || isLoadingCategories) return <div>Bloqlar və kateqoriyalar yüklənir...</div>;

    // Hata Durumları
    if (blogsError || categoriesError) {
        return (
            <div className="text-red-500 p-4 rounded-md bg-red-100 flex items-center space-x-2">
                <AlertCircle size={20} />
                <span>Xəta: {blogsError?.message || categoriesError?.message || 'Məlumat yüklənə bilmədi'}</span>
            </div>
        );
    }

    // Kategorileri hazırla
    const categories = categoriesData?.data || [];

    return (
        <div className="container mx-auto p-6">
            {/* Kategori Yönetimi Bölümü */}
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Kateqoriya İdarəetməsi</h1>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    {isEditingCategory ? 'Kateqoriyanı Redaktə Et' : 'Yeni Kateqoriya Əlavə Et'}
                </h2>
                <form onSubmit={handleCategorySubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Kateqoriya adı"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="flex-grow border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isAddingCategory || isUpdatingCategory}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:bg-green-300"
                    >
                        {isAddingCategory ? 'Əlavə edilir...' : isUpdatingCategory ? 'Yenilənir...' : (
                            <>
                                {isEditingCategory ? <Edit size={20} /> : <Plus size={20} />}
                                <span>{isEditingCategory ? 'Kateqoriyanı Yenilə' : 'Kateqoriya Əlavə Et'}</span>
                            </>
                        )}
                    </button>
                    {isEditingCategory && (
                        <button
                            type="button"
                            onClick={() => {
                                setNewCategoryName('');
                                setEditingCategory(null);
                                setIsEditingCategory(false);
                            }}
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                            title="Redaktəni Ləğv Et"
                        >
                            <X size={20} />
                            <span>Ləğv Et</span>
                        </button>
                    )}
                </form>

                <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-700">Mövcud Kateqoriyalar</h2>
                {categories.length === 0 ? (
                    <p className="text-gray-600">Heç bir kateqoriya tapılmadı.</p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((cat) => (
                            <li key={cat._id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm">
                                <span className="text-gray-800 font-medium">{cat.name}</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditCategory(cat)}
                                        className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                        title="Kateqoriyanı Redaktə Et"
                                    >
                                        <Edit size={16}/>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCategory(cat._id)}
                                        disabled={isDeletingCategory} // Silme işlemi sırasında düğmeyi devre dışı bırak
                                        className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Kateqoriyanı Sil"
                                    >
                                        <Trash2 size={16}/>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Blog Yönetimi Bölümü */}
            <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-10">Bloq İdarəetməsi</h1>

            <button
                onClick={() => handleOpenBlogModal()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 mb-6 transition-colors"
            >
                <Plus size={20} />
                <span>Yeni Blog Əlavə Et</span>
            </button>

            {blogsData?.data && blogsData.data.length === 0 ? (
                <p className="text-gray-600">Heç bir blog tapılmadı. Yeni bir blog əlavə edərək başlayın!</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogsData?.data?.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                                <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover"/>
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Kateqoriya: {blog.category ? blog.category.name : 'Kateqoriyasız'}
                                    </p>
                                    <p className="text-gray-700 text-sm line-clamp-3 mb-4">{blog.content}</p>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleOpenBlogModal(blog)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Redaktə Et"
                                        >
                                            <Edit size={18}/>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBlog(blog._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Sil"
                                        >
                                            <Trash2 size={18}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Blog Modalı */}
            <BlogModal
                isOpen={isBlogModalOpen}
                onClose={() => setIsBlogModalOpen(false)}
                onSubmit={handleBlogSubmit}
                initialData={editingBlog}
                isLoading={isAddingBlog || isUpdatingBlog}
                categories={categories}
            />
        </div>
    );
};

export default BlogManagement;