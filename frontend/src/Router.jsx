import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Header from "./components/header/Header.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import {ToastContainer} from "react-toastify";
import UserLogin from "./pages/login/UserLogin.jsx";
import SellerLogin from "./pages/login/SellerLogin.jsx";
import Contact from "./pages/contact/Contact.jsx";

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
                   <Route path="/contact" element={<Contact/>} />
               </Routes>
           </BrowserRouter>
        </>
    )
}
export default Router
