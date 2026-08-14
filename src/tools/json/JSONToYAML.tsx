// JSON to YAML Converter
import { useState } from 'react';
import { jsonToYAML } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, FileCode } from 'lucide-react';

export default function JSONToYAML() {
  const [input, setInput] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com",\n  "isDeveloper": true,\n  "skills": ["JavaScript", "TypeScript", "React"]\n}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      const result = jsonToYAML(input);
      setOutput(result);
      setError(null);
    } catch {
      setError('Invalid JSON input');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.yaml';
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
            <h3 className="font-medium text-primary">JSON Input</h3>
            <Button onClick={handleClear} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
              Clear
            </Button>
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
            <h3 className="font-medium text-primary">YAML Output</h3>
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
              <pre className="whitespace-pre-wrap break-all">{output || 'YAML output will appear here'}</pre>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleConvert} variant="primary">
          <FileCode className="w-4 h-4 mr-2" />
          Convert to YAML
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> YAML is a human-readable data serialization format that's commonly used for configuration files.</p>
      </div>
    </div>
  );
}
