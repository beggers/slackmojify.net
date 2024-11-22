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

    // Initialize canvas
    useEffect(() => {
        if (fabricCanvasRef.current || !canvasRef.current) return;
        const canvasElement = canvasRef.current;
        const parentElement = canvasElement.parentElement;

        if (parentElement) {
            const { offsetWidth: width, offsetHeight: height } = parentElement;
            canvasElement.width = width;
            canvasElement.height = height;

            // Initialize Fabric.js canvas
            const newCanvas = new Canvas(canvasElement, { preserveObjectStacking: true });
            fabricCanvasRef.current = newCanvas;
        }
    }, []);

    // Add base image to canvas
    useEffect(() => {
        if (!fabricCanvasRef.current || !image) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            if (e.target?.result && typeof e.target.result === 'string') {
                FabricImage.fromURL(e.target.result).then((img) => {
                    if (!fabricCanvasRef.current) throw new Error('Canvas not found');
                    const canvas = fabricCanvasRef.current;
                    canvas.clear();

                    img.selectable = false;
                    img.evented = false;
                    img.scaleToWidth(canvas.getWidth());
                    img.scaleToHeight(canvas.getHeight());

                    canvas.add(img);
                    canvas.sendObjectToBack(img);

                    // We need to remove overlay images before adding them each
                    // time, or else the saturation of existing overlay images
                    // increases every time a new one is added.
                    // I couldn't find a way to remove them from the canvas
                    // without clearing it, so we do overlay images in this hook
                    // instead of a separate one ¯\_(ツ)_/¯
                    const addOverlayImage = (img: FabricImage) => {
                        canvas.add(img);
                        canvas.bringObjectToFront(img);
                        canvas.renderAll();
                    };

                    for (const overlayImage of overlayImages) {
                        addOverlayImage(overlayImage);
                    }

                    canvas.renderAll();
                });
            }
        };
        reader.readAsDataURL(image);
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