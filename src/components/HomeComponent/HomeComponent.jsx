import React, { useState } from 'react';
import BlurText from '../HeadlineReusableComponents/BlurText';
import AIWaveButton from '../AIWaveButton/AIWaveButton';
import ErrorBoundary from '../AIWaveButton/ErrorBoundary';

const HomeComponent = () => {


    const [isSpeaking, setIsSpeaking] = useState(false);


    const handleAnimationComplete = () => {
        console.log('animation completed');
    }
    return (
        <div>

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


            {/* AI Bubble */}
            <div
                onClick={() => setIsSpeaking(!isSpeaking)}
            >
                <ErrorBoundary>
                    <AIWaveButton isSpeaking={isSpeaking} isUser={false}/>
                </ErrorBoundary>
            </div>


        </div>
    );
};

export default HomeComponent;