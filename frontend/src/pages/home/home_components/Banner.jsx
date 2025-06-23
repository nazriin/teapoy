// import React, { useState } from 'react';
// import {
//     FaCouch,
//     FaArchive,
//     FaCubes,
//     FaTable,
//     FaUtensils,
//     FaImage,
//     FaDesktop,
//     FaBoxes
// } from 'react-icons/fa';
//
// function Banner() {
//     const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1588854337119-1b1d6e70d8eb');
//
//     const items = [
//         {
//             icon: <FaCouch className="text-orange-400 text-4xl mb-2 transition-colors duration-300 group-hover:text-orange-500" />,
//             image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Brand-Logo-BG-Images-01.jpg?v=1720442802&width=1920',
//             name: 'Sofa'
//         },
//         {
//             icon: <FaArchive className="text-orange-400 text-4xl mb-2 transition-colors duration-300 group-hover:text-orange-500" />,
//             image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Brand-Logo-BG-Images-02.jpg?v=1720442803&width=1920',
//             name: 'Cabinet'
//         },
//         {
//             icon: <FaCubes className="text-orange-400 text-4xl mb-2 transition-colors duration-300 group-hover:text-orange-500" />,
//             image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Brand-Logo-BG-Images-03.jpg?v=1720442803&width=1920',
//             name: 'Shelving Units'
//         },
//         {
//             icon: <FaTable className="text-orange-400 text-4xl mb-2 transition-colors duration-300 group-hover:text-orange-500" />,
//             image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Brand-Logo-BG-Images-04.jpg?v=1720442803&width=1920',
//             name: 'Tea Table'
//         },
//         {
//             icon: <FaUtensils className="text-orange-400 text-4xl mb-2 transition-colors duration-300 group-hover:text-orange-500" />,
//             image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Brand-Logo-BG-Images-05.jpg?v=1720442803&width=1920',
//             name: 'Kitchen Furniture'
//         },
//         {
//             icon: <FaImage className="text-orange-400 text-4xl mb-2 transition-colors duration-300 group-hover:text-orange-500" />,
//             image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Brand-Logo-BG-Images-06.jpg?v=1720442803&width=1920',
//             name: 'Decors'
//         },
//         {
//             icon: <FaDesktop className="text-orange-400 text-4xl mb-2 transition-colors duration-300 group-hover:text-orange-500" />,
//             image: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5',
//             name: 'Office Table'
//         },
//         {
//             icon: <FaBoxes className="text-orange-400 text-4xl mb-2 transition-colors duration-300 group-hover:text-orange-500" />,
//             image: 'https://images.unsplash.com/photo-1581349482257-9f99c4a84b6b',
//             name: 'Storage Furniture'
//         }
//     ];
//
//     const handleMouseEnter = (image) => setBackgroundImage(image);
//     const handleMouseLeave = () => setBackgroundImage(items[0].image);
//
//     return (
//         <div
//             className="relative bg-cover bg-center transition-all duration-500"
//             style={{ backgroundImage: `url(${backgroundImage})` }}
//         >
//             <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
//             <div className="relative z-20 min-h-[50vh] flex flex-wrap justify-center items-center text-center px-4">
//                 {items.map((item, index) => (
//                     <div
//                         key={index}
//                         className="w-1/2 md:w-1/4 p-5 group cursor-pointer transition-transform duration-300 hover:scale-105 text-gray-400 hover:text-white"
//                         onMouseEnter={() => handleMouseEnter(item.image)}
//                         onMouseLeave={handleMouseLeave}
//                     >
//                         {item.icon}
//                         <h2 className="text-sm mt-1">{item.name}</h2>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// export default Banner;

import React, { useState } from 'react';
import {
    FaCouch,
    FaArchive,
    FaCubes,
    FaTable,
    FaUtensils,
    FaImage,
    FaDesktop,
    FaBoxes
} from 'react-icons/fa';

function Banner() {
    const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1588854337119-1b1d6e70d8eb');

    const items = [
        {
            icon: <FaCouch className="text-orange-400 text-2xl transition-colors duration-300 group-hover:text-orange-500" />,
            image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/sofa.jpg?v=1720176987&width=1780',
            name: 'Sofa'
        },
        {
            icon: <FaArchive className="text-orange-400 text-2xl transition-colors duration-300 group-hover:text-orange-500" />,
            image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/cabinet.jpg?v=1720177111&width=1780',
            name: 'Cabinet'
        },
        {
            icon: <FaCubes className="text-orange-400 text-2xl transition-colors duration-300 group-hover:text-orange-500" />,
            image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Shelving_Units.jpg?v=1720177362&width=1780',
            name: 'Shelving Units'
        },
        {
            icon: <FaTable className="text-orange-400 text-2xl transition-colors duration-300 group-hover:text-orange-500" />,
            image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Tea_Table.jpg?v=1720177382&width=1780',
            name: 'Tea Table'
        },
        {
            icon: <FaUtensils className="text-orange-400 text-2xl transition-colors duration-300 group-hover:text-orange-500" />,
            image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Kitchen_Furniture.jpg?v=1720177452&width=1780',
            name: 'Kitchen Furniture'
        },
        {
            icon: <FaImage className="text-orange-400 text-2xl transition-colors duration-300 group-hover:text-orange-500" />,
            image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Decors.jpg?v=1720177402&width=1780',
            name: 'Decors'
        },
        {
            icon: <FaDesktop className="text-orange-400 text-2xl transition-colors duration-300 group-hover:text-orange-500" />,
            image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Office_Table.jpg?v=1720177416&width=1780',
            name: 'Office Table'
        },
        {
            icon: <FaBoxes className="text-orange-400 text-2xl transition-colors duration-300 group-hover:text-orange-500" />,
            image: 'https://wdt-teapoy.myshopify.com/cdn/shop/files/Storage_Furniture.jpg?v=1720177435&width=1780',
            name: 'Storage Furniture'
        }
    ];

    const handleMouseEnter = (image) => setBackgroundImage(image);
    const handleMouseLeave = () => setBackgroundImage(items[0].image);

    return (
        <div
            className="relative bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
            <div className="relative z-20 min-h-[50vh] flex flex-wrap justify-center items-center text-center px-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="w-1/2 md:w-1/4 p-5 group cursor-pointer transition-transform duration-300 hover:scale-105 text-gray-400 hover:text-white"
                        onMouseEnter={() => handleMouseEnter(item.image)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="flex items-center justify-center gap-x-2">
                            {item.icon}
                            <h2 className="text-sm">{item.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Banner;

