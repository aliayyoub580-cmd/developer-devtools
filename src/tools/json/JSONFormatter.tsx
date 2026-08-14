// Placeholder for JSON Formatter - will be implemented
import { useState } from 'react';
import { formatJSON, minifyJSON, validateJSON } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

export default function JSONFormatter() {
  const [input, setInput] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com",\n  "isDeveloper": true,\n  "skills": ["JavaScript", "TypeScript", "React"],\n  "address": {\n    "city": "New York",\n    "country": "USA"\n  }\n}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    const result = formatJSON(input);
    if (result === input) {
      const validation = validateJSON(input);
      if (!validation.valid) {
        setError(validation.error || 'Invalid JSON');
        return;
      }
    }
    setOutput(result);
    setError(null);
  };

  const handleMinify = () => {
    const result = minifyJSON(input);
    if (result === input) {
      const validation = validateJSON(input);
      if (!validation.valid) {
        setError(validation.error || 'Invalid JSON');
        return;
      }
    }
    setOutput(result);
    setError(null);
  };

  const handleValidate = () => {
    const validation = validateJSON(input);
    if (validation.valid) {
      setError(null);
      setOutput('✓ Valid JSON');
    } else {
      setError(validation.error || 'Invalid JSON');
      setOutput('✗ Invalid JSON');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Input</h3>
            <div className="flex gap-2">
              <Button onClick={handleClear} variant="ghost" size="sm">
                <RefreshCw className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter JSON data..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Output</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            {error ? (
              <div className="text-error">{error}</div>
            ) : (
              <pre className="whitespace-pre-wrap break-all">{output || 'Formatted JSON will appear here'}</pre>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleFormat} variant="primary">
          <CheckCircle className="w-4 h-4 mr-2" />
          Format
        </Button>
        <Button onClick={handleMinify} variant="secondary">
          Minify
        </Button>
        <Button onClick={handleValidate} variant="secondary">
          Validate
        </Button>
      </div>

      {/* Status */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
          <XCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Tips */}
      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Use Ctrl+Enter to format, or paste JSON directly into the input.</p>
      </div>
    </div>
  );
}
