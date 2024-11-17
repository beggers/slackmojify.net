interface ImageUploadProps {
    setProcessedImage: (image: Blob) => void;
}

function ImageUpload({ setProcessedImage }: ImageUploadProps) {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const blob = new Blob([file], { type: file.type });
            setProcessedImage(blob);
        }
    };

    return (
        <div className="image-upload">
            <input type="file" onChange={handleImageUpload} />
        </div>
    );
}

export default ImageUpload;