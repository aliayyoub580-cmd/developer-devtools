// Image Converter Tool
import { useState, useRef } from 'react';
import { Button } from '../../components';
import { Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

export default function ImageConverter() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [convertedPreview, setConvertedPreview] = useState('');
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [quality, setQuality] = useState(80);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
        convertImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = (file: File) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'png' ? 'image/png' : 'image/webp';
          const convertedDataUrl = canvas.toDataURL(mimeType, format === 'png' ? 1 : quality / 100);
          setConvertedPreview(convertedDataUrl);
        }
      }
    };
    img.src = URL.createObjectURL(file);
  };

  const handleClear = () => {
    setImage(null);
    setPreview('');
    setConvertedPreview('');
  };

  const handleDownload = () => {
    if (convertedPreview) {
      const link = document.createElement('a');
      link.href = convertedPreview;
      link.download = `converted.${format}`;
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
            <h3 className="font-medium text-primary mb-3">Conversion Settings</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-secondary mb-2 block">Format</label>
                <select
                  value={format}
                  onChange={(e) => {
                    setFormat(e.target.value as 'jpeg' | 'png' | 'webp');
                    if (image) convertImage(image);
                  }}
                  className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
              {format !== 'png' && (
                <div>
                  <label className="text-sm text-secondary mb-2 block">Quality</label>
                  <input
                    type="range"
                    value={quality}
                    onChange={(e) => {
                      setQuality(parseInt(e.target.value));
                      if (image) convertImage(image);
                    }}
                    min="10"
                    max="100"
                    className="w-full"
                  />
                  <div className="text-center text-sm text-muted">{quality}%</div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-elevated rounded-lg border border-border p-4">
              <h4 className="font-medium text-primary mb-2">Original</h4>
              <img src={preview} alt="Original" className="w-full rounded-lg" />
            </div>
            <div className="bg-elevated rounded-lg border border-border p-4">
              <h4 className="font-medium text-primary mb-2">Converted ({format.toUpperCase()})</h4>
              <img src={convertedPreview} alt="Converted" className="w-full rounded-lg" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleDownload} variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Download Converted
            </Button>
          </div>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Upload an image and select the target format. JPEG and WebP support quality adjustment.</p>
      </div>
    </div>
  );
}
