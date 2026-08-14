// HTTP Header Parser Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Server, RefreshCw } from 'lucide-react';

export default function HTTPHeaderParser() {
  const [input, setInput] = useState(`Content-Type: application/json
Authorization: [REDACTED]
Accept: application/json
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36`);
  const [parsed, setParsed] = useState<Record<string, string> | null>(null);

  const handleParse = () => {
    try {
      const lines = input.split('\n');
      const result: Record<string, string> = {};

      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed) {
          const separatorIndex = trimmed.indexOf(':');
          if (separatorIndex > 0) {
            const key = trimmed.slice(0, separatorIndex).trim();
            const value = trimmed.slice(separatorIndex + 1).trim();
            result[key] = value;
          }
        }
      });

      setParsed(result);
    } catch {
      setParsed(null);
    }
  };

  const handleClear = () => {
    setInput('');
    setParsed(null);
  };

  // Parse on mount
  useState(() => {
    handleParse();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">HTTP Headers</h3>
            <Button onClick={handleClear} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
              Clear
            </Button>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleParse();
            }}
            placeholder="Enter HTTP headers..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Parsed Headers</h3>
            {parsed && <CopyButton textToCopy={JSON.stringify(parsed, null, 2)} size="sm" />}
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3">
            {parsed ? (
              <div className="space-y-2">
                {Object.entries(parsed).map(([key, value]) => (
                  <div key={key} className="p-2 bg-elevated rounded">
                    <div className="font-medium text-primary">{key}</div>
                    <div className="text-sm text-muted font-mono">{value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted">Parsed headers will appear here</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleParse} variant="primary">
          <Server className="w-4 h-4 mr-2" />
          Parse Headers
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> HTTP headers are key-value pairs separated by colons. This tool parses them into a structured format.</p>
      </div>
    </div>
  );
}
