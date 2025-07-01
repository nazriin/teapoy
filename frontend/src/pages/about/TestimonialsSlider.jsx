import React from 'react';

const TestimonialsSlider = () => {
    const testimonials = [
        {
            id: 1,
            image: "https://wellingtons-hotel.myshopify.com/cdn/shop/files/user_1.png?v=1742194583&width=2000",
            rating: 5,
            text: "An unforgettable stay with breathtaking views and top-notch service. Every detail was perfect, making it a truly luxurious experience!",
            name: "Olivia Wilson",
            role: "Customer"
        },
        {
            id: 2,
            image: "https://wellingtons-hotel.myshopify.com/cdn/shop/files/user_2.png?v=1742194583&width=2000",
            rating: 5,
            text: "An unforgettable stay with breathtaking views and top-notch service. Every detail was perfect, making it a truly luxurious experience!",
            name: "Jason K. Manafo",
            role: "Customer"
        },
        {
            id: 3,
            image: "https://wellingtons-hotel.myshopify.com/cdn/shop/files/user_1.png?v=1742194583&width=2000",
            rating: 5,
            text: "Exceptional hospitality and stunning accommodations. The staff went above and beyond to ensure our comfort throughout our stay.",
            name: "Michael Chen",
            role: "Customer"
        },
        {
            id: 4,
            image: "https://wellingtons-hotel.myshopify.com/cdn/shop/files/user_2.png?v=1742194583&width=2000",
            rating: 5,
            text: "A perfect blend of luxury and comfort. The attention to detail and personalized service made our vacation truly memorable.",
            name: "Sarah Johnson",
            role: "Customer"
        }
    ];

    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

    React.useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 2)) % Math.ceil(testimonials.length / 2));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-orange-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block">
            <span className="text-orange-400 text-sm font-medium tracking-wider uppercase mb-2 block">
              TESTIMONIALS
            </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Trusted Reviews from
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-orange-400">
                            Our Guests
                        </h3>
                    </div>
                </div>

                <div className="relative">
                    <div
                        className="overflow-hidden"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, slideIndex) => (
                                <div key={slideIndex} className="w-full flex-shrink-0">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
                                        {testimonials.slice(slideIndex * 2, slideIndex * 2 + 2).map((testimonial) => (
                                            <div
                                                key={testimonial.id}
                                                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                            >
                                                <div className="flex items-start space-x-6">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={testimonial.image}
                                                            alt={testimonial.name}
                                                            className="w-20 h-20 rounded-xl object-cover shadow-md"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center space-x-1 mb-4">
                                                            {renderStars(testimonial.rating)}
                                                        </div>
                                                        <blockquote className="text-gray-700 text-base leading-relaxed mb-6">
                                                            "{testimonial.text}"
                                                        </blockquote>
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                                                {testimonial.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-500">
                                                                {testimonial.role}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:bg-gray-50"
                        aria-label="Previous testimonials"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:bg-gray-50"
                        aria-label="Next testimonials"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                currentSlide === index ? 'bg-orange-400' : 'bg-gray-300'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSlider;