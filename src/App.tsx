import './App.css';
import { useState } from 'react';
import UploadButton from './components/UploadButton';
import UploadModal from './components/UploadModal';
import ImageCanvas from './components/ImageCanvas';
import DownloadButton from './components/DownloadButton';
import EffectsSidebar from './components/EffectsSidebar';
import { FabricImage } from 'fabric';

function App() {
    const [image, setImage] = useState<Blob | null>(null);
    const [isCropping, setIsCropping] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('');

    // Yeah yeah we should probably have a sub-component to hold this state.
    const [overlayImages, setOverlayImages] = useState<FabricImage[]>([]);

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
                            setImage={(blob) => { setImage(blob); setIsCropping(false); }}
                            onClose={() => setIsCropping(false)}
                        />
                    )}
                    {!!image && !isCropping && (
                        <ImageCanvas image={image} overlayImages={overlayImages} />
                    )}
                    <DownloadButton image={image} fileName={fileName} />
                </div>
            </div>
            <EffectsSidebar overlayImages={overlayImages} setOverlayImages={setOverlayImages} />
        </div>
    );
}

export default App;