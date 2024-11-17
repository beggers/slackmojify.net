import { useState } from 'react';
import './App.css';
import EffectsControl from './components/EffectsControl';
import ImageUpload from './components/ImageUpload';
import ImageCanvas from './components/ImageCanvas';
import DownloadButton from './components/DownloadButton';

function App() {
    const [image, setImage] = useState<File | null>(null);
    const [processedImage, setProcessedImage] = useState<Blob | null>(null);

    return (
        <div className="App">
            <h1>Image Background Removal & Effects</h1>
            <ImageUpload setImage={setImage} setProcessedImage={setProcessedImage} />
            <ImageCanvas processedImage={processedImage} />
            <EffectsControl image={image} setProcessedImage={setProcessedImage} />
            <DownloadButton processedImage={processedImage} />
        </div>
    );
}

export default App;