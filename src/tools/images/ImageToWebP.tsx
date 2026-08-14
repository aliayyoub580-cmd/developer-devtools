// Image to WebP Converter
import { useState, useRef } from 'react';
import { Button } from '../../components';
import { Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

export default function ImageToWebP() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [webpPreview, setWebpPreview] = useState('');
  const [quality, setQuality] = useState(80);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
        convertToWebP(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToWebP = (file: File) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const webpDataUrl = canvas.toDataURL('image/webp', quality / 100);
          setWebpPreview(webpDataUrl);
        }
      }
    };
    img.src = URL.createObjectURL(file);
  };

  const handleClear = () => {
    setImage(null);
    setPreview('');
    setWebpPreview('');
  };

  const handleDownload = () => {
    if (webpPreview) {
      const link = document.createElement('a');
      link.href = webpPreview;
      link.download = 'converted.webp';
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
            <h3 className="font-medium text-primary mb-3">WebP Settings</h3>
            <div>
              <label className="text-sm text-secondary mb-2 block">Quality: {quality}%</label>
              <input
                type="range"
                value={quality}
                onChange={(e) => {
                  setQuality(parseInt(e.target.value));
                  if (image) convertToWebP(image);
                }}
                min="10"
                max="100"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-elevated rounded-lg border border-border p-4">
              <h4 className="font-medium text-primary mb-2">Original</h4>
              <img src={preview} alt="Original" className="w-full rounded-lg" />
            </div>
            <div className="bg-elevated rounded-lg border border-border p-4">
              <h4 className="font-medium text-primary mb-2">WebP</h4>
              <img src={webpPreview} alt="WebP" className="w-full rounded-lg" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleDownload} variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Download WebP
            </Button>
          </div>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> WebP format provides better compression than JPEG and PNG with similar quality.</p>
      </div>
    </div>
  );
}
