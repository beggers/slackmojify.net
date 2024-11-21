interface DownloadButtonProps {
    image: Blob | null;
    fileName: string;
}

function DownloadButton({ image, fileName }: DownloadButtonProps) {
    const handleDownload = () => {
        if (!image) return;

        // I am ashamed to have written this. There must be a better way.
        const link = document.createElement('a');
        const imageUrl = URL.createObjectURL(image);
        link.href = imageUrl;
        link.download = fileName;
        link.click();
    };

    return (
        <div className="download-button">
            <button onClick={handleDownload} disabled={!image}>Download Image</button>
        </div>
    );
}

export default DownloadButton;