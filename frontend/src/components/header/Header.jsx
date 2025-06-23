import React, { useState, useEffect } from 'react';
import {
    Search,
    Heart,
    ShoppingCart,
    Menu,
    X,
    Sun,
    Moon,
} from 'lucide-react';
import {Link} from "react-router-dom";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
            <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center">
                        <img
                            src="https://wdt-teapoy.myshopify.com/cdn/shop/files/logo.svg?v=1719825267&width=320"
                            alt="Teapoy Logo"
                            className="h-10 w-auto object-contain invert dark:invert-0 transition duration-300"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link to='/' className="text-orange-500 font-medium hover:text-orange-400 transition-colors">HOME</Link>
                        <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">COLLECTIONS</Link>
                        <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">SHOP</Link>
                        <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">BLOG</Link>
                        <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">PAGES</Link>
                        <Link to='/contact' className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">CONTACT</Link>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-3">
                            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                            </button>
                            {/* Dark mode button */}
                            <button onClick={toggleTheme} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                {isDarkMode ? (
                                    <Sun className="w-5 h-5 text-yellow-400" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-700" />
                                )}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-800 border-t border-gray-700 py-4 px-4">
                        <div className="flex flex-col space-y-4">
                            <a href="#" className="text-orange-500 font-medium py-2">HOME</a>
                            <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors py-2">COLLECTIONS</a>
                            <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors py-2">SHOP</a>
                            <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors py-2">BLOG</a>
                            <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors py-2">PAGES</a>
                            <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors py-2">CONTACT</a>

                            {/* Mobile Icons */}
                            <div className="flex items-center space-x-4 pt-4 border-t border-gray-700 sm:hidden">
                                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                                    <Search className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                                    <Heart className="w-5 h-5" />
                                </button>
                                <button className="relative p-2 hover:bg-gray-700 rounded-lg transition-colors">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                                </button>
                                <button onClick={toggleTheme} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                                    {isDarkMode ? (
                                        <Sun className="w-5 h-5 text-yellow-400" />
                                    ) : (
                                        <Moon className="w-5 h-5 text-white" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header;
