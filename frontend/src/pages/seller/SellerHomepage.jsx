import React, { useState, useEffect } from 'react';
import {
    ShoppingBag,
    DollarSign,
    Package,
    TrendingUp,
    Sun,
    Moon,
    LogOut,
    Bell,
    Settings,
} from 'lucide-react';
import {
    useGetSellerProfileQuery,
    useGetSellerDashboardQuery,
    useLogoutSellerMutation,
} from '../../services/sellerApi.js';

export default function SellerHomepage() {
    // Initialize dark mode from localStorage or system preference
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // RTK Query hooks
    const { data: profileData, isLoading: profileLoading, error: profileError } = useGetSellerProfileQuery();
    const { data: dashboardData, isLoading: dashboardLoading, error: dashboardError } = useGetSellerDashboardQuery();
    const [logoutSeller, { isLoading: logoutLoading }] = useLogoutSellerMutation();

    // Sync dark mode with localStorage
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Handle logout
    const handleLogout = async () => {
        try {
            await logoutSeller().unwrap();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    // Loading state
    // if (profileLoading || dashboardLoading) {
    //     return (
    //         <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
    //             <div className="flex items-center justify-center min-h-screen">
    //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    //             </div>
    //         </div>
    //     );
    // }

    // Error state
    if (profileError || dashboardError) {
        return (
            <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-center min-h-screen text-red-500 dark:text-red-400">
                    Error loading dashboard data
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <ShoppingBag className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Seller Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </button>
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? (
                                    <Sun className="h-5 w-5 text-yellow-500" />
                                ) : (
                                    <Moon className="h-5 w-5 text-gray-600" />
                                )}
                            </button>
                            <button
                                onClick={handleLogout}
                                disabled={logoutLoading}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                aria-label="Logout"
                            >
                                <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, {profileData?.name || 'Seller'}!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Here's what's happening with{' '}
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
              {profileData?.storeName || 'your store'}
            </span>{' '}
                        today.
                    </p>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {dashboardData?.totalOrders || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600 dark:text-green-400">
                {dashboardData?.orderTrend || '+0%'} from last month
              </span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    ${dashboardData?.totalRevenue?.toLocaleString() || '0.00'}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600 dark:text-green-400">
                {dashboardData?.revenueTrend || '+0%'} from last month
              </span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {dashboardData?.totalProducts || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <Package className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600 dark:text-green-400">
                {dashboardData?.productTrend || '+0'} new products
              </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}