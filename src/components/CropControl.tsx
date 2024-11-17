import { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface CropControlProps {
    image: Blob | null;
    setProcessedImage: (image: Blob) => void;
}

function CropControl({ image, setProcessedImage }: CropControlProps) {
    const cropperRef = useRef<HTMLImageElement & { cropper?: Cropper }>(null);

    if (!image) return null;
    const imageUrl = URL.createObjectURL(image);

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                if (blob) {
                    setProcessedImage(blob);
                }
            });
        }
    };

    return (
        <div className="crop-control">
            <h3>Crop Image</h3>
            <Cropper
                src={imageUrl}
                initialAspectRatio={1}
                guides={true}
                ref={cropperRef}
            />
            <button onClick={onCrop}>Crop Image</button>
        </div>
    );
}

export default CropControl;