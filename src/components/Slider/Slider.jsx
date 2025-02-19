import React from 'react';
import bgImg from '../../assets/banner.avif'

const Slider = () => {
    return (
        <div className="relative bg-cover bg-center h-[400px] flex items-center justify-center m-0 p-0" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center text-white max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to Our Hostel Management System
                </h1>
                <p className="text-lg mb-6">
                    Manage your hostel effortlessly! Explore room availability, track student records, and handle payments with ease.
                </p>
                <div className="flex items-center justify-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="px-4 py-2 rounded-l-md border-none outline-none w-64"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Slider;
