import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Hotel.jpg'
import useAuth from '../../hooks/useAuth';
import { FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa6';

const Navbar = () => {
    const { user, logout, theme, toggleTheme } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout()
    }

    const links = <>
        <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
        <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
        <li><Link to="/review" className="hover:text-blue-400">Review</Link></li>
        {user && (
            <>
                <li><Link to="/meal" className="hover:text-blue-400">Meals</Link></li>
                <li><Link to="/membership" className="hover:text-blue-400">Membership</Link></li>
            </>
        )}
    </>

    return (
        <div className={`sticky top-0 z-50 transition duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <div className="navbar w-11/12 mx-auto py-3">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className={`menu menu-sm dropdown-content transition duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg border rounded w-40 absolute z-50 mt-2`}>
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">
                        <img className='w-8 h-8' src={logo} alt="" />
                        <Link to='/' className='hidden lg:block'>Hostel Management</Link>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <button onClick={toggleTheme} className="text-xl px-5">
                        {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    </button>

                    <div className='relative'>
                        {user ? (
                            // Profile Picture and Dropdown
                            <div className="flex items-center gap-2">
                                <img
                                    src={user.photoURL || '/default-avatar.png'}
                                    alt="profile"
                                    className="w-8 h-8 rounded-full cursor-pointer"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                />
                                {dropdownOpen && (
                                    <ul className="absolute right-10 mt-36 bg-white text-black p-2 rounded shadow-md">
                                        <li className="px-2 py-2 font-semibold">
                                            {user.displayName || 'User'}
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-200">
                                            <Link to="/dashboard">Dashboard</Link>
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            // Join Us Button (If Not Logged In)
                            <Link
                                to="/join-us"
                                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Join Us
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;