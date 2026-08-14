// SQL Minifier Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Minimize } from 'lucide-react';

export default function SQLMinifier() {
  const [input, setInput] = useState('SELECT\n  id,\n  name,\n  email\nFROM users\nWHERE status = "active"\n  AND created_at > "2023-01-01"\nORDER BY name ASC\nLIMIT 10');
  const [output, setOutput] = useState('');

  const handleMinify = () => {
    // Simple SQL minification
    try {
      // Remove all whitespace except spaces
      let result = input.replace(/[\n\r\t]/g, ' ');

      // Remove multiple spaces
      result = result.replace(/\s+/g, ' ');

      // Remove spaces around operators and punctuation
      result = result.replace(/\s*([=<>!]+)\s*/g, '$1');
      result = result.replace(/\s*([,()])\s*/g, '$1');

      // Remove spaces before commas
      result = result.replace(/\s+,/g, ',');

      // Remove spaces after commas
      result = result.replace(/,\s+/g, ',');

      // Remove spaces around = in assignments
      result = result.replace(/\s*(=)\s*/g, '$1');

      // Remove leading/trailing spaces
      result = result.trim();

      setOutput(result);
    } catch {
      setOutput('Error minifying SQL');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minified.sql';
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
            <h3 className="font-medium text-primary">SQL Input</h3>
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
            placeholder="Enter SQL query..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Minified SQL</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Minified SQL will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleMinify} variant="primary">
          <Minimize className="w-4 h-4 mr-2" />
          Minify SQL
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> SQL minification removes whitespace and unnecessary characters to reduce query size.</p>
      </div>
    </div>
  );
}
