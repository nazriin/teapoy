import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Header from "./components/header/Header.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import {ToastContainer} from "react-toastify";
import UserLogin from "./pages/login/UserLogin.jsx";
import SellerLogin from "./pages/login/SellerLogin.jsx";
import Contact from "./pages/contact/Contact.jsx";
import SellerHomepage from "./pages/seller/SellerHomepage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import SellerDashboard from "./pages/seller/SellerDashboard.jsx";
import HospitalityAboutSection from "./pages/about/HospitalityAboutSection.jsx";
import AboutUs from "./pages/about/AboutUS.jsx";
import FAQ from "./pages/faq/Faq.jsx";

const Router = () => {
    return (
        <>
           <BrowserRouter>
               <Header/>
               <Routes>
                   <Route path="/" element={<Home/>} />
                   <Route path="/signup" element={<SignUp/>} />
                   <Route path="/user/login" element={<UserLogin/>} />
                   <Route path="/seller/login" element={<SellerLogin/>} />
                   <Route path="/seller" element={<SellerHomepage/>} />
                   <Route
                       path="/user-dashboard"
                       element={
                           <ProtectedRoute allowedRoles={['user']}>
                               <UserDashboard />
                           </ProtectedRoute>
                       }
                   />
                   <Route
                       path="/seller-dashboard"
                       element={
                           <ProtectedRoute allowedRoles={['seller']}>
                               <SellerDashboard />
                           </ProtectedRoute>
                       }
                   />
               </Routes>
           </BrowserRouter>
        </>
    )
}
export default Router
