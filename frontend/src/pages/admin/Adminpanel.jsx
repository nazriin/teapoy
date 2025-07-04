// // Adminpanel.jsx
// import React, { useState, useEffect } from 'react';
// import { AlertCircle, CheckCircle, X } from 'lucide-react';
//
// import CategoryManagement from './components/CategoryManagement.jsx';
// import BlogManagement from './components/BlogManagement.jsx';
// import ServicesManagement from './components/ServicesManagement.jsx'; // New import
//
// const AdminPanel = () => {
//     const [activeTab, setActiveTab] = useState(() => {
//         const savedTab = localStorage.getItem('adminActiveTab');
//         return savedTab || 'categories';
//     });
//
//     const [notification, setNotification] = useState(null); // For general notifications
//
//     useEffect(() => {
//         localStorage.setItem('adminActiveTab', activeTab);
//     }, [activeTab]);
//
//     const showNotification = (type, message) => {
//         setNotification({ type, message });
//         setTimeout(() => setNotification(null), 5000);
//     };
//
//     // Notification Component
//     const NotificationComponent = () => {
//         if (!notification) return null;
//
//         return (
//             <div className="fixed top-4 right-4 z-50">
//                 <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
//                     notification.type === 'success'
//                         ? 'bg-green-50 border border-green-200 text-green-800'
//                         : 'bg-red-50 border border-red-200 text-red-800'
//                 }`}>
//                     {notification.type === 'success' ? (
//                         <CheckCircle className="w-5 h-5 text-green-600" />
//                     ) : (
//                         <AlertCircle className="w-5 h-5 text-red-600" />
//                     )}
//                     <span className="text-sm font-medium">{notification.message}</span>
//                     <button
//                         onClick={() => setNotification(null)}
//                         className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
//                     >
//                         <X className="w-4 h-4" />
//                     </button>
//                 </div>
//             </div>
//         );
//     };
//
//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//             <div className="max-w-7xl mx-auto">
//                 <NotificationComponent />
//
//                 <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Panel</h1>
//
//                 {/* Tabs */}
//                 <div className="flex border-b border-gray-200 mb-6 bg-white rounded-lg shadow-sm">
//                     <button
//                         onClick={() => setActiveTab('categories')}
//                         className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
//                             activeTab === 'categories'
//                                 ? 'border-b-2 border-blue-600 text-blue-600'
//                                 : 'text-gray-500 hover:text-gray-700'
//                         }`}
//                     >
//                         Categories
//                     </button>
//                     <button
//                         onClick={() => setActiveTab('blogs')}
//                         className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
//                             activeTab === 'blogs'
//                                 ? 'border-b-2 border-blue-600 text-blue-600'
//                                 : 'text-gray-500 hover:text-gray-700'
//                         }`}
//                     >
//                         Blogs
//                     </button>
//                     <button
//                         onClick={() => setActiveTab('services')} // New tab
//                         className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
//                             activeTab === 'services'
//                                 ? 'border-b-2 border-blue-600 text-blue-600'
//                                 : 'text-gray-500 hover:text-gray-700'
//                         }`}
//                     >
//                         Services
//                     </button>
//                 </div>
//
//                 {/* Render the active management component */}
//                 {activeTab === 'categories' && <CategoryManagement showNotification={showNotification} />}
//                 {activeTab === 'blogs' && <BlogManagement showNotification={showNotification} />}
//                 {activeTab === 'services' && <ServicesManagement showNotification={showNotification} />} {/* New component */}
//             </div>
//         </div>
//     );
// };
//
// export default AdminPanel;
// Adminpanel.jsx
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

import CategoryManagement from './components/CategoryManagement.jsx';
import BlogManagement from './components/BlogManagement.jsx';
import ServicesManagement from './components/ServicesManagement.jsx';
import PetManagement from './components/PetManagement.jsx'; // New import

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState(() => {
        const savedTab = localStorage.getItem('adminActiveTab');
        return savedTab || 'categories';
    });

    const [notification, setNotification] = useState(null); // For general notifications

    useEffect(() => {
        localStorage.setItem('adminActiveTab', activeTab);
    }, [activeTab]);

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    // Notification Component
    const NotificationComponent = () => {
        if (!notification) return null;

        return (
            <div className="fixed top-4 right-4 z-50">
                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
                    notification.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                    {notification.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="text-sm font-medium">{notification.message}</span>
                    <button
                        onClick={() => setNotification(null)}
                        className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <NotificationComponent />

                <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Panel</h1>

                {/* Tabs */}
                <div className="flex flex-wrap border-b border-gray-200 mb-6 bg-white rounded-lg shadow-sm">
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
                            activeTab === 'categories'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Categories
                    </button>
                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
                            activeTab === 'blogs'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Blogs
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
                            activeTab === 'services'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Services
                    </button>
                    {/* New tab for Pets - Comment moved */}
                    <button
                        onClick={() => setActiveTab('pets')}
                        className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 ${
                            activeTab === 'pets'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Pets
                    </button>
                </div>

                {/* Render the active management component */}
                {activeTab === 'categories' && <CategoryManagement showNotification={showNotification} />}
                {activeTab === 'blogs' && <BlogManagement showNotification={showNotification} />}
                {activeTab === 'services' && <ServicesManagement showNotification={showNotification} />}
                {activeTab === 'pets' && <PetManagement showNotification={showNotification} />}
            </div>
        </div>
    );
};

export default AdminPanel;