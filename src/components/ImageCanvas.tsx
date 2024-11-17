import React from 'react';

interface ImageCanvasProps {
    processedImage: string | null;
}

function ImageCanvas({ processedImage }: ImageCanvasProps) {
    return (
        <div className="image-preview">
            {processedImage && <img src={processedImage} alt="Processed" />}
        </div>
    );
}

export default ImageCanvas;