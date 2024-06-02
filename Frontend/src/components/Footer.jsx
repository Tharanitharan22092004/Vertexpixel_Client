import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGooglePlus, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black">
            <div className="w-full px-6 py-16">
                <div className="flex justify-center space-x-4">
                    <a href="" className="p-2 bg-white rounded-full transition duration-500 hover:bg-gray-900">
                        <FaFacebook className="text-black text-2xl transition duration-500 hover:text-white" />
                    </a>
                    <a href="" className="p-2 bg-white rounded-full transition duration-500 hover:bg-gray-900">
                        <FaInstagram className="text-black text-2xl transition duration-500 hover:text-white" />
                    </a>
                    <a href="" className="p-2 bg-white rounded-full transition duration-500 hover:bg-gray-900">
                        <FaTwitter className="text-black text-2xl transition duration-500 hover:text-white" />
                    </a>
                    <a href="" className="p-2 bg-white rounded-full transition duration-500 hover:bg-gray-900">
                        <FaGooglePlus className="text-black text-2xl transition duration-500 hover:text-white" />
                    </a>
                    <a href="" className="p-2 bg-white rounded-full transition duration-500 hover:bg-gray-900">
                        <FaYoutube className="text-black text-2xl transition duration-500 hover:text-white" />
                    </a>
                </div>
                <div className="mt-8">
                    <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                        <li><a href="/" className="text-white text-lg transition-opacity duration-500 opacity-70 hover:opacity-100">About</a></li>
                        <li><a href="/work" className="text-white text-lg transition-opacity duration-500 opacity-70 hover:opacity-100">Work</a></li>
                        <li><a href="/capabilities" className="text-white text-lg transition-opacity duration-500 opacity-70 hover:opacity-100">Capabilities</a></li>
                        <li><a href="/contact" className="text-white text-lg transition-opacity duration-500 opacity-70 hover:opacity-100">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div className="bg-black py-4 text-center">
                <p className="text-white">Copyright &copy;2023;</p>
            </div>
        </footer>
    );
}

export default Footer;
