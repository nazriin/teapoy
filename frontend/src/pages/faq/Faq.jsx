import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Building, CreditCard, Wrench, FileText } from 'lucide-react';

export default function FAQAccordion() {
    const [openSections, setOpenSections] = useState({});
    const [activeCategory, setActiveCategory] = useState('Beach');

    const categories = [
        { name: 'Beach', icon: MessageCircle },
        { name: 'Hotel', icon: Building },
        { name: 'Payment', icon: CreditCard },
        { name: 'Services', icon: Wrench },
        { name: 'Terms and conditions', icon: FileText }
    ];

    const faqData = {
        Beach: [
            { id: 1, question: 'Where can I get some?', answer: 'You can get beach equipment and accessories at our beachfront rental station. We offer umbrellas, chairs, water sports equipment, and more. Visit our main desk for availability and pricing.' },
            { id: 2, question: 'Why do we use it?', answer: 'Beach facilities are used to enhance your comfort and safety while enjoying the sun and sea. Our equipment helps protect you from UV rays and provides comfortable seating for relaxation.' },
            { id: 3, question: 'Where does it come from?', answer: 'Our beach equipment comes from certified suppliers who specialize in marine and outdoor recreation gear. All items are regularly maintained and sanitized for your safety.' },
            { id: 4, question: 'What is Lorem Ipsum?', answer: 'Lorem Ipsum is simply dummy text used in the printing and typesetting industry. It has been the industry standard dummy text ever since the 1500s.' }
        ],
        Hotel: [
            { id: 1, question: 'Where can I get some room in Hotel?', answer: 'You can book hotel rooms through our online reservation system, by calling our front desk, or by visiting us in person. We offer various room types from standard to luxury suites.' },
            { id: 2, question: 'Why do we use it in Hotel?', answer: 'Hotel booking systems help us manage reservations efficiently, ensure room availability, and provide you with the best possible service during your stay.' },
            { id: 3, question: 'Where does it come from Hotel?', answer: 'Our hotel management system is powered by industry-leading hospitality software that integrates with global distribution systems to offer real-time availability.' },
            { id: 4, question: 'What is Lorem Ipsum Hotel?', answer: 'Lorem Ipsum in hotel context refers to placeholder content used in website development and marketing materials before final content is ready.' }
        ],
        Payment: [
            { id: 1, question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, PayPal, and bank transfers. Cash payments are also accepted at our front desk.' },
            { id: 2, question: 'When is payment due?', answer: 'Payment is typically due at the time of booking for online reservations, or upon check-in for walk-in guests. Extended stays may have different payment schedules.' },
            { id: 3, question: 'Are there any additional fees?', answer: 'Additional fees may include resort fees, parking, WiFi (if not included), and optional services like spa treatments or excursions.' },
            { id: 4, question: 'What is your refund policy?', answer: 'Refund policies vary by rate type and booking conditions. Please review your booking confirmation or contact our staff for specific refund terms.' }
        ],
        Services: [
            { id: 1, question: 'What services do you offer?', answer: 'We offer concierge services, room service, laundry, spa treatments, excursion bookings, airport transfers, and 24-hour front desk assistance.' },
            { id: 2, question: 'Are services available 24/7?', answer: 'Our front desk operates 24/7. Other services have specific hours - room service until 11 PM, spa from 9 AM to 8 PM, and concierge from 7 AM to 10 PM.' },
            { id: 3, question: 'How do I book additional services?', answer: 'You can book services through our mobile app, by calling the front desk, or by visiting our concierge desk in the lobby.' },
            { id: 4, question: 'Do services cost extra?', answer: 'Some services are complimentary (WiFi, gym access), while others incur additional charges (spa treatments, room service, excursions). Pricing is available upon request.' }
        ],
        'Terms and conditions': [
            { id: 1, question: 'What are your check-in/check-out times?', answer: 'Standard check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request and subject to availability.' },
            { id: 2, question: 'What is your cancellation policy?', answer: 'Cancellation policies vary by rate and season. Standard bookings can typically be cancelled 24-48 hours before arrival without penalty. Special rates may have stricter policies.' },
            { id: 3, question: 'Are pets allowed?', answer: 'We are a pet-friendly hotel with designated pet-friendly rooms. Additional fees apply, and advance notice is required. Service animals are always welcome.' },
            { id: 4, question: 'What is your smoking policy?', answer: 'Our property is smoke-free. Smoking is only permitted in designated outdoor areas. Violation of this policy may result in cleaning fees.' }
        ]
    };

    const toggleSection = (sectionId) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const getCategoryIcon = (categoryName) => {
        const category = categories.find(cat => cat.name === categoryName);
        const IconComponent = category?.icon || MessageCircle;
        return <IconComponent className="w-5 h-5" />;
    };
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateName = (name) => {
        if (!name.trim()) return 'The field is required.';
        if (name.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
    };

    const validateEmail = (email) => {
        if (!email.trim()) return 'The field is required.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    };

    const validateMessage = (message) => {
        if (!message.trim()) return 'The field is required.';
        if (message.trim().length < 10) return 'Message must be at least 2 charactersr';
        return '';
    };

    const validateForm = () => {
        const newErrors = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            message: validateMessage(formData.message)
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        if (touched[field]) {
            const error = field === 'name' ? validateName(value) :
                field === 'email' ? validateEmail(value) :
                    validateMessage(value);
            setErrors(prev => ({ ...prev, [field]: error }));
        }
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const error = field === 'name' ? validateName(formData[field]) :
            field === 'email' ? validateEmail(formData[field]) :
                validateMessage(formData[field]);
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleSubmit = () => {
        setTouched({ name: true, email: true, message: true });

        if (validateForm()) {
            setIsSubmitting(true);

            setTimeout(() => {
                alert('Mesajınız gönderildi!');
                setFormData({ name: '', email: '', message: '' });
                setErrors({});
                setTouched({});
                setIsSubmitting(false);
            }, 1000);
        }
    };


    return (
        <>
            <section className="relative h-[390px] bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://wellingtons-hotel.myshopify.com/cdn/shop/files/breadcrumb.png?v=1742451376"
                        alt="Luxurious interior with warm lighting and wooden panels"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
                </div>

                <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="text-center mb-8 lg:mb-12">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wider">
                                FAQ
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    ></div>
                </div>
            </section>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
                                <nav className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.name}
                                            onClick={() => setActiveCategory(category.name)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                                                activeCategory === category.name
                                                    ? 'bg-amber-700 text-white shadow-md transform scale-105'
                                                    : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                                            }`}
                                        >
                                            <category.icon className="w-5 h-5" />
                                            <span className="font-medium">{category.name}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-amber-700 to-amber-800 p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        {getCategoryIcon(activeCategory)}
                                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                                            {activeCategory}
                                        </h1>
                                    </div>
                                    <p className="text-amber-100">
                                        Find answers to frequently asked questions about {activeCategory.toLowerCase()}.
                                    </p>
                                </div>

                                <div className="p-6 md:p-8">
                                    <div className="space-y-4">
                                        {faqData[activeCategory]?.map((faq) => {
                                            const sectionKey = `${activeCategory}-${faq.id}`;
                                            const isOpen = openSections[sectionKey];

                                            return (
                                                <div
                                                    key={faq.id}
                                                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
                                                >
                                                    <button
                                                        onClick={() => toggleSection(sectionKey)}
                                                        className="w-full flex items-center justify-between p-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex-shrink-0 w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                                                                {faq.id}
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-800 pr-4">
                                                                {faq.question}
                                                            </h3>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            {isOpen ? (
                                                                <ChevronUp className="w-5 h-5 text-gray-500" />
                                                            ) : (
                                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                                            )}
                                                        </div>
                                                    </button>

                                                    <div
                                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                        }`}
                                                    >
                                                        <div className="p-6 bg-white border-t border-gray-100">
                                                            <p className="text-gray-700 leading-relaxed">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Didn't find the answer?
                        </h1>
                        <p className="text-gray-600">
                            Get in touch with us and we'll help you out
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        onBlur={() => handleBlur('name')}
                                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent ${
                                            touched.name && errors.name
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-200 bg-gray-50 focus:bg-white'
                                        }`}
                                    />
                                    {touched.name && errors.name && (
                                        <div className="text-red-500 text-sm">{errors.name}</div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        onBlur={() => handleBlur('email')}
                                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent ${
                                            touched.email && errors.email
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-200 bg-gray-50 focus:bg-white'
                                        }`}
                                    />
                                    {touched.email && errors.email && (
                                        <div className="text-red-500 text-sm">{errors.email}</div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
              <textarea
                  placeholder="Message"
                  rows="6"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent resize-none ${
                      touched.message && errors.message
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-200 bg-gray-50 focus:bg-white'
                  }`}
              />
                                {touched.message && errors.message && (
                                    <div className="text-red-500 text-sm">{errors.message}</div>
                                )}
                            </div>

                            <div className="flex flex-col space-y-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto px-8 py-3 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Sending...</span>
                                        </div>
                                    ) : (
                                        'Send'
                                    )}
                                </button>

                                <p className="text-sm text-gray-500 text-center md:text-left">
                                    *We promise not to disclose your personal information to third parties.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <ChevronUp className="w-4 h-4" />
                        Back to Top
                    </button>
                </div>
            </div>

        </>
    );
}