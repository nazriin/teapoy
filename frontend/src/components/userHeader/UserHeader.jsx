import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation, useGetCurrentUserQuery } from "../../services/authApi.js";
import { clearAuth } from "../../services/authSlice.js";
import { Cat, Dog, ShoppingCart, Heart, Search, User, Menu, X, LogOut, Package } from "lucide-react";

const UserHeader = () => {
    const [theme, setTheme] = useState("light");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Use useGetCurrentUserQuery to fetch current user data
    const { data: currentUserProfile, isLoading: isCurrentUserLoading, isError: isCurrentUserError } = useGetCurrentUserQuery();
    const [userLogout, { isLoading: isUserLoggingOut }] = useLogoutUserMutation();

    const isAuthenticated = !!currentUserProfile?.name;
    const userRole = currentUserProfile?.role;

    // Determine the profile link based on the role
    const profileLink = userRole === 'seller' ? '/seller/dashboard' : '/user/dashboard';

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
            await userLogout().unwrap();
        } catch (err) {
            console.error("User logout failed:", err);
        } finally {
            dispatch(clearAuth());
            navigate('/user/login');
            closeMobileMenu();
        }
    };

    const handleLoginNavigation = () => {
        navigate('/user/login');
        closeMobileMenu();
    };

    const renderUserIcon = () => {
        if (userRole === 'seller') return <Package className="w-5 h-5" />;
        return <User className="w-5 h-5" />;
    };

    const getUserDisplayName = () => {
        if (currentUserProfile && currentUserProfile.user) {
            const fetchedUser = currentUserProfile.user;
            return fetchedUser?.name || fetchedUser?.username || fetchedUser?.email || 'Profile';
        }
        return 'Profile';
    };

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
                </div>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
                    <Link to="/user/shop" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Shop</Link>
                    {isAuthenticated && userRole === 'seller' && (
                        <Link to="/seller/products" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">My Products</Link>
                    )}
                    <Link to="/blog" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Blog</Link>
                    <Link to="/aboutus" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">About Us</Link>
                    <Link to="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Contact Us</Link>
                    <Link to="/pet" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Adoption</Link>
                    <Link to="/faq" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</Link>
                </nav>

                {/* Icons - Desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    <Search className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    <Link to="/user/wishlist"><Heart className="w-5 h-5 text-gray-700 dark:text-gray-200" /></Link>
                    <Link to="/user/basket"><ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" /></Link>

                    {isAuthenticated ? (
                        <>
                            <Link to={profileLink} className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Profile">
                                {renderUserIcon()}
                                <span>
                                    {isCurrentUserLoading ? "Loading..." : getUserDisplayName()}
                                </span>
                            </Link>
                            <button onClick={handleLogout} disabled={isUserLoggingOut} className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50" aria-label="Logout">
                                <LogOut className="w-5 h-5" />
                                <span>{isUserLoggingOut ? "Logging out..." : "Logout"}</span>
                            </button>
                        </>
                    ) : (
                        <button onClick={handleLoginNavigation} className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Login">
                            <User className="w-5 h-5" />
                            <span>Login</span>
                        </button>
                    )}

                    <button onClick={toggleTheme} className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        {theme === "dark" ? <Dog className="w-4 h-4 text-amber-500" /> : <Cat className="w-4 h-4 text-gray-800" />}
                    </button>
                </div>

                {/* Mobile menu button and icons */}
                <div className="md:hidden flex items-center space-x-2">
                    <Search className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    <Heart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    <button onClick={toggleMobileMenu} className="p-2 rounded-md text-gray-700 dark:text-gray-200">
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700" style={{ backgroundColor: theme === "dark" ? "#1a1a1a" : "#FFFAEA" }}>
                    <nav className="px-4 py-4 space-y-3">
                        <Link to="/" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>Home</Link>
                        <Link to="/shop" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>Shop</Link>
                        {isAuthenticated && userRole === 'seller' && (
                            <Link to="/seller/products" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>My Products</Link>
                        )}
                        <Link to="/blog" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>Blog</Link>
                        <Link to="/aboutus" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>About Us</Link>
                        <Link to="/contact" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>Contact Us</Link>
                        <Link to="/faq" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>FAQ</Link>

                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                            {isAuthenticated ? (
                                <>
                                    <Link to={profileLink} className="flex items-center space-x-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                                        {renderUserIcon()}
                                        <span>
                                            {isCurrentUserLoading ? "Loading..." : getUserDisplayName()}
                                        </span>
                                    </Link>
                                    <button onClick={handleLogout} disabled={isUserLoggingOut} className="flex items-center space-x-2 py-2 w-full text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50" aria-label="Logout">
                                        <LogOut className="w-5 h-5" />
                                        <span>{isUserLoggingOut ? "Logging out..." : "Logout"}</span>
                                    </button>
                                </>
                            ) : (
                                <button onClick={handleLoginNavigation} className="flex items-center space-x-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Login">
                                    <User className="w-5 h-5" />
                                    <span>Login</span>
                                </button>
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

export default UserHeader;