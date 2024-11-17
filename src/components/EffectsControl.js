import React from 'react';
import { removeBackground } from '@imgly/background-removal';

function EffectsControl({ image, setProcessedImage }) {
    const removeBackgroundHandler = async () => {
        console.log('Button clicked');
        if (!image) {
            console.error('No image found');
            return;
        }
        console.log('Received valid original image:', image);

        const reader = new FileReader();
        reader.onloadend = async () => {
            const img = new Image();
            img.src = reader.result;

            console.log('Loading image...');
            img.onload = async () => {
                try {
                    console.log('Removing background...');
                    const result = await removeBackground({ input: image });
                    if (result && result.canvas) {
                        console.log('Background removal successful');
                        setProcessedImage(result.canvas.toDataURL());
                    } else {
                        console.error('Background removal failed: Result is undefined or does not contain a canvas');
                    }
                } catch (error) {
                    console.error('Error removing background:', error);
                }
            };

            img.onerror = (error) => {
                console.error('Error loading image:', error);
            };
        };

        reader.onerror = (error) => {
            console.error('Error reading file:', error);
        };

        console.log('Reading file...');
        reader.readAsDataURL(image);
    };

    return (
        <div className="effects-control">
            <button onClick={removeBackgroundHandler}>Remove Background</button>
        </div>
    );
}

export default EffectsControl;