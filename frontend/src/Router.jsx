import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Header from "./components/header/Header.jsx";
import SignUp from "./pages/signup/SignUp.jsx";

const Router = () => {
    return (
        <>
           <BrowserRouter>
               <Header/>
               <Routes>
                   <Route path="/" element={<Home/>} />
                   <Route path="/signup" element={<SignUp/>} />

               </Routes>
           </BrowserRouter>
        </>
    )
}
export default Router
