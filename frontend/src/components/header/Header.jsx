// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";
// import 'remixicon/fonts/remixicon.css';
//
//
// const Header = () => {
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//
//     const menuItems = ["HOME", "COLLECTIONS", "SHOP", "BLOG", "PAGES", "CONTACT"];
//
//     return (
//         <header className="bg-black/95 text-white px-4 py-3">
//             <div className="max-w-7xl mx-auto flex justify-between items-center">
//                 {/* Logo */}
//                 <div className="flex items-center gap-2 text-xl font-light">
//                     <img src="https://wdt-teapoy.myshopify.com/cdn/shop/files/logo.svg?v=1719825267&width=320" alt="Logo" className="h-9 w-auto"  />
//
//                 </div>
//
//                 {/* Desktop Menu */}
//                 <nav className="hidden md:flex items-center gap-8 text-sm uppercase font-medium">
//                     {menuItems.map((item, idx) => (
//                         <a
//                             key={idx}
//                             href="#"
//                             className={`hover:text-orange-500 ${
//                                 item === "HOME" ? "text-orange-500" : ""
//                             }`}
//                         >
//                             {item}
//                         </a>
//                     ))}
//                 </nav>
//
//                 {/* Icons */}
//                 <div className="hidden md:flex items-center gap-5 text-white text-lg">
//                     <i className="ri-search-line"></i>
//                     <i className="ri-heart-line"></i>
//                     <i className="ri-refresh-line"></i>
//                     <div className="relative">
//                         <i className="ri-shopping-cart-line"></i>
//                         <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               2
//             </span>
//                     </div>
//                     <i className="ri-user-line"></i>
//                 </div>
//
//                 {/* Mobile Menu Button */}
//                 <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//                     {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//                 </button>
//             </div>
//
//             {/* Mobile Menu */}
//             {mobileMenuOpen && (
//                 <div className="md:hidden mt-4 space-y-4 text-center uppercase font-medium">
//                     {menuItems.map((item, idx) => (
//                         <a key={idx} href="#" className="block hover:text-orange-500">
//                             {item}
//                         </a>
//                     ))}
//                     <div className="flex justify-center gap-6 mt-4 text-lg">
//                         <i className="ri-search-line"></i>
//                         <i className="ri-heart-line"></i>
//                         <i className="ri-refresh-line"></i>
//                         <i className="ri-shopping-cart-line"></i>
//                         <i className="ri-user-line"></i>
//                     </div>
//                 </div>
//             )}
//         </header>
//     );
// };
//
// export default Header;
