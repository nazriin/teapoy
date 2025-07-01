import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4 transition-all duration-300">
            <button
                className="flex justify-between items-center w-full text-left focus:outline-none hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-semibold text-gray-900 pr-4">{question}</span>
                <svg
                    className={`w-6 h-6 text-indigo-600 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="text-gray-700 text-base leading-relaxed pl-4">{answer}</div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "Otel idarəetmə sistemi nədir?",
            answer: "Otel idarəetmə sistemi otelin gündəlik əməliyyatlarını avtomatlaşdırmaq və səmərəliliyi artırmaq üçün nəzərdə tutulmuş proqram təminatıdır. Bu sistem rezervasiyaların idarə edilməsi, qonaq xidmətləri, ödənişlər və hesabatlar kimi funksiyaları əhatə edir."
        },
        {
            question: "Sistem hansı funksiyaları təklif edir?",
            answer: "Sistem rezervasiya idarəetməsi, otaq təmizliyi planlaşdırması, qonaq qeydiyyatı idarəetməsi, ödəniş və faturalandırma, həmçinin analitik hesabatlar kimi bir çox funksiyanı təklif edir."
        },
        {
            question: "Sistemi mobil cihazlarda istifadə etmək mümkündürmü?",
            answer: "Bəli, sistemimiz responsiv dizaynı sayəsində mobil cihazlar, planşetlər və masaüstü kompüterlərdə problemsiz işləyir."
        },
        {
            question: "Sistemə inteqrasiya necə aparılır?",
            answer: "Sistemimiz API dəstəyi ilə digər platformalarla, məsələn, onlayn rezervasiya sistemləri və ya ödəniş şlüzləri ilə asanlıqla inteqrasiya oluna bilər."
        },
        {
            question: "Dəstək xidmətləri necə təmin olunur?",
            answer: "Biz 7/24 texniki dəstək, onlayn təlimatlar və müştəri xidmətləri təklif edirik. Hər hansı sualınız olarsa, komandamız kömək etməyə hazırdır."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
                    Tez-tez Soruşulan Suallar
                </h1>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;