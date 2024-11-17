import { removeBackground } from '@imgly/background-removal';

interface RemoveBackgroundButtonProps {
    image: Blob | null;
    setProcessedImage: (image: Blob) => void;
}

function RemoveBackgroundButton({ image, setProcessedImage }: RemoveBackgroundButtonProps) {
    const removeBackgroundHandler = async () => {
        console.log('Button clicked');
        if (!image) {
            console.error('No image found');
            return;
        }

        try {
            console.log('Removing background...');
            const result = await removeBackground(image);
            if (result) {
                console.log('Background removal successful');
                setProcessedImage(result);
            } else {
                console.error('Background removal failed: Result is undefined or null? ', result);
            }
        } catch (error) {
            console.error('Error during background removal:', error);
        };
    };

    return (
        <div className="remove-background-button">
            <button onClick={removeBackgroundHandler}>Remove Background</button>
        </div>
    );
}

export default RemoveBackgroundButton;