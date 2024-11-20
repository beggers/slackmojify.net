interface UploadButtonProps {
    setImage: (image: Blob) => void;
    setFileName: (fileName: string) => void;
}

function UploadButton({ setImage, setFileName }: UploadButtonProps) {
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const blob = new Blob([file], { type: file.type });
            setFileName(file.name);
            setImage(blob);
        }
    };

    return (
        <div className="image-upload">
            <input type="file" onChange={handleUpload} />
        </div>
    );
}

export default UploadButton;