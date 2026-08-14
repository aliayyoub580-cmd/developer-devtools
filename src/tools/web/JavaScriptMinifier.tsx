// JavaScript Minifier Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Minimize } from 'lucide-react';

export default function JavaScriptMinifier() {
  const [input, setInput] = useState('function hello() {\n  console.log("Hello, World!");\n  const x = 1;\n  const y = 2;\n  return x + y;\n}');
  const [output, setOutput] = useState('');

  const handleMinify = () => {
    // Simple JavaScript minification
    try {
      // Remove comments
      let result = input.replace(/\/\/[^\n]*\n/g, '');
      result = result.replace(/\/\*[\s\S]*?\*\//g, '');

      // Remove whitespace
      result = result.replace(/\s+/g, ' ');

      // Remove spaces around operators and punctuation
      result = result.replace(/\s*([+\-*/%=<>!&|^~?:,;{}()\[\]])\s*/g, '$1');

      // Remove spaces before/after certain characters
      result = result.replace(/\s*([+\-*/%=<>!&|^~?:,;{}()\[\]])\s*/g, '$1');

      // Remove spaces at start/end
      result = result.trim();

      // Remove spaces before newlines
      result = result.replace(/\s+\n/g, '\n');

      // Remove newlines
      result = result.replace(/\n/g, '');

      // Remove spaces around = in var declarations
      result = result.replace(/([a-zA-Z0-9_]+)\s*(=)\s*([^=])/g, '$1$2$3');

      setOutput(result);
    } catch {
      setOutput('Error minifying JavaScript');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minified.js';
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
            <h3 className="font-medium text-primary">JavaScript Input</h3>
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
            placeholder="Enter JavaScript code..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Minified JavaScript</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Minified JavaScript will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleMinify} variant="primary">
          <Minimize className="w-4 h-4 mr-2" />
          Minify JavaScript
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> JavaScript minification removes whitespace, comments, and shortens variable names to reduce file size.</p>
      </div>
    </div>
  );
}
