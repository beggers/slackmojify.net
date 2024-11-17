import React from 'react';

function EffectsControl({ processedImage, setProcessedImage }) {
    const applyBrightness = (brightness) => {
        if (!processedImage) return;

        const imageElement = document.createElement('img');
        imageElement.src = processedImage;

        imageElement.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = imageElement.width;
            canvas.height = imageElement.height;

            ctx.filter = `brightness(${brightness}%)`;
            ctx.drawImage(imageElement, 0, 0);

            setProcessedImage(canvas.toDataURL());
        };
    };

    return (
        <div className="effects-control">
            <label>Brightness:</label>
            <input
                type="range"
                min="0"
                max="200"
                defaultValue="100"
                onChange={(e) => applyBrightness(e.target.value)}
            />
        </div>
    );
}

export default EffectsControl;