import React from 'react';

function DownloadButton({ processedImage }) {
    const handleDownload = () => {
        if (!processedImage) return;

        const link = document.createElement('a');
        link.href = processedImage;
        link.download = 'processed_image.png';
        link.click();
    };

    return (
        <div className="download-button">
            <button onClick={handleDownload} disabled={!processedImage}>Download Image</button>
        </div>
    );
}

export default DownloadButton;