import React from 'react';
import { FaAddressBook, FaHome, FaMagic, FaServer, FaUpload, FaUser } from 'react-icons/fa';
import { FcViewDetails } from 'react-icons/fc';
import { MdOutlineRateReview, MdOutlineRequestPage, MdPayment, MdReviews, MdUpcoming } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {

    const [isAdmin] = useAdmin()

    return (
        <div className='flex w-11/12 mx-auto'>
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className='menu p-2'>
                    {
                        isAdmin ? <>
                            <li className='text-xl'>
                                <NavLink to='/dashboard/adminProfile'> <FaUser></FaUser> Admin Profile</NavLink>
                            </li>
                            <li className='text-xl'>
                                <NavLink to='/dashboard/manageUser'> <MdOutlineRequestPage /> Manage Users</NavLink>
                            </li>
                            <li className='text-xl'>
                                <NavLink to='/dashboard/addMeal'> <FaAddressBook /> Add Meal</NavLink>
                            </li>
                            <li className='text-xl'>
                                <NavLink to='/dashboard/allMeal'> <FcViewDetails /> All Meals</NavLink>
                            </li>
                            <li className='text-xl'>
                                <NavLink to='/dashboard/allReview'> <MdOutlineRateReview /> All Reviews</NavLink>
                            </li>
                            <li className='text-xl'>
                                <NavLink to='/dashboard/allReview'> <FaServer></FaServer> Serve Meals</NavLink>
                            </li>
                            <li className='text-xl'>
                                <NavLink to='/dashboard/allReview'> <MdUpcoming /> Upcoming Meals</NavLink>
                            </li>
                        </>
                            : <>
                                <li className='text-xl'>
                                    <NavLink to='dashboard/profile'> <FaUser></FaUser> My Profile</NavLink>
                                </li>
                                <li className='text-xl'>
                                    <NavLink to='dashboard/profile'> <MdOutlineRequestPage /> Requested Meals</NavLink>
                                </li>
                                <li className='text-xl'>
                                    <NavLink to='dashboard/profile'> <MdReviews /> My Reviews</NavLink>
                                </li>
                                <li className='text-xl'>
                                    <NavLink to='dashboard/profile'> <MdPayment /> Payment History</NavLink>
                                </li>
                            </>
                    }
                </ul>
                <div className="divider"></div>
                <ul className='menu'>
                    <li className='text-xl'><Link to='/'><FaHome></FaHome> Home</Link></li>
                    <li className='text-xl'><Link to='/'><FaMagic></FaMagic> Meals</Link></li>
                    <li className='text-xl'><Link to='/'><FaUpload></FaUpload> Upcoming Meals</Link></li>
                </ul>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;