interface ImageCanvasProps {
    image: Blob | null;
}

function ImageCanvas({ image }: ImageCanvasProps) {
    if (!image) return null;
    const imageUrl = URL.createObjectURL(image);

    return (
        <div className="image-preview">
            <img src={imageUrl} alt="Processed" />
        </div>
    );
}

export default ImageCanvas;