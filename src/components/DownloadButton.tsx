interface DownloadButtonProps {
    processedImage: Blob | null;
}

function DownloadButton({ processedImage }: DownloadButtonProps) {
    const handleDownload = () => {
        if (!processedImage) return;

        const link = document.createElement('a');
        const imageUrl = URL.createObjectURL(processedImage);
        link.href = imageUrl;
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