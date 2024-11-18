import { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import { removeBackground } from '@imgly/background-removal';
import 'cropperjs/dist/cropper.css';

interface UploadModalProps {
    image: Blob | null;
    setProcessedImage: (image: Blob) => void;
    onClose: () => void;
}

function UploadModal({ image, setProcessedImage, onClose }: UploadModalProps) {
    const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
    const cropperRef = useRef<HTMLImageElement & { cropper?: Cropper }>(null);

    if (!image) return null;
    const imageUrl = URL.createObjectURL(image);

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                if (blob) {
                    setCroppedImage(blob);
                }
            });
        }
    };

    const onRemoveBackground = async () => {
        if (!croppedImage) {
            console.error('No cropped image found');
            return;
        }

        try {
            const result = await removeBackground(croppedImage);
            if (result) {
                setProcessedImage(result);
                onClose();
            } else {
                console.error('Background removal failed: Result is undefined or null?', result);
            }
        } catch (error) {
            console.error('Error during background removal:', error);
        }
    };

    return (
        <div className="upload-modal">
            <div className="modal-content">
                <h2>Edit Image</h2>
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

                {croppedImage && (
                    <div className="remove-background-button">
                        <button onClick={onRemoveBackground}>Remove Background</button>
                    </div>
                )}

                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
}

export default UploadModal;
