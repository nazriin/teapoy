import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
    {
        question: "Do You Have Eco-Friendly Furniture?",
        answer: "Yes, we offer a range of eco-friendly furniture made with sustainable materials."
    },
    {
        question: "Is It Possible To Follow The Delivery Of My Furniture?",
        answer: "Absolutely! You can track your order in your account dashboard or via the tracking link we provide after shipping."
    },
    {
        question: "Do You Offer Design Consultations?",
        answer: "Yes, we offer virtual and in-store design consultations with our expert interior designers."
    },
    {
        question: "Are Custom Orders Accepted For Furniture That Isn't In Stock?",
        answer: "Yes, we accept custom orders for furniture out of stock. Reach out to our support team to get started."
    },
];

const ProductFaqAccordion = () => {
    const [openIndex, setOpenIndex] = useState(0); // First item open by default

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            <div className="flex flex-col lg:flex-row">
                {/* Left Section */}
                <div className="flex-1 p-6 md:p-8 lg:p-12 lg:pr-8">
                    <h4 className="uppercase text-orange-500 text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wider">
                        Product Related Queries
                    </h4>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 md:mb-12 leading-tight">Products & Service</h2>

                    <h3 className="text-lg md:text-xl text-orange-400 mb-4 md:mb-6 font-light">
                        For Furniture Purchases, Do You Have Financing Options?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                        Dolor sit amet consectetur adipiscing. Elit duis tristique sollicitudin nibh sit amet. Ultrices
                        eros in cursus turpis. Ultricies tristique nulla aliquet enim tortor at auctor urna
                        nunc.Volutpat diam ut venenatis tellus. Consectetur adipiscing elit duis tristique sollicitudin
                        nibh sit amet.
                    </p>

                    {/* Accordion Section */}
                    <div className="space-y-2">
                        {faqData.map((faq, index) => (
                            <div key={index} className="border-b border-gray-300 dark:border-gray-700">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex justify-between items-center py-4 md:py-6 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none group"
                                >
                                    <span className="text-base md:text-lg font-light pr-4">{faq.question}</span>
                                    <div className="flex-shrink-0">
                                        {openIndex === index ?
                                            <ChevronUp size={20} className="text-orange-400" /> :
                                            <ChevronDown size={20} className="text-gray-400 group-hover:text-orange-400 transition-colors" />
                                        }
                                    </div>
                                </button>
                                {openIndex === index && (
                                    <div className="pb-4 md:pb-6 text-gray-600 dark:text-gray-400 leading-relaxed animate-in slide-in-from-top-2 duration-200 text-sm md:text-base">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section - Image */}
                <div className="flex-1 relative min-h-64 md:min-h-96 lg:min-h-screen">
                    <div className="h-full relative overflow-hidden">
                        <img
                            src="https://wdt-teapoy.myshopify.com/cdn/shop/files/collapsible-conent.jpg?v=1720590311&width=750"
                            alt="Furniture Room"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFaqAccordion;