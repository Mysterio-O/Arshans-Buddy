import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

const TextInput = ({ onSend, onVoiceToggle, isSpeaking }) => {
    const [inputText, setInputText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            onSend(inputText);
            setInputText(''); // Clear input
        }
    };

    const handleChange = (e) => {
        setInputText(e.target.value);
    };
    console.log(inputText);

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex items-center space-x-3 p-4 bg-[#E8F5E9] dark:bg-[#1B262C] rounded-lg shadow-md"
        >
            <input
                type="text"
                value={inputText}
                onChange={handleChange}
                className="w-full p-3 rounded-full bg-[#C8E6C9] dark:bg-[#2F4F4F] text-[#333333] dark:text-[#E0E0E0] 
                    focus:outline-none focus:ring-2 focus:ring-[#FFCC80] dark:focus:ring-[#FFA726] 
                    placeholder-[#666666] dark:placeholder-[#A0A0A0] transition-all duration-300"
                placeholder="Type your message..."
            />
            {
                inputText && <motion.button
                    type="submit"
                    className="p-3 rounded-full bg-[#FFCC80] dark:bg-[#FFA726] text-[#333333] dark:text-[#E0E0E0] 
                    hover:bg-[#A5D6A7] dark:hover:bg-[#3E606F] transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                </motion.button>
            }
            <motion.button
                type="button"
                onClick={()=> navigate('/voice-assistant')}
                className={`p-3 rounded-full ${isSpeaking ? 'bg-[#FFCC80] dark:bg-[#FFA726]' : 'bg-[#A5D6A7] dark:bg-[#3E606F]'} 
                    text-[#333333] dark:text-[#E0E0E0] hover:bg-[#FFF59D] dark:hover:bg-[#FFD54F] 
                    transition-all duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <svg
                    className={`w-6 h-6 ${isSpeaking ? 'text-[#333333]' : 'text-[#333333] dark:text-[#E0E0E0]'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    {isSpeaking ? (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    ) : (
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    )}
                </svg>
            </motion.button>
        </form>
    );
};

export default TextInput;