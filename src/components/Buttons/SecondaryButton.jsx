import React from 'react';

const SecondaryButton = ({text, action}) => {
    return (
        <button
            onClick={action}
            className="w-full px-4 py-2 text-left text-[#333333] dark:text-[#E0E0E0] hover:bg-[#A5D6A7] dark:hover:bg-[#3E606F] transition-colors"
        >
            {text}
        </button>
    );
};

export default SecondaryButton;