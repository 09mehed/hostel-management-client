import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Hotel.jpg'
import useAuth from '../../hooks/useAuth';
import avatarImg from '../../assets/placeholder.jpg'

const Navbar = () => {
    const { user, logout } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = () => {
        logout()
    }

    const links = <>
        <li className='text-xl'><Link to='/'>Home</Link></li>
        <li className='text-xl'><Link to='/'>Meals</Link></li>
        <li className='text-xl'><Link to='/'>Upcoming Meals</Link></li>
    </>

    return (
        <div className='sticky top-0 z-50 bg-base-100'>
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">
                        <img className='w-8 h-8' src={logo} alt="" />
                        Hostel Management
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='relative'>
                        <div className='flex flex-row items-center gap-3'>
                            {/* Dropdown btn */}
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                            >
                                <div className='hidden md:block'>
                                    {/* Avatar */}
                                    <img
                                        className='rounded-full'
                                        referrerPolicy='no-referrer'
                                        src={user && user.photoURL ? user.photoURL : avatarImg}
                                        alt='profile'
                                        height='30'
                                        width='30'
                                    />
                                </div>
                            </div>
                        </div>
                        {isOpen && (
                            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm z-50'>
                                <div className='flex flex-col cursor-pointer'>
                                    <Link
                                        to='/'
                                        className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                    >
                                        Home
                                    </Link>

                                    {user ? (
                                        <>
                                            <Link
                                                to='/dashboard/profile'
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                            >
                                                Dashboard
                                            </Link>
                                            <div
                                                onClick={handleLogout}
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                            >
                                                Logout
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to='/signin'
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to='/signup'
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;