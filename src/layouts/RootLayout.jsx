import React from 'react';
import Scroll from '../pages/Scroll/Scroll';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div className='bg-[#E8F5E9] dark:bg-[#1B262C] transition-colors duration-300'>
            <Scroll />
            <div className='max-w-[1600px] mx-auto'>
                <nav className='sticky top-0 z-[50]'>
                    <Navbar />
                </nav>
                <main>
                    <Outlet />
                </main>
                <footer>
                    {/* <Footer /> */}
                    {/* place your footer here */}
                </footer>
            </div>
        </div>
    );
};

export default RootLayout;