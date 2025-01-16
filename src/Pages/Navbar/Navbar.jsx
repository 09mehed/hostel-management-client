import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Hotel.jpg'
import useAuth from '../../hooks/useAuth';
import { FaBell } from 'react-icons/fa';
import { LikeContext } from '../../AuthProvider/LikeProvider';

const Navbar = () => {
    const { user, logout } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { likeCount } = useContext(LikeContext);

    const handleLogout = () => {
        logout()
    }

    const links = <>
        <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
        <li><Link to="/meal" className="hover:text-blue-400">Meals</Link></li>
        <li><Link to="/upcoming-meals" className="hover:text-blue-400">Upcoming Meals</Link></li>
        <li>
            {/* Notification Icon */}
            <button className="relative">
                <FaBell className="text-2xl" />
                {/* Optional: Notification Count */}
                <span className="absolute -top-1 -right-2 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {likeCount}
                </span>
            </button>
        </li>
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

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBell } from 'react-icons/fa';
// import useAuth from '../../hooks/useAuth';

// const Navbar = () => {
//     const { user, logout } = useAuth;
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     // Logout Handler
//     const handleLogout = () => {
//         logout();
//     };

//     return (
//         <nav className="bg-gray-800 text-white py-4">
//             <div className="w-11/12 mx-auto flex justify-between items-center px-6">
//                 {/* Logo */}
//                 <Link to="/" className="text-2xl font-bold hover:text-blue-400">
//                     <span className="text-blue-500">HOSTEL MANAGEMENT</span>
//                 </Link>

//                 {/* Navigation Links */}
//                 <ul className="flex items-center gap-6">
//                     <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
//                     <li><Link to="/meals" className="hover:text-blue-400">Meals</Link></li>
//                     <li><Link to="/upcoming-meals" className="hover:text-blue-400">Upcoming Meals</Link></li>
//                     <li>
//                         {/* Notification Icon */}
//                         <button className="relative">
//                             <FaBell className="text-2xl" />
//                             {/* Optional: Notification Count */}
//                             <span className="absolute -top-1 -right-2 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                                 3
//                             </span>
//                         </button>
//                     </li>

//                     {/* Authentication Section */}
//                     <li className="relative">
//                         {user ? (
//                             // Profile Picture and Dropdown
//                             <div className="flex items-center gap-2">
//                                 <img
//                                     src={user.photoURL || '/default-avatar.png'}
//                                     alt="profile"
//                                     className="w-8 h-8 rounded-full cursor-pointer"
//                                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                                 />
//                                 {dropdownOpen && (
//                                     <ul className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow-md">
//                                         <li className="px-4 py-2 font-semibold">
//                                             Username: {user.displayName || 'User'}
//                                         </li>
//                                         <li className="px-4 py-2 hover:bg-gray-200">
//                                             <Link to="/dashboard">Dashboard</Link>
//                                         </li>
//                                         <li
//                                             className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
//                                             onClick={handleLogout}
//                                         >
//                                             Logout
//                                         </li>
//                                     </ul>
//                                 )}
//                             </div>
//                         ) : (
//                             // Join Us Button (If Not Logged In)
//                             <Link
//                                 to="/join-us"
//                                 className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
//                             >
//                                 Join Us
//                             </Link>
//                         )}
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
