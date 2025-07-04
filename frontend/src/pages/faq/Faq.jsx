// src/components/Faq.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector if you plan to use it

const FAQPage = () => {
    // State for managing open question and active category using useState hook
    const [openQuestion, setOpenQuestion] = useState(null); // Holds the index of the currently open question
    const [activeCategory, setActiveCategory] = useState('Veterinary Services'); // Default active category

    // You can uncomment and use useSelector here if you need to access Redux state
    // const someReduxState = useSelector(state => state.someSlice.someValue);

    const faqs = [
        {
            category: 'Veterinary Services',
            questions: [
                {
                    q: 'What veterinary services do you offer?',
                    a: 'Our veterinary clinic offers examinations, vaccinations, deworming, surgery, dental care, laboratory analyses, and emergency services.',
                },
                {
                    q: 'How can I schedule a veterinary appointment?',
                    a: 'You can schedule an appointment by filling out the online appointment form on our website or by contacting us directly by phone.',
                },
                {
                    q: 'Are emergency veterinary services available?',
                    a: 'Yes, we offer emergency veterinary services during specific hours. Please contact us as soon as possible in case of an emergency.',
                },
                {
                    q: 'Where can I find my pet\'s vaccination schedule?',
                    a: 'Our veterinarian will create a personalized vaccination schedule based on your pet\'s age, species, and health condition. We recommend coming in for an examination to determine this.',
                },
            ],
        },
        {
            category: 'Pet Shop Products',
            questions: [
                {
                    q: 'What pet food brands do you offer?',
                    a: 'We offer a wide range of high-quality pet food brands, including premium names like Royal Canin, Hill\'s Science Diet, Acana, Orijen, and Purina Pro Plan. Our staff can help you choose the right food for your pet\'s specific needs.',
                },
                {
                    q: 'Are toys and accessories available?',
                    a: 'Yes, we have a wide selection of toys, beds, walking accessories, food bowls, and other supplies for pets.',
                },
                {
                    q: 'Do you sell pet clothing?',
                    a: 'We offer various sizes and styles of clothing for some small pets and dogs. Seasonal and holiday attire are also included in our selection.',
                },
                {
                    q: 'Are cleaning and hygiene products available?',
                    a: 'Yes, we offer a wide range of cleaning products such as shampoos, brushes, litter box supplies, and odor neutralizers.',
                },
            ],
        },
        {
            category: 'Pet Adoption',
            questions: [
                {
                    q: 'What is the adoption process like?',
                    a: 'The adoption process involves filling out an application form, an interview, a home visit (in some cases), and signing an adoption agreement.',
                },
                {
                    q: 'What types of pets can I adopt?',
                    a: 'Our shelter has various breeds and ages of dogs, cats, and sometimes other small pets available. You can view the list of available animals on our website.',
                },
                {
                    q: 'What are the requirements for adoption?',
                    a: 'The main requirements include being over 18 years old, having a stable income, and suitable living conditions to care for an animal. Please read our adoption policy for detailed information.',
                },
                {
                    q: 'Is there an adoption fee?',
                    a: 'Yes, there is an adoption fee. This fee helps cover the costs of the animal\'s spaying/neutering, vaccinations, and microchipping.',
                },
            ],
        },
        {
            category: 'Grooming',
            questions: [
                {
                    q: 'What grooming services do you offer?',
                    a: 'Our grooming services include bathing, hair trimming, nail clipping, ear cleaning, teeth brushing, and other personalized grooming needs.',
                },
                {
                    q: 'How can I book a grooming appointment?',
                    a: 'You can book an appointment by contacting us by phone or by scheduling in person at our grooming salon. An online appointment system is also available.',
                },
                {
                    q: 'What are the prices for your services?',
                    a: 'Prices vary depending on the type, size, breed of the pet, and the type of services required. Please contact us for a detailed price list.',
                },
                {
                    q: 'What do you do if my pet gets stressed during grooming?',
                    a: 'Our experienced groomers use a gentle and patient approach to ensure your pet\'s comfort. We provide extra support and breaks for pets with special needs.',
                },
            ],
        },
        {
            category: 'Other Topics',
            questions: [
                {
                    q: 'Do you offer pet insurance?',
                    a: 'Currently, we do not directly offer insurance, but we can provide information about various pet insurance companies and help you choose the most suitable option.',
                },
                {
                    q: 'Is a pet hotel service available?',
                    a: 'Yes, we offer a safe and comfortable pet hotel service for short and long-term stays. Please contact us for detailed information and prices.',
                },
                {
                    q: 'Do you provide training services?',
                    a: 'Yes, we have professional trainers for basic obedience training and addressing behavioral issues for dogs. Both individual and group lessons are organized.',
                },
                {
                    q: 'Is there a coffee or lounge area in your store?',
                    a: 'Our store features a small lounge area and a coffee machine where you can relax while shopping or waiting for a veterinary appointment.',
                },
            ],
        },
    ];

    const toggleQuestion = (index) => {
        setOpenQuestion(prevOpenQuestion => prevOpenQuestion === index ? null : index);
    };

    const handleSetActiveCategory = (categoryName) => {
        setActiveCategory(categoryName);
        setOpenQuestion(null); // Close any open questions when switching categories
    };

    const currentCategoryData = faqs.find(
        (cat) => cat.category === activeCategory
    );

    return (
        <div className="container mx-auto px-4 py-8 bg-rose-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-10 md:text-5xl text-rose-800 dark:text-rose-400">
                Frequently Asked Questions
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/4 rounded-xl p-6 bg-white shadow-lg dark:bg-gray-800 dark:shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b text-rose-700 border-rose-300 dark:text-rose-300 dark:border-rose-600">Topics</h2>
                    <nav>
                        <ul>
                            {faqs.map((cat, index) => (
                                <li key={index} className="mb-2">
                                    <button
                                        className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200
                                            ${activeCategory === cat.category
                                            ? 'bg-rose-600 text-white font-bold shadow-md dark:bg-rose-700'
                                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-gray-700 dark:text-rose-100 dark:hover:bg-gray-600'
                                        }`}
                                        onClick={() => handleSetActiveCategory(cat.category)}
                                    >
                                        {cat.category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="w-full lg:w-3/4">
                    {currentCategoryData && (
                        <div>
                            <h2 className="text-3xl font-semibold mb-6 pb-2 border-b-2 text-rose-700 border-rose-300 dark:text-rose-300 dark:border-rose-600">
                                {currentCategoryData.category}
                            </h2>
                            {currentCategoryData.questions.map((faq, index) => (
                                <div key={index} className="mb-4 rounded-xl overflow-hidden bg-white shadow-lg dark:bg-gray-800 dark:shadow-md">
                                    <button
                                        className={`w-full flex justify-between items-center p-5 text-left text-lg font-medium focus:outline-none transition-colors duration-300
                                            text-rose-800 hover:bg-rose-50 dark:text-rose-200 dark:hover:bg-gray-700`}
                                        onClick={() => toggleQuestion(index)}
                                    >
                                        <span>{faq.q}</span>
                                        <svg
                                            className={`w-6 h-6 transform transition-transform duration-300 ${
                                                openQuestion === index ? 'rotate-180' : ''
                                            } text-rose-600 dark:text-rose-300`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
                                    </button>
                                    <div
                                        className={`
                                            px-5 pb-5 leading-relaxed border-t
                                            transition-all duration-500 ease-in-out
                                            text-gray-700 border-rose-200 dark:text-gray-300 dark:border-rose-700
                                            ${openQuestion === index ? 'max-h-96 opacity-100 pt-2' : 'max-h-0 opacity-0'}
                                        `}
                                    >
                                        <p>{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {!currentCategoryData && (
                        <p className="text-center text-xl mt-10 text-gray-700 dark:text-gray-300">
                            Please select a topic from the left.
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-12 text-center text-gray-700 dark:text-gray-300">
                <p>
                    If you have any further questions, please don't hesitate to contact us. Our team will be happy to help you!
                </p>
                <p className="mt-2">
                    <a href="/contactus" className="text-rose-600 hover:underline dark:text-rose-400">
                        Go to Contact Page
                    </a>
                </p>
            </div>
        </div>
    );
}

export default FAQPage; // Changed export name to match component name