// Base64 Image Converter Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Image as ImageIcon, Code } from 'lucide-react';

export default function Base64ImageConverter() {
  const [, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [base64, setBase64] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreview(result);
        setBase64(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setImage(null);
    setPreview('');
    setBase64('');
  };

  const handleDownload = () => {
    if (base64) {
      const link = document.createElement('a');
      link.href = base64;
      link.download = 'image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyBase64 = () => {
    navigator.clipboard.writeText(base64);
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
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-primary">Base64 Data URL</h3>
              <div className="flex gap-2">
                <Button onClick={handleCopyBase64} variant="ghost" size="sm">
                  <Code className="w-4 h-4 mr-2" />
                  Copy Base64
                </Button>
                <CopyButton textToCopy={base64} size="sm" />
              </div>
            </div>
            <div className="h-32 overflow-auto bg-surface rounded-md p-3 font-mono text-xs">
              <pre className="whitespace-pre-wrap break-all">{base64}</pre>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleDownload} variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Download Image
            </Button>
          </div>
        </>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Base64 data URLs can be used directly in HTML and CSS to embed images without separate files.</p>
      </div>
    </div>
  );
}
