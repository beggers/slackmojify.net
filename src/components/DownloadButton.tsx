interface DownloadButtonProps {
    image: Blob | null;
}

function DownloadButton({ image }: DownloadButtonProps) {
    const handleDownload = () => {
        if (!image) return;

        const link = document.createElement('a');
        const imageUrl = URL.createObjectURL(image);
        link.href = imageUrl;
        link.download = 'processed_image.png';
        link.click();
    };

    return (
        <div className="download-button">
            <button onClick={handleDownload} disabled={!image}>Download Image</button>
        </div>
    );
}

export default DownloadButton;