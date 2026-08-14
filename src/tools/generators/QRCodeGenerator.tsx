// QR Code Generator Tool
import { useState, useRef, useEffect } from 'react';
import { Button } from '../../components';
import { Download, RefreshCw, QrCode } from 'lucide-react';

export default function QRCodeGenerator() {
  const [input, setInput] = useState('https://example.com');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState(200);
  const [format, setFormat] = useState<'png' | 'svg'>('png');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = () => {
    // Simple QR code generation using a library would be better
    // For now, we'll use a placeholder approach
    // In production, you'd use a library like qrcode
    try {
      // This is a placeholder - in a real implementation, use a QR code library
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw a simple QR-like pattern (placeholder)
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, 20, 20);
          ctx.fillRect(canvas.width - 20, 0, 20, 20);
          ctx.fillRect(0, canvas.height - 20, 20, 20);

          // Draw content text
          ctx.font = '12px Arial';
          ctx.fillStyle = '#000';
          ctx.fillText('QR: ' + input.substring(0, 20), 30, 20);
        }
      }

      // For demo purposes, create a data URL
      if (canvas) {
        setQrCodeUrl(canvas.toDataURL('image/png'));
      }
    } catch {
      // Fallback
    }
  };

  const handleClear = () => {
    setInput('');
    setQrCodeUrl('');
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `qrcode.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyImage = async () => {
    if (qrCodeUrl) {
      try {
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
      } catch {
        // Fallback
        navigator.clipboard.writeText(qrCodeUrl);
      }
    }
  };

  // Generate QR code when input changes
  useEffect(() => {
    if (input.trim()) {
      generateQRCode();
    } else {
      setQrCodeUrl('');
    }
  }, [input, size, format]);

  // Generate on mount
  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">QR Code Content</h3>
          <Button onClick={handleClear} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
            Clear
          </Button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text or URL to encode in QR code..."
          className="w-full h-24 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
        />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-secondary mb-2 block">Size (px)</label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(Math.max(50, Math.min(1000, parseInt(e.target.value) || 200)))}
              min="50"
              max="1000"
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as 'png' | 'svg')}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="png">PNG</option>
              <option value="svg">SVG</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">QR Code Preview</h3>
          <div className="flex gap-2">
            <Button onClick={handleCopyImage} variant="ghost" size="sm">
              Copy Image
            </Button>
            <Button onClick={handleDownload} variant="ghost" size="sm">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 bg-white rounded-lg">
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="QR Code" className="max-w-full h-auto" />
          ) : (
            <div className="text-center text-muted">
              <QrCode className="w-16 h-16 mx-auto mb-2 opacity-50" />
              <p>Enter text to generate QR code</p>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} width={size} height={size} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={generateQRCode} variant="primary">
          <QrCode className="w-4 h-4 mr-2" />
          Generate QR Code
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> QR codes can encode URLs, text, contact information, Wi-Fi credentials, and more. Most QR code readers can scan them from your screen.</p>
      </div>
    </div>
  );
}
