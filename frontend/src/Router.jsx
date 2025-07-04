// src/Router.jsx
import React from 'react';
import { Route, Routes, Outlet } from "react-router-dom"; // Import Outlet

import Home from "./pages/home/Home.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import UserLogin from "./pages/login/UserLogin.jsx";
import SellerLogin from "./pages/login/SellerLogin.jsx";
import AdminLogin from "./pages/login/AdminLogin.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import SellerDashboard from "./pages/seller/SellerDashboard.jsx";
import Adminpanel from "./pages/admin/Adminpanel.jsx";
import BlogPageWrapper from "./pages/home/home_components/BlogSec.jsx";
import BlogDetail from "./pages/home/home_components/BlogDetail.jsx";
import PetsFavourites from "./pages/home/home_components/Favorites.jsx";
import ProductDetail from "./pages/home/home_components/ProductDetail.jsx";
import Shop from "./pages/shop/Shop.jsx";
import Basket from "./pages/basket/Basket.jsx";
import Faq from "./pages/faq/Faq.jsx";
import NotFoundPage from "./pages/notfound/NotFound.jsx";
import Unauthorized from "./pages/unauthorized/Unauthorized.jsx"; // Assuming you have an unauthorized page

// Protected Route Components
import ProtectedRoute from "./components/ProtectedRoute.jsx";
// You will need to similarly update AdminPrivateRoute if it's not already using Outlet context
import AdminPrivateRoute from "./components/AdminProtectedRouter.jsx";

// Layout Components
import Layout from "./components/layout/Layout.jsx";
import UserLayout from "./components/userLayout/UserLayout.jsx";
import AdminLayout from "./components/adminLayout/AdminLayout.jsx";

import 'react-toastify/dist/ReactToastify.css';
import ServiceDetail from "./pages/home/home_components/ServiceDetail.jsx";
import Services from "./pages/home/home_components/Services.jsx";
import AboutUs from "./pages/aboutus/AboutUs.jsx";
import Adoption from "./pages/adoption/Adoption.jsx";
import PetDetail from "./pages/adoption/PetDetail.jsx";
import WishlistPage from "./pages/wishlist/WishList.jsx";
import ContactUs from "./pages/contactus/ContactUs.jsx";
import TrackingStatusChanger from "./pages/adminTracking/AdminTracking.jsx";

const Router = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/seller/login" element={<SellerLogin />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/blog" element={<BlogPageWrapper />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/product" element={<PetsFavourites />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/services" element={<Services />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/pet" element={<Adoption />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/pet/:petId" element={<PetDetail />} />
                <Route path="/services/:serviceId" element={<ServiceDetail />} />
                <Route path="/shop" element={<Shop />} /> {/* Shop is accessible here without user ID */}
                <Route path="/unauthorized" element={<Unauthorized />} /> {/* Add unauthorized page */}
            </Route>

            <Route element={<UserLayout />}>
                <Route
                    element={
                        <ProtectedRoute requiredRole={'user'}>
                            <Outlet /> {/* This Outlet will render the nested user routes */}
                        </ProtectedRoute>
                    }
                >
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                    <Route path="/user/shop" element={<Shop />} />
                    <Route path="/user/basket" element={<Basket />} />
                    <Route path="/user/wishlist" element={<WishlistPage />} />
                </Route>
            </Route>

            <Route element={<UserLayout />}>
                <Route
                    element={
                        <ProtectedRoute requiredRole={'seller'}>
                            <Outlet />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/seller/dashboard" element={<SellerDashboard />} />
                </Route>
            </Route>

            <Route element={<AdminLayout />}>
                <Route element={<AdminPrivateRoute requiredRole={['admin']} />}>
                    <Route path="/admin/dashboard" element={<Adminpanel />} />
                    <Route path="/admin/tracking" element={<TrackingStatusChanger />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default Router;
