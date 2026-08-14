// JSON to TypeScript Converter
import { useState } from 'react';
import { jsonToTypeScript } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Type } from 'lucide-react';

export default function JSONToTypeScript() {
  const [input, setInput] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com",\n  "isDeveloper": true,\n  "skills": ["JavaScript", "TypeScript"],\n  "address": {\n    "city": "New York",\n    "country": "USA"\n  }\n}');
  const [output, setOutput] = useState('');
  const [interfaceName, setInterfaceName] = useState('Root');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      const result = jsonToTypeScript(input, interfaceName);
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
    const blob = new Blob([output], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${interfaceName.toLowerCase()}.ts`;
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
            className="w-full h-56 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
          <div className="mt-3">
            <label className="text-sm text-secondary mb-2 block">Interface Name</label>
            <input
              type="text"
              value={interfaceName}
              onChange={(e) => setInterfaceName(e.target.value)}
              placeholder="Root"
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">TypeScript Output</h3>
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
              <pre className="whitespace-pre-wrap break-all">{output || 'TypeScript interfaces will appear here'}</pre>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleConvert} variant="primary">
          <Type className="w-4 h-4 mr-2" />
          Convert to TypeScript
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> This tool converts JSON objects to TypeScript interfaces. Nested objects and arrays are supported.</p>
      </div>
    </div>
  );
}
