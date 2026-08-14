// JSON to CSV Converter
import { useState } from 'react';
import { jsonToCSV } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, FileSpreadsheet } from 'lucide-react';

export default function JSONToCSV() {
  const [input, setInput] = useState('[\n  {\n    "name": "John Doe",\n    "age": 30,\n    "email": "john@example.com"\n  },\n  {\n    "name": "Jane Smith",\n    "age": 25,\n    "email": "jane@example.com"\n  }\n]');
  const [output, setOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      const result = jsonToCSV(input, delimiter);
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
    const blob = new Blob([output], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.csv';
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
            placeholder="Enter JSON array..."
            className="w-full h-56 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
          <div className="mt-3">
            <label className="text-sm text-secondary mb-2 block">Delimiter</label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">CSV Output</h3>
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
              <pre className="whitespace-pre-wrap break-all">{output || 'CSV output will appear here'}</pre>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleConvert} variant="primary">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Convert to CSV
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Input should be a JSON array of objects. Each object property becomes a CSV column.</p>
      </div>
    </div>
  );
}
