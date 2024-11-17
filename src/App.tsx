import { useState } from 'react';
import './App.css';
import RemoveBackgroundButton from './components/RemoveBackgroundButton';
import ImageUpload from './components/ImageUpload';
import ImageCanvas from './components/ImageCanvas';
import DownloadButton from './components/DownloadButton';
import EffectsSidebar from './components/EffectsSidebar';
import CropControl from './components/CropControl';


function App() {
    const [processedImage, setProcessedImage] = useState<Blob | null>(null);
    const [isCropping, setIsCropping] = useState<boolean>(false);

    return (
        <div className="App">
            <h1 className="visible-site-header">Slackmojify your <s>least</s> favorite coworkers!</h1>
            <div className="main-content">
                <div className="upload-crop-controls">
                    <ImageUpload setProcessedImage={setProcessedImage} />
                    <button onClick={() => setIsCropping(true)} disabled={!processedImage} className="crop-button">Crop</button>
                </div>
                <div className="image-section">
                    {isCropping && processedImage ? (
                        <CropControl image={processedImage} setProcessedImage={(blob) => { setProcessedImage(blob); setIsCropping(false); }} />
                    ) : (
                        <ImageCanvas processedImage={processedImage} />
                    )}
                    <RemoveBackgroundButton image={processedImage} setProcessedImage={setProcessedImage} />
                    <DownloadButton processedImage={processedImage} />
                </div>
            </div>
            <div className="effects-section">
                <EffectsSidebar image={processedImage} setProcessedImage={setProcessedImage} />
            </div>
        </div>
    );
}

export default App;