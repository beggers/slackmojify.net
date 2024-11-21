import { FabricImage, StaticCanvas } from 'fabric';
import { useEffect, useRef } from 'react';

interface ImageCanvasProps {
    image: Blob | null;
}

function ImageCanvas({ image }: ImageCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const fabricCanvasRef = useRef<StaticCanvas | null>(null);

    useEffect(() => {
        if (!fabricCanvasRef.current && canvasRef.current) {
            const canvasElement = canvasRef.current;
            const parentElement = canvasElement.parentElement;

            if (parentElement) {
                const { offsetWidth: width, offsetHeight: height } = parentElement;
                canvasElement.width = width;
                canvasElement.height = height;

                const newCanvas = new StaticCanvas(canvasElement);
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
                        img.scaleToWidth(canvas.getWidth());
                        img.scaleToHeight(canvas.getHeight());
                        canvas.add(img);
                        canvas.renderAll();
                    });
                }
            };
            reader.readAsDataURL(image);
        }
    }, [image]);

    return (
        <div className="image-preview">
            <canvas ref={canvasRef} id="image-canvas-element" />
        </div>
    );
}

export default ImageCanvas;