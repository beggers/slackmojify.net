import './App.css';
import { useState } from 'react';
import UploadButton from './components/UploadButton';
import UploadModal from './components/UploadModal';
import ImageCanvas from './components/ImageCanvas';
import DownloadButton from './components/DownloadButton';
import EffectsSidebar from './components/EffectsSidebar';

function App() {
    const [image, setImage] = useState<Blob | null>(null);
    const [isCropping, setIsCropping] = useState<boolean>(false);

    return (
        <div className="App">
            <h1 className="visible-site-header">Slackmojify your <s>least</s> favorite coworker!</h1>
            <div className="main-content">
                <div className="upload-button">
                    <UploadButton setImage={(image) => { setImage(image); setIsCropping(true); }} />
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
                        <ImageCanvas image={image} />
                    )}
                    <DownloadButton image={image} />
                </div>
            </div>
        </div>
    );
}

export default App;