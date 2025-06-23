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
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 md:px-8 py-12">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Left Section */}
                <div>
                    <h4 className="uppercase text-orange-500 text-sm font-medium mb-2">
                        Product Related Queries
                    </h4>
                    <h2 className="text-4xl font-semibold mb-4">Products & Service</h2>
                    <h3 className="text-lg text-orange-400 mb-4">
                        For Furniture Purchases, Do You Have Financing Options?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Dolor sit amet consectetur adipiscing. Elit duis tristique
                        sollicitudin nibh sit amet. Ultrices eros in cursus turpis. Ultricies
                        tristique nulla aliquet enim tortor at auctor urna nunc.
                    </p>
                </div>

                {/* Right Section: Accordion */}
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border-b border-gray-300 dark:border-gray-700">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                            >
                                <span className="text-lg font-medium">{faq.question}</span>
                                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                            {openIndex === index && (
                                <div className="pb-4 text-gray-700 dark:text-gray-400">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductFaqAccordion;
