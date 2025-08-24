import React, { useState } from 'react';
import BlurText from '../HeadlineReusableComponents/BlurText';
import AIWaveButton from '../AIWaveButton/AIWaveButton';
import ErrorBoundary from '../AIWaveButton/ErrorBoundary';
import TextInput from '../TextInput/TextInput';

const HomeComponent = () => {

    const handleAnimationComplete = () => {
        console.log('animation completed');
    }
    return (
        <div className='flex flex-col justify-between min-h-[calc(100vh-130px)]'>

            {/* headline text */}
            <div>
                <BlurText
                    text="Welcome Arshan!"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-2xl mb-8"
                />
            </div>


            <div>
                <TextInput />
            </div>


        </div>
    );
};

export default HomeComponent;