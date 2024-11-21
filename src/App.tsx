import './App.css';
import { useState } from 'react';
import UploadButton from './components/UploadButton';
import UploadModal from './components/UploadModal';
import ImageCanvas from './components/ImageCanvas';
import DownloadButton from './components/DownloadButton';
import EffectsSidebar from './components/EffectsSidebar';
import { FabricImage } from 'fabric';

function App() {
    // Base user-uploaded image.
    const [image, setImage] = useState<Blob | null>(null);
    const [isCropping, setIsCropping] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('');

    // Yeah yeah we should probably have a sub-component to hold the
    // state after this point.
    const [overlayImages, setOverlayImages] = useState<FabricImage[]>([]);
    // This is an abomination unto god. Holds the complete image (with overlays) for download.
    const [downloadableImage, setDownloadableImage] = useState<Blob | null>(null);

    return (
        <div className="App">
            <h1 className="visible-site-header">Slackmojify your <s>least</s> favorite coworker!</h1>
            <div className="main-content">
                <div className="upload-button">
                    <UploadButton setImage={(image) => { setImage(image); setIsCropping(true); }} setFileName={setFileName} />
                </div>
                <div className="image-section">
                    {!!!image && <p>Upload an image to get started</p>}
                    {!!image && isCropping && (
                        <UploadModal
                            image={image}
                            setImage={(blob) => { setImage(blob); setDownloadableImage(blob); setIsCropping(false); }}
                            onClose={() => setIsCropping(false)}
                        />
                    )}
                    {!!image && !isCropping && (
                        <ImageCanvas image={image} overlayImages={overlayImages} setDownloadableImage={setDownloadableImage} />
                    )}
                    <DownloadButton image={downloadableImage} fileName={fileName} />
                </div>
            </div>
            <EffectsSidebar overlayImages={overlayImages} setOverlayImages={setOverlayImages} />
        </div>
    );
}

export default App;