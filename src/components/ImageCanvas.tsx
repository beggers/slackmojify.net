interface ImageCanvasProps {
    processedImage: Blob | null;
}

function ImageCanvas({ processedImage }: ImageCanvasProps) {
    if (!processedImage) return null;
    const imageUrl = URL.createObjectURL(processedImage);

    return (
        <div className="image-preview">
            <img src={imageUrl} alt="Processed" />
        </div>
    );
}

export default ImageCanvas;