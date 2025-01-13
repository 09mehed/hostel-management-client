import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
                {/* About Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4">About Us</h2>
                    <p>
                        Hostel Management System is dedicated to providing a seamless and user-friendly platform 
                        to manage hostel operations efficiently. We focus on quality, comfort, and satisfaction 
                        for all our users.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                    <ul>
                        <li className="mb-2">
                            <a href="/" className="hover:underline">Home</a>
                        </li>
                        <li className="mb-2">
                            <a href="/rooms" className="hover:underline">Rooms</a>
                        </li>
                        <li className="mb-2">
                            <a href="/services" className="hover:underline">Services</a>
                        </li>
                        <li className="mb-2">
                            <a href="/contact" className="hover:underline">Contact Us</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                    <p>
                        Address: 123 Hostel Street, City, Bangladesh
                    </p>
                    <p>Email: foysalalmamun558@gmail.com</p>
                    <p>Phone: +8801619388873</p>

                    {/* Social Media Links */}
                    <div className="flex space-x-4 mt-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                            <i className="fab fa-facebook fa-lg"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                            <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                            <i className="fab fa-linkedin fa-lg"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-10 border-t border-gray-700 pt-4">
                <p>© 2025 Hostel Management System. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
