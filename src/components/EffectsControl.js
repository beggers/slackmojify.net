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

        try {
            console.log('Removing background...');
            const result = await removeBackground({ input: image });
            if (result) {
                console.log('Background removal successful');
                setProcessedImage(result.canvas.toDataURL());
            } else {
                console.error('Background removal failed: Result is undefined or does not contain a canvas');
            }
        } catch (error) {
            console.error('Error during background removal:', error);
        };
    };

    return (
        <div className="effects-control">
            <button onClick={removeBackgroundHandler}>Remove Background</button>
        </div>
    );
}

export default EffectsControl;
