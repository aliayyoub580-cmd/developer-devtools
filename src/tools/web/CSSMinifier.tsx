// CSS Minifier Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Minimize } from 'lucide-react';

export default function CSSMinifier() {
  const [input, setInput] = useState('body {\n  color: #333;\n  background: #fff;\n  margin: 0;\n  padding: 0;\n}\n\nh1 {\n  font-size: 2em;\n  color: #6C63FF;\n}');
  const [output, setOutput] = useState('');

  const handleMinify = () => {
    // Simple CSS minification
    try {
      // Remove comments
      let result = input.replace(/\/\*[\s\S]*?\*\//g, '');

      // Remove whitespace
      result = result.replace(/\s+/g, ' ');

      // Remove spaces around {, }, :, ;
      result = result.replace(/\s*{\s*/g, '{');
      result = result.replace(/\s*}\s*/g, '}');
      result = result.replace(/\s*:\s*/g, ':');
      result = result.replace(/\s*;\s*/g, ';');

      // Remove trailing semicolons
      result = result.replace(/;}/g, '}');

      // Remove spaces before !important
      result = result.replace(/\s*!important/g, '!important');

      // Remove leading/trailing whitespace
      result = result.trim();

      setOutput(result);
    } catch {
      setOutput('Error minifying CSS');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minified.css';
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
            <h3 className="font-medium text-primary">CSS Input</h3>
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
            placeholder="Enter CSS code..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Minified CSS</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Minified CSS will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleMinify} variant="primary">
          <Minimize className="w-4 h-4 mr-2" />
          Minify CSS
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> CSS minification removes whitespace, comments, and unnecessary characters to reduce file size.</p>
      </div>
    </div>
  );
}
