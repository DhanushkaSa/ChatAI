import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

interface TypeWriterProps {
    text: string;
    style?: any;
    speed?: number;
    onComplete?: () => void;

}
export const TypewriterText = ({ text, style, speed = 30, onComplete }: TypeWriterProps) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = -1;
        setDisplayedText('');

        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text]);

    return <Text style={style}>{displayedText}</Text>;
};