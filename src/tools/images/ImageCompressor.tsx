// Image Compressor Tool
import { useState, useRef } from 'react';
import { Button } from '../../components';
import { Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

export default function ImageCompressor() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [compressedPreview, setCompressedPreview] = useState('');
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [savings, setSavings] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setOriginalSize(file.size);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
        compressImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (file: File) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Compress and get data URL
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
          setCompressedPreview(compressedDataUrl);

          // Calculate compressed size (approximate)
          const base64Length = compressedDataUrl.length - compressedDataUrl.split(',')[0].length - 1;
          const sizeInBytes = Math.ceil(base64Length * 0.75);
          setCompressedSize(sizeInBytes);
          setSavings(Math.round((1 - sizeInBytes / originalSize) * 100));
        }
      }
    };
    img.src = URL.createObjectURL(file);
  };

  const handleClear = () => {
    setImage(null);
    setPreview('');
    setCompressedPreview('');
    setOriginalSize(0);
    setCompressedSize(0);
    setSavings(0);
  };

  const handleDownload = () => {
    if (compressedPreview) {
      const link = document.createElement('a');
      link.href = compressedPreview;
      link.download = 'compressed.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Upload Image</h3>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-32 mx-auto mb-2 rounded" />
            ) : (
              <ImageIcon className="w-12 h-12 mx-auto mb-2 text-muted" />
            )}
            <p className="text-secondary">
              {preview ? 'Change Image' : 'Click to upload image or drag and drop'}
            </p>
          </label>
        </div>
        {preview && (
          <Button onClick={handleClear} variant="ghost" size="sm" className="mt-2">
            <RefreshCw className="w-4 h-4 mr-2" />
            Remove
          </Button>
        )}
      </div>

      {preview && (
        <>
          <div className="bg-elevated rounded-lg border border-border p-4">
            <h3 className="font-medium text-primary mb-3">Compression Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-secondary mb-2 block">Quality: {quality}%</label>
                <input
                  type="range"
                  value={quality}
                  onChange={(e) => {
                    setQuality(parseInt(e.target.value));
                    if (image) compressImage(image);
                  }}
                  min="10"
                  max="100"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-elevated rounded-lg border border-border p-4 text-center">
              <h4 className="font-medium text-primary mb-2">Original</h4>
              <div className="text-2xl font-bold text-primary">{Math.round(originalSize / 1024)} KB</div>
              <div className="text-sm text-muted">Original Size</div>
            </div>
            <div className="bg-elevated rounded-lg border border-border p-4 text-center">
              <h4 className="font-medium text-primary mb-2">Compressed</h4>
              <div className="text-2xl font-bold text-primary">{Math.round(compressedSize / 1024)} KB</div>
              <div className="text-sm text-muted">Compressed Size</div>
            </div>
            <div className="bg-elevated rounded-lg border border-border p-4 text-center">
              <h4 className="font-medium text-primary mb-2">Savings</h4>
              <div className={`text-2xl font-bold ${savings > 0 ? 'text-success' : ''}`}>{savings}%</div>
              <div className="text-sm text-muted">Reduction</div>
            </div>
          </div>

          <div className="bg-elevated rounded-lg border border-border p-4">
            <h3 className="font-medium text-primary mb-3">Preview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-secondary mb-2">Original</h4>
                <img src={preview} alt="Original" className="w-full rounded-lg" />
              </div>
              <div>
                <h4 className="text-sm text-secondary mb-2">Compressed</h4>
                <img src={compressedPreview} alt="Compressed" className="w-full rounded-lg" />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleDownload} variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Download Compressed
            </Button>
          </div>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Upload an image to compress it. Adjust the quality slider to balance between file size and image quality.</p>
      </div>
    </div>
  );
}
