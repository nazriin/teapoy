import React, { Component, createRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "Premium Pet Foods",
        description: "Sed elementum tempus egestas sed sed risus pretium",
        image:
            "https://morkie.qodeinteractive.com/wp-content/uploads/2023/10/main-home-rev-img-0001.jpg",
        alignment: "justify-start items-center text-left",
        padding: "pl-8 md:pl-20 pr-8 md:pr-40",
    },
    {
        id: 2,
        title: "Healthy Pet Treats",
        description: "Dolor sit amet consectetur adipiscing elit",
        image:
            "https://morkie.qodeinteractive.com/wp-content/uploads/2023/10/main-home-rev-image-0002.jpg",
        alignment: "justify-center items-center text-center",
        padding: "",
    },
    {
        id: 3,
        title: "Natural Ingredients",
        description: "Egestas purus viverra accumsan in nisl nisi",
        image:
            "https://morkie.qodeinteractive.com/wp-content/uploads/2023/10/main-home-rev-slide-003.jpg",
        alignment: "justify-end items-center text-right",
        padding: "pr-8 md:pr-20 pl-8 md:pl-40",
    },
];

class HeroSlider extends Component {
    constructor(props) {
        super(props);
        this.prevRef = createRef();
        this.nextRef = createRef();
    }

    render() {
        return (
            <div className="relative w-full h-[90vh]">
                <Swiper
                    loop={true}
                    navigation={{
                        prevEl: this.prevRef.current,
                        nextEl: this.nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = this.prevRef.current;
                        swiper.params.navigation.nextEl = this.nextRef.current;
                    }}
                    modules={[Navigation]}
                    className="h-full"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div
                                className="w-full h-full bg-cover bg-center flex"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                }}
                            >
                                <div
                                    className={`flex ${slide.alignment} w-full h-full px-6`}
                                >
                                    <div
                                        className={`max-w-2xl mt-12 ${slide.padding}`}
                                    >
                                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                                            {slide.title}
                                        </h2>
                                        <p className="text-base md:text-lg text-white mb-6">
                                            {slide.description}
                                        </p>
                                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-medium transition-all">
                                            SHOP NOW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    {/* Navigation Buttons */}
                    <button
                        ref={this.prevRef}
                        className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-10 border border-white bg-transparent hover:bg-white/20 p-2 rounded-full"
                    >
                        <ChevronLeft className="text-white w-6 h-6" />
                    </button>
                    <button
                        ref={this.nextRef}
                        className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-10 border border-white bg-transparent hover:bg-white/20 p-2 rounded-full"
                    >
                        <ChevronRight className="text-white w-6 h-6" />
                    </button>
                </Swiper>
            </div>
        );
    }
}

export default HeroSlider;
