import React from 'react';
import { Facebook, Instagram, Twitter, Music } from 'lucide-react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Emily Johnson",
            role: "Lobby Staff",
            image: "https://wellingtons-hotel.myshopify.com/cdn/shop/files/team01.png?v=1742452460&width=2000",
            socialLinks: {
                facebook: "#",
                instagram: "#",
                twitter: "#",
                tiktok: "#"
            }
        },
        {
            name: "Michael Brown",
            role: "Lobby Staff",
            image: "https://wellingtons-hotel.myshopify.com/cdn/shop/files/team02.png?v=1742452459&width=2000",
            socialLinks: {
                facebook: "#",
                instagram: "#",
                twitter: "#",
                tiktok: "#"
            }
        },
        {
            name: "Sarah Davis",
            role: "Lobby Staff",
            image: "https://wellingtons-hotel.myshopify.com/cdn/shop/files/team03.png?v=1742452459&width=2000",
            socialLinks: {
                facebook: "#",
                instagram: "#",
                twitter: "#",
                tiktok: "#"
            }
        },
        {
            name: "Sophia Martinez",
            role: "Lobby Staff",
            image: "https://wellingtons-hotel.myshopify.com/cdn/shop/files/team04.png?v=1742452459&width=2000",
            socialLinks: {
                facebook: "#",
                instagram: "#",
                twitter: "#",
                tiktok: "#"
            }
        }
    ];

    const SocialIcon = ({ type, href }) => {
        const iconProps = { size: 20, className: "text-white" };

        const icons = {
            facebook: <Facebook {...iconProps} />,
            instagram: <Instagram {...iconProps} />,
            twitter: <Twitter {...iconProps} />,
            tiktok: <Music {...iconProps} />
        };

        return (
            <a
                href={href}
                className="w-10 h-10 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-200 hover:scale-110"
                aria-label={`${type} profile`}
            >
                {icons[type]}
            </a>
        );
    };

    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">
                        TESTIMONIALS
                    </p>
                    <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                        Meet Our <span className="text-orange-400 font-normal">Our Guests</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((person, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        <SocialIcon type="facebook" href={person.socialLinks.facebook} />
                                        <SocialIcon type="instagram" href={person.socialLinks.instagram} />
                                        <SocialIcon type="twitter" href={person.socialLinks.twitter} />
                                        <SocialIcon type="tiktok" href={person.socialLinks.tiktok} />
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent h-24"></div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-xl font-semibold mb-1">{person.name}</h3>
                                <p className="text-gray-300 text-sm font-medium">{person.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;