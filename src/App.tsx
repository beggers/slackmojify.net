import './App.css';
import { useState } from 'react';
import UploadButton from './components/UploadButton';
import UploadModal from './components/UploadModal';
import ImageCanvas from './components/ImageCanvas';
import DownloadButton from './components/DownloadButton';
import EffectsSidebar from './components/EffectsSidebar';

function App() {
    const [processedImage, setProcessedImage] = useState<Blob | null>(null);
    const [isCropping, setIsCropping] = useState<boolean>(false);
    const [uploadedImage, setUploadedImage] = useState<Blob | null>(null);

    return (
        <div className="App">
            <h1 className="visible-site-header">Slackmojify your <s>least</s> favorite coworker!</h1>
            <div className="main-content">
                <div className="upload-button">
                    <UploadButton setProcessedImage={(image) => { setUploadedImage(image); setIsCropping(true); }} />
                </div>
                <div className="image-section">
                    {processedImage ? (
                        <ImageCanvas processedImage={processedImage} />
                    ) : (
                        <p>No image processed yet</p>
                    )}
                    <DownloadButton processedImage={processedImage} />
                </div>
            </div>
            <div className="effects-section">
                <EffectsSidebar image={processedImage} setProcessedImage={setProcessedImage} />
            </div>
            {isCropping && uploadedImage && (
                <UploadModal
                    image={uploadedImage}
                    setProcessedImage={(blob) => { setProcessedImage(blob); setIsCropping(false); }}
                    onClose={() => setIsCropping(false)}
                />
            )}
        </div>
    );
}

export default App;