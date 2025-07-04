import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // Keep useDispatch for clearAuth
import { Link, useNavigate } from "react-router-dom";
import { useLogoutAdminMutation, useGetAdminProfileQuery } from "../../services/adminApi.js";
import { clearAuth } from "../../services/authSlice.js";
import { Cat, Dog, Shield, Menu, X, LogOut } from "lucide-react";

const AdminHeader = () => {
    const [theme, setTheme] = useState("light");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Use useGetAdminProfileQuery to fetch admin profile data
    // This query will automatically refetch when the component mounts or if its cache tag is invalidated.
    const { data: adminProfile, isLoading: isAdminProfileLoading, isError: isAdminProfileError, error: adminProfileError } = useGetAdminProfileQuery();

    const [adminLogout, { isLoading: isAdminLoggingOut }] = useLogoutAdminMutation();

    // Determine authentication status and role based directly on adminProfile data
    const isAuthenticated = !!adminProfile; // If adminProfile data exists, admin is authenticated
    const userRole = adminProfile?.role; // Get role from the fetched profile

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => setMobileMenuOpen(false);

    const handleLogout = async () => {
        try {
            await adminLogout().unwrap();
            // No localStorage.removeItem('adminToken') here if the API is the sole source of truth.
            // The API invalidating the session and the subsequent re-fetch of getAdminProfileQuery
            // returning no data will handle the "logged out" state.
        } catch (err) {
            console.error("Admin logout failed:", err);
        } finally {
            dispatch(clearAuth()); // Still good to clear Redux state for a clean slate
            navigate('/admin');
            closeMobileMenu();
        }
    };

    const getUserDisplayName = () => {
        // Always prefer adminProfile data if available
        if (adminProfile) {
            return adminProfile.name || adminProfile.username || adminProfile.email || 'Admin Profile';
        }
        return 'Admin Profile';
    };

    useEffect(() => {
        if (isAdminProfileError) {
            if (adminProfileError?.status === 401) {
                dispatch(clearAuth());
                navigate('/admin');
            }
            console.error("Error fetching admin profile:", adminProfileError);
        }
    }, [isAdminProfileError, adminProfileError, dispatch, navigate]);


    return (
        <header className="w-full border-b border-gray-200 dark:border-gray-700" style={{ backgroundColor: theme === "dark" ? "#1a1a1a" : "#FCF2EF" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <img
                        src="https://demo2.themelexus.com/ziggy/wp-content/uploads/2022/05/logo.svg"
                        alt="Pet Shop Logo"
                        className="h-16 w-auto"
                        style={{ filter: theme === "dark" ? "brightness(0) invert(1)" : "none" }}
                    />
                    <span className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</span>
                </div>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex space-x-6">
                    {isAuthenticated && userRole === 'admin' && ( // Only show if authenticated as admin
                        <>
                            <Link to="/admin/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Dashboard</Link>
                            {/*<Link to="/admin/users" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Manage Users</Link>*/}
                            {/*<Link to="/admin/products" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Manage Products</Link>*/}
                            <Link to="/admin/tracking" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Tracking</Link>
                            {/* Add other admin-specific links here */}
                        </>
                    )}
                </nav>

                {/* Icons - Desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    {isAuthenticated && userRole === 'admin' ? (
                        <>
                            <Link to="/admin/dashboard" className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Admin Profile">
                                <Shield className="w-5 h-5" />
                                <span>
                                    {isAdminProfileLoading ? "Loading..." : getUserDisplayName()}
                                </span>
                            </Link>
                            <button onClick={handleLogout} disabled={isAdminLoggingOut} className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50" aria-label="Logout">
                                <LogOut className="w-5 h-5" />
                                <span>{isAdminLoggingOut ? "Logging out..." : "Logout"}</span>
                            </button>
                        </>
                    ) : (
                        <Link to="/admin" className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Admin Login">
                            <Shield className="w-5 h-5" />
                            <span>Admin Login</span>
                        </Link>
                    )}

                    <button onClick={toggleTheme} className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        {theme === "dark" ? <Dog className="w-4 h-4 text-amber-500" /> : <Cat className="w-4 h-4 text-gray-800" />}
                    </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="p-2 rounded-md text-gray-700 dark:text-gray-200">
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700" style={{ backgroundColor: theme === "dark" ? "#1a1a1a" : "#FFFAEA" }}>
                    <nav className="px-4 py-4 space-y-3">
                        {isAuthenticated && userRole === 'admin' && ( // Only show if authenticated as admin
                            <>
                                <Link to="/admin/dashboard" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>Dashboard</Link>
                                <Link to="/admin/tracking" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>Tracking</Link>
                                {/*<Link to="/admin/users" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>Manage Users</Link>*/}
                                {/*<Link to="/admin/products" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>Manage Products</Link>*/}
                                {/* Add other mobile admin links here */}
                            </>
                        )}

                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                            {isAuthenticated && userRole === 'admin' ? (
                                <>
                                    <Link to="/admin/dashboard" className="flex items-center space-x-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                                        <Shield className="w-5 h-5" />
                                        <span>
                                            {isAdminProfileLoading ? "Loading..." : getUserDisplayName()}
                                        </span>
                                    </Link>
                                    <button onClick={handleLogout} disabled={isAdminLoggingOut} className="flex items-center space-x-2 py-2 w-full text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50" aria-label="Logout">
                                        <LogOut className="w-5 h-5" />
                                        <span>{isAdminLoggingOut ? "Logging out..." : "Logout"}</span>
                                    </button>
                                </>
                            ) : (
                                <Link to="/admin" className="flex items-center space-x-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Admin Login">
                                    <Shield className="w-5 h-5" />
                                    <span>Admin Login</span>
                                </Link>
                            )}
                            <button onClick={toggleTheme} className="flex items-center space-x-2 py-2 w-full text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                                {theme === "dark" ? <Dog className="w-5 h-5 text-amber-500" /> : <Cat className="w-5 h-5 text-gray-800" />}
                                <span>Toggle Theme</span>
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default AdminHeader;