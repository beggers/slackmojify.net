import { useState } from 'react';
import { FabricImage } from 'fabric';
import get_overlay_padding from '../overlay_image_control_sizes';

interface EffectsSidebarProps {
    overlayImages: FabricImage[];
    setOverlayImages: (images: FabricImage[]) => void;
}

function EffectsSidebar({ overlayImages, setOverlayImages }: EffectsSidebarProps) {
    const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

    const overlayImageUrls = [
        'blue-flare.png',
        'white-flare.png',
    ];

    const handleAddOverlay = (imageUrl: string) => {
        setIsLoading((prev) => ({ ...prev, [imageUrl]: true }));
        FabricImage.fromURL('images/' + imageUrl).then((img) => {
            img.scale(0.5);
            img.set({
                padding: get_overlay_padding(imageUrl),
            });
            if (img) {
                setOverlayImages([...overlayImages, img]);
            }
            setIsLoading((prev) => ({ ...prev, [imageUrl]: false }));
        });
    };

    // TODO Buttons should display a small preview image instead of text
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