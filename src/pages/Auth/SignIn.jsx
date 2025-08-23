import React from 'react';
import GoogleLoginButton from '../../shared/GoogleLoginButton';

const SignIn = () => {
    return (
        <div className='w-full login h-screen flex items-center justify-center'>
            <GoogleLoginButton />
        </div>
    );
};

export default SignIn;