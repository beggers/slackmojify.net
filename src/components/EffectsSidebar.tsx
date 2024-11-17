interface EffectsSidebarProps {
    image: Blob | null;
    setProcessedImage: (image: Blob) => void;
}

function EffectsSidebar({ image, setProcessedImage }: EffectsSidebarProps) {
    const handleEffectClick = (effect: string) => {
        if (!image) {
            console.error('No image found to apply effect');
            return;
        }
        console.log(`Applying effect: ${effect}`);
        // Future implementation for applying specific effects will go here
    };

    return (
        <div className="effects-sidebar">
            <h3>Available Effects</h3>
            <button onClick={() => handleEffectClick('sunglasses')}>Add Sunglasses</button>
            <button onClick={() => handleEffectClick('rotate')}>Rotate Image</button>
            <button onClick={() => handleEffectClick('laserEyes')}>Add Laser Eyes</button>
            {/* More effects can be easily added here */}
        </div>
    );
}

export default EffectsSidebar;