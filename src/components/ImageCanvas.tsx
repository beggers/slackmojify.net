import { FabricImage, Canvas } from 'fabric';
import { useEffect, useRef } from 'react';
import DownloadButton from './DownloadButton';

interface ImageCanvasProps {
    image: Blob | null;
    overlayImages: FabricImage[];
    fileName: string;
}

function ImageCanvas({ image, overlayImages, fileName }: ImageCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const fabricCanvasRef = useRef<Canvas | null>(null);

    function getDownloadableImage() {
        if (!fabricCanvasRef.current) return null;

        // TODO other image types
        const downloadableImageUrl = fabricCanvasRef.current.toDataURL({
            format: 'png',
            multiplier: 1
        });
        const base64Data = downloadableImageUrl.replace(/^data:image\/png;base64,/, '');

        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: 'image/png' });
    }

    useEffect(() => {
        if (!fabricCanvasRef.current && canvasRef.current) {
            const canvasElement = canvasRef.current;
            const parentElement = canvasElement.parentElement;

            if (parentElement) {
                const { offsetWidth: width, offsetHeight: height } = parentElement;
                canvasElement.width = width;
                canvasElement.height = height;

                const newCanvas = new Canvas(canvasElement);
                fabricCanvasRef.current = newCanvas;
            }
        }

        if (fabricCanvasRef.current && image) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target?.result && typeof e.target.result === 'string') {
                    FabricImage.fromURL(e.target.result).then((img) => {
                        if (!fabricCanvasRef.current) throw new Error('Canvas not found');
                        const canvas = fabricCanvasRef.current;
                        canvas.clear();
                        img.selectable = false;
                        img.scaleToWidth(canvas.getWidth());
                        img.scaleToHeight(canvas.getHeight());
                        canvas.add(img);

                        if (overlayImages.length > 0) {
                            overlayImages.forEach((img) => {
                                canvas.add(img);
                                canvas.centerObject(img);
                            });
                        }
                        canvas.renderAll();
                    });
                }
            };
            reader.readAsDataURL(image);

        }
    }, [image, overlayImages]);

    return (
        <div>
            <div className="image-preview">
                <canvas ref={canvasRef} id="image-canvas-element" />
            </div>
            <div>
                <DownloadButton
                    getDownloadableImage={getDownloadableImage}
                    fileName={fileName}
                    disabled={!image}
                />
            </div>
        </div>
    );
}

export default ImageCanvas;