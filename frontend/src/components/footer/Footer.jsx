import React, { Component } from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

class PetPathFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isMobile: window.innerWidth < 768 // Initial check for mobile
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({ isMobile: window.innerWidth < 768 });
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handleSubscribe = (e) => {
        e.preventDefault();
        if (this.state.email) {
            console.log('Subscribing email:', this.state.email);
            alert('Thank you for subscribing to our newsletter!');
            this.setState({ email: '' });
        }
    }

    scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    render() {
        const { isMobile } = this.state;

        return (
            <footer
                className="relative text-gray-800 overflow-hidden"
                style={{
                    backgroundImage: "url('https://softivus.com/wp/petiva/wp-content/uploads/2025/03/footer-bg.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: isMobile ? '0 0 0 0' : '50% 50% 0 0',
                    marginTop: '100px'
                }}
            >

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 md:left-20">
                    <div className="flex flex-col space-y-1 opacity-60">
                        <div className="w-6 h-1 bg-yellow-300 rotate-12"></div>
                        <div className="w-8 h-1 bg-yellow-300 rotate-12"></div>
                        <div className="w-4 h-1 bg-yellow-300 rotate-12"></div>
                        <div className="w-6 h-1 bg-yellow-300 rotate-12"></div>
                    </div>
                </div>

                {/* Cat silhouette - left side */}
                <div className="absolute bottom-0 left-0 opacity-20 hidden md:block">
                    <img
                        src="https://softivus.com/wp/petiva/wp-content/themes/petpath/assets/images/cat-vector-2.png"
                        alt="Cat silhouette"
                        className="w-32 h-32 lg:w-48 lg:h-48"
                    />
                </div>

                {/* Dog illustration - right side */}
                <div className="absolute bottom-0 right-0 md:right-10">
                    <img
                        src="https://softivus.com/wp/petiva/wp-content/themes/petpath/assets/images/dog-vector.png"
                        alt="Dog illustration"
                        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
                    />
                </div>

                <div className="relative z-10 container mx-auto px-4 py-12 pt-20">
                    {/* Newsletter Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Subscribe Our Newsletter
                        </h2>
                        <p className="text-gray-700 mb-6 text-sm md:text-base">
                            Get the latest deals and offers right to your inbox
                        </p>

                        <div className="max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 rounded-full border-none outline-none text-gray-700 placeholder-gray-500"
                                />
                                <button
                                    onClick={this.handleSubscribe}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full transition-colors duration-200"
                                >
                                    SUBSCRIBE
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        {/* PetPath Info */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center mb-4">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="https://demo2.themelexus.com/ziggy/wp-content/uploads/2022/05/logo.svg"
                                        alt="Pet Shop Logo"
                                        className="h-16 w-auto"
                                    />
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                Ziggy offers exceptional pet care services including grooming, boarding, and our dedicated team.
                            </p>

                            {/* Social Media Icons */}
                            <div className="flex space-x-3">
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                    <Facebook className="w-5 h-5 text-white" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                    <Twitter className="w-5 h-5 text-white" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                    <Instagram className="w-5 h-5 text-white" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                                    <Youtube className="w-5 h-5 text-white" />
                                </a>
                            </div>
                        </div>

                        {/* Pages - DƏYİŞDİRİLMİŞ HİSSƏ */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Pages</h4>
                            {/* Burada `grid grid-cols-2` və `gap-x-4` əlavə edildi */}
                            <ul className="grid grid-cols-2 gap-x-4">
                                <li><a href="/" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a></li>
                                <li><a href="/aboutus" className="text-gray-700 hover:text-gray-900 transition-colors">About Us</a></li>
                                <li><a href="/pet" className="text-gray-700 hover:text-gray-900 transition-colors">Adoption</a></li>
                                <li><a href="/blog" className="text-gray-700 hover:text-gray-900 transition-colors">Blog</a></li>
                                <li><a href="/shop" className="text-gray-700 hover:text-gray-900 transition-colors">Shop</a></li>
                                {/* Əlavə elementləriniz varsa, onlar da iki sütuna düzüləcək */}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h4>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">Azerbaijan/Sumgait</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-gray-700 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">+994(70)-770-70-70</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-gray-700 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">nazrinnb-azmp203@code.edu.az</span>
                                </div>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div>
                            <div className="bg-yellow-400 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Working Hours</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-800 text-sm">Mon - Fri:</span>
                                        <span className="text-gray-800 text-sm">7am - 6pm</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-800 text-sm">Saturday:</span>
                                        <span className="text-gray-800 text-sm">9am - 4pm</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-800 text-sm">Sunday:</span>
                                        <span className="text-red-600 text-sm">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll to top button */}
                <button
                    onClick={this.scrollToTop}
                    className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200 z-20"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            </footer>
        );
    }
}

export default PetPathFooter;