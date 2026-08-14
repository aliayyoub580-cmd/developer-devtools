// Favicon Generator Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

export default function FaviconGenerator() {
  const [, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [sizes] = useState([16, 32, 48, 64, 128, 256]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setImage(null);
    setPreview('');
  };

  const handleDownloadAll = () => {
    // In a real implementation, this would generate and download all sizes
    if (preview) {
      const link = document.createElement('a');
      link.href = preview;
      link.download = 'favicon.png';
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
            id="favicon-upload"
          />
          <label htmlFor="favicon-upload" className="cursor-pointer">
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
            <h3 className="font-medium text-primary mb-3">Favicon Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <span key={size} className="px-3 py-1 bg-surface rounded-full text-sm">
                  {size}×{size}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-elevated rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-primary">HTML Code</h3>
              <CopyButton textToCopy={sizes.map(size => `<link rel="icon" type="image/png" sizes="${size}x${size}" href="/favicon-${size}x${size}.png">`).join('\n')} size="sm" />
            </div>
            <div className="bg-surface rounded-md p-3 font-mono text-sm overflow-auto">
              <pre>{sizes.map(size => `<link rel="icon" type="image/png" sizes="${size}x${size}" href="/favicon-${size}x${size}.png">`).join('\n')}</pre>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleDownloadAll} variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Download Favicons
            </Button>
          </div>
        </>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Upload an image to generate favicon files in multiple sizes with HTML code for your website.</p>
      </div>
    </div>
  );
}
