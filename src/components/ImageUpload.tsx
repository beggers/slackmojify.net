interface ImageUploadProps {
    setImage: (file: File) => void;
    setProcessedImage: (image: Blob) => void;
}

function ImageUpload({ setImage, setProcessedImage }: ImageUploadProps) {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            setProcessedImage(file);
        }
    };

    return (
        <div className="image-upload">
            <input type="file" onChange={handleImageUpload} />
        </div>
    );
}

export default ImageUpload;