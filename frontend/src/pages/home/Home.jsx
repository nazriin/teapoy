import React from 'react'
import Slider from "./home_components/Slider.jsx";
import FurnitureShowcase from "./home_components/FurnitureShowcase.jsx";
import Banner from "./home_components/Banner.jsx";
import AccordionComponent from "./home_components/AccordionComponent.jsx";

const Home = () => {
    return (
        <div>
            <Slider/>
            <FurnitureShowcase/>
            <Banner/>
            <AccordionComponent/>

        </div>
    )
}
export default Home
