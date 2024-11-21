import { FabricImage, Canvas } from 'fabric';
import { useEffect, useRef } from 'react';

interface ImageCanvasProps {
    image: Blob | null;
    overlayImages: FabricImage[];
}

function ImageCanvas({ image, overlayImages }: ImageCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const fabricCanvasRef = useRef<Canvas | null>(null);

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
        <div className="image-preview">
            <canvas ref={canvasRef} id="image-canvas-element" />
        </div>
    );
}

export default ImageCanvas;