import React from 'react';

const AuthButtons = ({ text, type, onclick }) => {
    return (
        <button
            onClick={onclick}
            className={`btn ${type === 'signin' ? 'bg-[#FFCC80] text-[#333333] hover:bg-[#FFCC80]/60'
                : type === 'signup' ? "bg-[#333333] hover:bg-[#333333]/60 text-[#FFCC80]"
                    : type === 'logout' ? 'bg-red-400'
                    : ''
                }`}
        >
            {text}
        </button>
    );
};

export default AuthButtons;