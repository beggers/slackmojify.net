import { useState } from 'react';
import './App.css';
import RemoveBackgroundButton from './components/RemoveBackgroundButton';
import ImageUpload from './components/ImageUpload';
import ImageCanvas from './components/ImageCanvas';
import DownloadButton from './components/DownloadButton';
import EffectsSidebar from './components/EffectsSidebar';


function App() {
    const [image, setImage] = useState<File | null>(null);
    const [processedImage, setProcessedImage] = useState<Blob | null>(null);

    return (
        <div className="App">
            <h1>Slackmojify your <s>least</s> favorite coworkers!</h1>
            <div className="main-content">
                <div className="image-section">
                    <ImageUpload setImage={setImage} setProcessedImage={setProcessedImage} />
                    <ImageCanvas processedImage={processedImage} />
                    <RemoveBackgroundButton image={image} setProcessedImage={setProcessedImage} />
                    <DownloadButton processedImage={processedImage} />
                </div>
                <div className="effects-section">
                    <EffectsSidebar image={processedImage} setProcessedImage={setProcessedImage} />
                </div>
            </div>
        </div>
    );
}

export default App;