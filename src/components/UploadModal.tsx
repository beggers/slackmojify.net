import { useRef, useState, useEffect } from 'react';
import Cropper from 'react-cropper';
import { removeBackground } from '@imgly/background-removal';
import 'cropperjs/dist/cropper.css';

interface UploadModalProps {
    image: Blob | null;
    setImage: (image: Blob) => void;
    onClose: () => void;
}

function UploadModal({ image, setImage, onClose }: UploadModalProps) {
    const [backgroundRemovedImage, setBackgroundRemovedImage] = useState<Blob | null>(null);
    const cropperRef = useRef<HTMLImageElement & { cropper?: Cropper }>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (image) {
            const url = URL.createObjectURL(image);
            setImageUrl(url);
            return () => {
                URL.revokeObjectURL(url);
            };
        } else {
            setImageUrl(null);
        }
    }, [image]);


    if (!image) return null;

    const onRemoveBackground = async () => {
        if (!image) {
            console.error('No image found');
            return;
        }

        try {
            const result = await removeBackground(image);
            if (result) {
                setBackgroundRemovedImage(result);
            } else {
                console.error('Background removal failed: Result is undefined or null?', result);
            }
        } catch (error) {
            console.error('Error during background removal:', error);
        }
    };

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                if (blob) {
                    setImage(blob);
                    onClose();
                }
            });
        }
    };

    const onCropperReady = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const imageData = cropper.getImageData();
            cropper.setCropBoxData({
                left: 0,
                top: 0,
                width: imageData.naturalWidth,
                height: imageData.naturalHeight,
            });
        }
    };

    return (
        <div className="upload-modal">
            <div className="modal-content">
                {!backgroundRemovedImage ? (
                    <div className="remove-background-step">
                        <div className="image-preview">
                            {imageUrl && (
                                <img src={imageUrl} alt="Uploaded preview" />
                            )}
                        </div>
                        <div className="remove-background-button">
                            <button onClick={onRemoveBackground}>Remove Background</button>
                            <button
                                onClick={() => setBackgroundRemovedImage(image)}
                                className="leave-background-button"
                            >
                                Leave Background
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="crop-control">
                        <h3>Crop Image</h3>
                        <Cropper
                            src={URL.createObjectURL(backgroundRemovedImage)}
                            initialAspectRatio={1}
                            guides={true}
                            ref={cropperRef}
                            className="cropper"
                            ready={onCropperReady}
                        />
                        <button onClick={onCrop}>Crop Image</button>
                    </div>
                )}
                <button onClick={onClose} className="close-button">
                    Close
                </button>
            </div>
        </div>
    );
}

export default UploadModal;