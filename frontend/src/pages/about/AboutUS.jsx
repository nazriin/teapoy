import React from 'react'
import HospitalityAboutSection from "./HospitalityAboutSection.jsx";
import TestimonialsSection from "./TestimonialsSection.jsx";
import LogoSection from "./LogoSection.jsx";
import TestimonialsSlider from "./TestimonialsSlider.jsx";
import AboutUsBanner from "./AboutUsBanner.jsx";

const AboutUs = () => {
    return (
        <>
            <AboutUsBanner/>
            <HospitalityAboutSection/>
                <TestimonialsSection/>
            <LogoSection/>
            <TestimonialsSlider/>

        </>
    )
}
export default AboutUs

