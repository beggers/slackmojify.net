import React from 'react';

function ImageCanvas({ processedImage }) {
    return (
        <div className="image-preview">
            {processedImage && <img src={processedImage} alt="Processed" />}
        </div>
    );
}

export default ImageCanvas;
