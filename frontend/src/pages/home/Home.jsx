import React from 'react'
import Slider from "./home_components/Slider.jsx";
import Services from "./home_components/Services.jsx";
import Favorites from "./home_components/Favorites.jsx";
import BlogSec from "./home_components/BlogSec.jsx";
import FaqSec from "./home_components/FaqSec.jsx";
import Adoption from "../adoption/Adoption.jsx";

const Home = () => {
    return (
        <div>
        <Slider/>
            <Services/>
            <Favorites/>
            <BlogSec/>
            <FaqSec/>
            <Adoption/>
        </div>
    )
}
export default Home
