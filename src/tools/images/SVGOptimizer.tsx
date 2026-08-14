// SVG Optimizer Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

export default function SVGOptimizer() {
  const [svg, setSvg] = useState('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#6C63FF"/></svg>');
  const [optimized, setOptimized] = useState('');

  const handleOptimize = () => {
    // Simple SVG optimization - remove unnecessary attributes and whitespace
    let result = svg
      .replace(/xmlns="[^"]*"/g, '')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .replace(/\s+>/g, '>')
      .replace(/<\s+/g, '<')
      .trim();

    // Remove empty attributes
    result = result.replace(/="[^"]*"/g, (match) => {
      const value = match.slice(2, -1);
      return value ? match : '';
    });

    setOptimized(result);
  };

  const handleClear = () => {
    setSvg('');
    setOptimized('');
  };

  const handleDownload = () => {
    if (optimized) {
      const blob = new Blob([optimized], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'optimized.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // Optimize on mount
  useState(() => {
    handleOptimize();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">SVG Input</h3>
            <Button onClick={handleClear} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
              Clear
            </Button>
          </div>
          <textarea
            value={svg}
            onChange={(e) => {
              setSvg(e.target.value);
              handleOptimize();
            }}
            placeholder="Enter SVG code..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Optimized SVG</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={optimized} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{optimized || 'Optimized SVG will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleOptimize} variant="primary">
          <ImageIcon className="w-4 h-4 mr-2" />
          Optimize SVG
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> SVG optimization removes unnecessary metadata, whitespace, and redundant attributes to reduce file size.</p>
      </div>
    </div>
  );
}
