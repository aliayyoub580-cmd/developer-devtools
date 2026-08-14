// Image Resizer Tool
import { useState, useRef } from 'react';
import { Button } from '../../components';
import { Download, RefreshCw, Expand, Lock } from 'lucide-react';

export default function ImageResizer() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [resizedPreview, setResizedPreview] = useState('');
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);

        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target?.result as string);
          resizeImage(file, img.width, img.height);
        };
        reader.readAsDataURL(file);
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const resizeImage = (file: File, originalW: number, originalH: number) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Calculate dimensions maintaining aspect ratio if needed
          let finalWidth = width;
          let finalHeight = height;

          if (maintainAspectRatio) {
            const ratio = originalW / originalH;
            if (width / height > ratio) {
              finalWidth = height * ratio;
            } else {
              finalHeight = width / ratio;
            }
          }

          canvas.width = finalWidth;
          canvas.height = finalHeight;
          ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

          const resizedDataUrl = canvas.toDataURL('image/jpeg');
          setResizedPreview(resizedDataUrl);
        }
      }
    };
    img.src = URL.createObjectURL(file);
  };

  const handleClear = () => {
    setImage(null);
    setPreview('');
    setResizedPreview('');
    setWidth(800);
    setHeight(600);
    setOriginalWidth(0);
    setOriginalHeight(0);
  };

  const handleDownload = () => {
    if (resizedPreview) {
      const link = document.createElement('a');
      link.href = resizedPreview;
      link.download = 'resized.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleWidthChange = (value: number) => {
    setWidth(value);
    if (maintainAspectRatio && originalWidth > 0) {
      const ratio = originalHeight / originalWidth;
      setHeight(Math.round(value * ratio));
    }
    if (image) resizeImage(image, originalWidth, originalHeight);
  };

  const handleHeightChange = (value: number) => {
    setHeight(value);
    if (maintainAspectRatio && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(value * ratio));
    }
    if (image) resizeImage(image, originalWidth, originalHeight);
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
              <Expand className="w-12 h-12 mx-auto mb-2 text-muted" />
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
            <h3 className="font-medium text-primary mb-3">Resize Settings</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-secondary mb-2 block">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                  min="1"
                  className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="text-sm text-secondary mb-2 block">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                  min="1"
                  className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-3 p-2 bg-surface rounded-md">
              <input
                type="checkbox"
                checked={maintainAspectRatio}
                onChange={(e) => {
                  setMaintainAspectRatio(e.target.checked);
                  if (e.target.checked && originalWidth > 0) {
                    const ratio = originalHeight / originalWidth;
                    setHeight(Math.round(width * ratio));
                  }
                }}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm text-secondary">Maintain Aspect Ratio</span>
              <Lock className="w-4 h-4 text-muted" />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-elevated rounded-lg border border-border p-4">
              <h4 className="font-medium text-primary mb-2">Original</h4>
              <div className="text-sm text-muted mb-1">Size: {originalWidth} × {originalHeight} px</div>
              <img src={preview} alt="Original" className="w-full rounded-lg" />
            </div>
            <div className="bg-elevated rounded-lg border border-border p-4">
              <h4 className="font-medium text-primary mb-2">Resized</h4>
              <div className="text-sm text-muted mb-1">Size: {width} × {height} px</div>
              <img src={resizedPreview} alt="Resized" className="w-full rounded-lg" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleDownload} variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Download Resized
            </Button>
          </div>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Upload an image and set the desired dimensions. Enable "Maintain Aspect Ratio" to preserve the original proportions.</p>
      </div>
    </div>
  );
}
