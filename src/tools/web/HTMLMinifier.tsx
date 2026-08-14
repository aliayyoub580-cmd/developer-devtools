// HTML Minifier Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Minimize } from 'lucide-react';

export default function HTMLMinifier() {
  const [input, setInput] = useState('<!DOCTYPE html>\n<html>\n<head>\n    <title>Test</title>\n</head>\n<body>\n    <h1>Hello</h1>\n    <p>World</p>\n</body>\n</html>');
  const [output, setOutput] = useState('');

  const handleMinify = () => {
    // Simple HTML minification
    try {
      // Remove comments
      let result = input.replace(/<!--[\s\S]*?-->/g, '');

      // Remove whitespace between tags
      result = result.replace(/>\s+</g, '><');

      // Remove leading/trailing whitespace
      result = result.replace(/\s+>/g, '>');
      result = result.replace(/<\s+/g, '<');

      // Remove newlines
      result = result.replace(/\n/g, '');

      // Remove multiple spaces
      result = result.replace(/\s+/g, ' ');

      // Remove spaces around = in attributes
      result = result.replace(/\s*=\s*/g, '=');

      // Remove spaces before >
      result = result.replace(/\s+>/g, '>');

      // Remove spaces after <
      result = result.replace(/<\s+/g, '<');

      setOutput(result.trim());
    } catch {
      setOutput('Error minifying HTML');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minified.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Minify on mount
  useState(() => {
    handleMinify();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">HTML Input</h3>
            <Button onClick={handleClear} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
              Clear
            </Button>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleMinify();
            }}
            placeholder="Enter HTML code..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Minified HTML</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Minified HTML will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleMinify} variant="primary">
          <Minimize className="w-4 h-4 mr-2" />
          Minify HTML
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> HTML minification removes whitespace, comments, and unnecessary characters to reduce file size.</p>
      </div>
    </div>
  );
}
