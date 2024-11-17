import React from 'react';

interface ImageUploadProps {
    setImage: (file: File) => void;
    setProcessedImage: (image: string) => void;
}

function ImageUpload({ setImage, setProcessedImage }: ImageUploadProps) {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setProcessedImage(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="image-upload">
            <input type="file" onChange={handleImageUpload} />
        </div>
    );
}

export default ImageUpload;