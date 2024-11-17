import React, { useEffect } from 'react';

function ImageCanvas({ image, processedImage, setProcessedImage }) {
    useEffect(() => {
        if (!image) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = processedImage;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Simple background removal logic based on brightness threshold
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const brightness = (r + g + b) / 3;
                if (brightness > 240) {
                    data[i + 3] = 0; // Set alpha to 0 (transparent)
                }
            }

            ctx.putImageData(imageData, 0, 0);
            setProcessedImage(canvas.toDataURL());
        };
    }, [image, processedImage, setProcessedImage]);

    return (
        <div className="image-preview">
            {image && <img src={processedImage} alt="Uploaded" />}
        </div>
    );
}

export default ImageCanvas;