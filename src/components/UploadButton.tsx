interface UploadButtonProps {
    setProcessedImage: (image: Blob) => void;
}

function UploadButton({ setProcessedImage }: UploadButtonProps) {
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const blob = new Blob([file], { type: file.type });
            setProcessedImage(blob);
        }
    };

    return (
        <div className="image-upload">
            <input type="file" onChange={handleUpload} />
        </div>
    );
}

export default UploadButton;