import React from 'react';
import Scroll from '../pages/Scroll/Scroll';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div className='bg-[#E8F5E9] min-h-screen dark:bg-[#1B262C] transition-colors duration-300'>
            <Scroll />
            <div className='max-w-[1600px] mx-auto'>
                <nav className='sticky top-0 z-[50]'>
                    <Navbar />
                </nav>
                <main className='min-h-[calc(100vh-120px)] place-items-center place-content-center'>
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