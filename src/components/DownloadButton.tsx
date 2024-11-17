import React from 'react';

interface DownloadButtonProps {
    processedImage: string | null;
}

function DownloadButton({ processedImage }: DownloadButtonProps) {
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