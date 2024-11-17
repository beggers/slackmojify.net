import React from 'react';

function ImageUpload({ setImage, setProcessedImage }) {
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProcessedImage(reader.result);
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