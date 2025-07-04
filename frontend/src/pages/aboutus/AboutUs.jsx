// AboutUs.jsx
import React from 'react';
import { PawPrint, Heart, Handshake, ShieldCheck, Facebook, Twitter, Linkedin } from 'lucide-react';
import Services from "../home/home_components/Services.jsx";

const teamMembers = [
    {
        name: 'John Doe',
        title: 'Chief Veterinarian',
        image: 'https://plus.unsplash.com/premium_photo-1677165479422-bc6eb405bd21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fFZldGVyaW5hcmlhbnxlbnwwfHwwfHx8MA%3D%3D',
        facebook: '#',
        twitter: '#',
        linkedin: '#',
    },
    {
        name: 'Jane Smith',
        title: 'Grooming Specialist',
        image: 'https://images.unsplash.com/photo-1734002886107-168181bcd6a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZlbWFsZSUyMHZldGVyaW5hcmlhbnxlbnwwfHwwfHx8MA%3D%3D',
        facebook: '#',
        twitter: '#',
        linkedin: '#',
    },
    {
        name: 'Peter Jones',
        title: 'Animal Behaviorist',
        image: 'https://plus.unsplash.com/premium_photo-1686523494944-ca32cb8ea852?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW5pbWFsJTIwdHJhaW5lcnxlbnwwfHwwfHx8MA%3D%3D',
        facebook: '#',
        twitter: '#',
        linkedin: '#',
    },
    {
        name: 'Alice Brown',
        title: 'Customer Support Lead',
        image: 'https://images.unsplash.com/photo-1589697547048-962940abc062?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D',
        facebook: '#',
        twitter: '#',
        linkedin: '#',
    },
    // Add more team members as needed
];

const AboutUs = () => {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* Header Section */}
            <div className="text-center mb-12 md:mb-16">
                <PawPrint className="w-12 h-12 mx-auto text-rose-600 dark:text-rose-400 mb-4 transition-colors duration-300" />
                <h1 className="text-4xl md:text-5xl font-bold text-rose-800 dark:text-rose-300 mb-4 transition-colors duration-300">
                    About Us
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
                    We are dedicated to providing the best care and products for your beloved pets.
                    Learn more about our mission, values, and what makes us unique.
                </p>
            </div>

            {/* Our Story Section */}
            <section className="bg-rose-50 dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 md:p-10 mb-12 transition-colors duration-300">
                <h2 className="text-3xl font-bold text-rose-700 dark:text-rose-300 mb-6 text-center transition-colors duration-300">
                    Our Story
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1603106649795-6a1492a43f73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBldCUyMHNob3B8ZW58MHx8MHx8fDA%3D"
                            alt="Our Story"
                            className="rounded-lg shadow-md w-full h-auto object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        <p className="mb-4">
                            Founded in 2025, our journey began with a simple yet profound love for animals.
                            We realized there was a need for a place where pet owners could find not just
                            high-quality products, but also reliable services and trustworthy advice.
                            From humble beginnings, we've grown into a comprehensive pet care center,
                            driven by our passion to enhance the lives of pets and their families.
                        </p>
                        <p>
                            Every step of our growth has been guided by the principle of putting pets first.
                            We continuously strive to expand our offerings, from premium nutrition to advanced
                            veterinary services, ensuring that all aspects of your pet's well-being are covered
                            under one roof.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <Services/>

            {/* Our Team Section */}
            <section className="bg-rose-50 dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 md:p-10 text-center transition-colors duration-300">
                <h2 className="text-3xl font-bold text-rose-700 dark:text-rose-300 mb-6 transition-colors duration-300">
                    Meet Our Team
                </h2>
                <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 transition-colors duration-300">
                    Our team consists of passionate animal lovers, experienced veterinarians, and knowledgeable staff
                    who are all committed to the well-being of your pets.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="relative rounded-lg overflow-hidden shadow-md group dark:shadow-lg">
                            <div className="aspect-w-1 aspect-h-1">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h4 className="text-white font-semibold text-lg mb-1">{member.name}</h4>
                                <p className="text-rose-300 text-sm mb-2">{member.title}</p>
                                <div className="flex space-x-3">
                                    {member.facebook && <a href={member.facebook} className="text-white hover:text-rose-400"><Facebook className="w-5 h-5" /></a>}
                                    {member.twitter && <a href={member.twitter} className="text-white hover:text-rose-400"><Twitter className="w-5 h-5" /></a>}
                                    {member.linkedin && <a href={member.linkedin} className="text-white hover:text-rose-400"><Linkedin className="w-5 h-5" /></a>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action (Optional) */}
            <div className="mt-12 text-center">
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300">
                    Have more questions or want to visit us?
                </p>
                <a
                    href="/contactus"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                >
                    Contact Us
                </a>
            </div>
        </div>
    );
};

export default AboutUs;