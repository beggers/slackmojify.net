import { FabricImage, Canvas } from 'fabric';
import { useEffect, useRef } from 'react';

interface ImageCanvasProps {
    image: Blob | null;
    overlayImages: FabricImage[];
    setDownloadableImage: (image: Blob | null) => void;
}

function ImageCanvas({ image, overlayImages, setDownloadableImage }: ImageCanvasProps) {
    // TODO at least one of these, probably both, should be in the parent
    // component so clicking the download button can trigger the final image render.
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const fabricCanvasRef = useRef<Canvas | null>(null);

    function updateDownloadableImage() {
        if (!fabricCanvasRef.current) return;

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
        const blob = new Blob([byteArray], { type: 'image/png' });
        setDownloadableImage(blob);
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
                // https://github.com/fabricjs/fabric.js/wiki/Working-with-events
                // TODO We should be able to do this in a for-loop, but then TS
                // complains about using a string as type CanvasEvent.
                fabricCanvasRef.current.on('object:added', updateDownloadableImage);
                fabricCanvasRef.current.on('object:modified', updateDownloadableImage);
                fabricCanvasRef.current.on('object:removed', updateDownloadableImage);
                fabricCanvasRef.current.on('object:rotating', updateDownloadableImage);
                fabricCanvasRef.current.on('object:scaling', updateDownloadableImage);
                fabricCanvasRef.current.on('object:moving', updateDownloadableImage);
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