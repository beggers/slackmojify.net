import React from 'react';
import { removeBackground } from '@imgly/background-removal';

interface EffectsControlProps {
    image: File | null;
    setProcessedImage: (image: string) => void;
}

function EffectsControl({ image, setProcessedImage }: EffectsControlProps) {
    const removeBackgroundHandler = async () => {
        console.log('Button clicked');
        if (!image) {
            console.error('No image found');
            return;
        }
        console.log('Received valid original image:', image);

        const img = new Image();
        img.src = URL.createObjectURL(image);

        img.onload = async () => {
            try {
                console.log('Removing background...');
                const result = await removeBackground({ input: img });
                if (result && result.canvas) {
                    console.log('Background removal successful');
                    setProcessedImage(result.canvas.toDataURL());
                } else {
                    console.error('Background removal failed: Result is undefined or does not contain a canvas');
                }
            } catch (error) {
                console.error('Error during background removal:', error);
            }
        };

        img.onerror = (error) => {
            console.error('Error loading image for background removal:', error);
        };
    };

    return (
        <div className="effects-control">
            <button onClick={removeBackgroundHandler}>Remove Background</button>
        </div>
    );
}

export default EffectsControl;
