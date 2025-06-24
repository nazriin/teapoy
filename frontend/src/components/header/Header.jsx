import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cat, Dog, ShoppingCart, Heart, Search, User, Menu, X } from "lucide-react";

const Header = () => {
    const [theme, setTheme] = useState("light");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                    <Link to="/shop" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Shop</Link>
                    <Link to="/blog" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Blog</Link>
                    <Link to="/aboutus" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">About Us</Link>
                    <Link to="/contactus" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Contact Us</Link>
                    <Link to="/pet" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">Adoption</Link>
                    <Link to="/faq" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</Link>
                </nav>

                {/* Icons - Desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    <Heart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />

                    <Link to="/user/login" className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Login">
                        <User className="w-5 h-5" />
                        <span>Login</span>
                    </Link>

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
                        <Link to="/blog" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>Blog</Link>
                        <Link to="/aboutus" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>About Us</Link>
                        <Link to="/contact" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>Contact Us</Link>
                        <Link to="/faq" className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>FAQ</Link>

                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                            <Link to="/user/login" className="flex items-center space-x-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Login" onClick={closeMobileMenu}>
                                <User className="w-5 h-5" />
                                <span>Login</span>
                            </Link>
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

export default Header;