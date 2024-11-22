interface DownloadButtonProps {
    getDownloadableImage: () => Blob | null;
    fileName: string;
    disabled?: boolean;
}

function DownloadButton({ getDownloadableImage, fileName, disabled }: DownloadButtonProps) {
    const handleDownload = () => {
        const image = getDownloadableImage();
        if (!image) return

        const link = document.createElement('a');
        const imageUrl = URL.createObjectURL(image);
        link.href = imageUrl;
        link.download = fileName;
        link.click();
    };

    return (
        <div className="download-button">
            <button onClick={handleDownload} disabled={disabled}>Download Image</button>
        </div>
    );
}

export default DownloadButton;