import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import logo from '../../assets/Logo.webp';
import AuthButtons from '../Buttons/AuthButtons';
import useAuth from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'motion/react';
import SecondaryButton from '../Buttons/SecondaryButton';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, loading, signOut } = useAuth(); // Assuming useAuth provides signOut
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const buttonData = [
        {
            id: 1,
            title: 'Sign In',
            type: 'signin',
            onclick: () => navigate('/auth/signin')
        },
        {
            id: 2,
            title: 'Register',
            type: 'signup',
            onclick: () => navigate('/auth/signup')
        }
    ];

    const userButtonData = [
        {
            id:1,
            title:'Profile',
            action: ()=> handleProfile()
        },
        {
            id:2,
            title:'Sign Out',
            action: ()=> handleLogOut()
        }
    ]

    const handleLogOut = async () => {
        try {
            await signOut(); // Call signOut from useAuth
            setIsDropdownOpen(false); // Close dropdown
            navigate('/'); // Redirect to home
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleProfile = () => {
        setIsDropdownOpen(false); // Close dropdown
        navigate('/profile'); // Redirect to profile page
    };

    // Default user icon SVG
    const DefaultUserIcon = () => (
        <svg
            className="w-10 h-10 text-[#333333] dark:text-[#E0E0E0]"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                fillRule="evenodd"
                d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"
                clipRule="evenodd"
            />
        </svg>
    );

    return (
        <>
            <div
                className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 py-2 bg-[#E8F5E9] dark:bg-[#1B262C]"
                style={{ zIndex: 1100 }}
            >
                <Link to="/">
                    <img
                        className="h-16 w-16 rounded-t-3xl rounded-b-xl cursor-pointer"
                        src={logo}
                        alt="Logo"
                    />
                </Link>

                <div className="flex items-center gap-3">
                    {!loading && !user && (
                        <>
                            {buttonData.map(btn => (
                                <span key={btn.id}>
                                    <AuthButtons
                                        text={btn.title}
                                        type={btn.type}
                                        onclick={btn.onclick}
                                    />
                                </span>
                            ))}
                        </>
                    )}
                    {!loading && user && (
                        <div className="relative">
                            <motion.div
                                className="cursor-pointer"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {user.photoURL ? (
                                    <img
                                        className="w-10 h-10 rounded-full border-2 border-[#FFCC80] dark:border-[#FFA726]"
                                        src={user.photoURL}
                                        alt="User's photo"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-[#C8E6C9] dark:bg-[#2F4F4F] flex items-center justify-center border-2 border-[#FFCC80] dark:border-[#FFA726]">
                                        <DefaultUserIcon />
                                    </div>
                                )}
                            </motion.div>
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        className="absolute right-0 mt-2 w-48 bg-[#C8E6C9] dark:bg-[#2F4F4F] rounded-lg shadow-lg border border-[#FFCC80] dark:border-[#FFA726] z-50"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {
                                            userButtonData.map(btn => <span key={btn.id}>
                                                <SecondaryButton text={btn.title} action={btn.action}/>
                                            </span>)
                                        }
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full h-[1px] bg-[#333333] dark:bg-[#E0E0E0] opacity-20 mt-2" />
        </>
    );
};

export default Navbar;