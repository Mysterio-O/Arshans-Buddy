import React from 'react';
import logo from '../../assets/Logo.webp'
import { useNavigate } from 'react-router';
import AuthButtons from '../Buttons/AuthButtons';

const Navbar = () => {

    const navigate = useNavigate();

    const buttonData = [
        {
            id: 1,
            title: 'SignIn',
            type: 'signin',
            onclick: () => navigate('/auth/signin')
        },
        {
            id: 2,
            title: 'Register',
            type: 'signup',
            onclick: () => navigate('/auth/signup')
        }
    ]

    return (
        <div className='sm:max-w-xl mx-auto flex items-center justify-between px-4 py-2'>
            <img
            onClick={()=> navigate('/')}
                className='h-16 w-16 rounded-t-4xl rounded-b-2xl'
                src={logo} alt="" />

            <div
            className='flex indicator-center gap-3'
            >
                {
                    buttonData.map(btn => <span key={btn.id}>
                        <AuthButtons text={btn.title} type={btn.type} onclick={btn.onclick}/>
                    </span>)
                }
            </div>
        </div>
    );
};

export default Navbar;