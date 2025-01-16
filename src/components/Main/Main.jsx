import React from 'react';
import Navbar from '../../Pages/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Main = () => {
    return (
        <div className='bg-white'>
            <Navbar />
            <div className='min-h-[calc(90vh-40px)]'>
                <Outlet />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;