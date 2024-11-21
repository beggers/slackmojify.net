import { useState } from 'react';
import { FabricImage, ImageProps } from 'fabric';

interface EffectsSidebarProps {
    overlayImages: FabricImage[];
    setOverlayImages: (images: FabricImage[]) => void;
}

function EffectsSidebar({ overlayImages, setOverlayImages }: EffectsSidebarProps) {
    const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

    const overlayImageUrls = [
        'images/laser_eyes_1.png',
        'images/laser_eyes_2.png',
        'images/laser_eyes_3.png',
        'images/laser_eyes_4.png'
    ];

    const handleAddOverlay = (imageUrl: string) => {
        setIsLoading((prev) => ({ ...prev, [imageUrl]: true }));
        FabricImage.fromURL(imageUrl).then((img) => {
            img.scale(0.05);
            if (img) {
                setOverlayImages([...overlayImages, img]);
            }
            setIsLoading((prev) => ({ ...prev, [imageUrl]: false }));
        });
    };

    return (
        <div className="effects-sidebar">
            <h3>Add overlay images</h3>
            {overlayImageUrls.map((imageUrl) => (
                <button
                    key={imageUrl}
                    onClick={() => handleAddOverlay(imageUrl)}
                    disabled={isLoading[imageUrl]}
                >
                    {isLoading[imageUrl] ? 'Loading...' : `Add ${imageUrl}`}
                </button>
            ))}
            <h3>Add filters</h3>
            <p>Coming soon!</p>
            <h3>Animate</h3>
            <p>Coming soon!</p>
        </div>
    );
};


export default EffectsSidebar;