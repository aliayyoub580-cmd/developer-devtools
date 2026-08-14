// JSON Validator Tool
import { useState } from 'react';
import { validateJSON } from '../../utils';
import { Button } from '../../components';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export default function JSONValidator() {
  const [input, setInput] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com"\n}');
  const [result, setResult] = useState<{ valid: boolean; error?: string; line?: number; column?: number } | null>(null);

  const handleValidate = () => {
    const validation = validateJSON(input);
    setResult(validation);
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">JSON Input</h3>
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
          placeholder="Enter JSON data to validate..."
          className="w-full h-48 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleValidate} variant="primary">
          <CheckCircle className="w-4 h-4 mr-2" />
          Validate JSON
        </Button>
      </div>

      {result && (
        <div className={`p-4 rounded-lg ${result.valid ? 'bg-success/10 border border-success/20 text-success' : 'bg-error/10 border border-error/20 text-error'}`}>
          <div className="flex items-center gap-2 mb-2">
            {result.valid ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <h3 className="font-medium">{result.valid ? '✓ Valid JSON' : '✗ Invalid JSON'}</h3>
          </div>
          {!result.valid && (
            <div className="text-sm">
              <p>{result.error}</p>
              {result.line && result.column && (
                <p className="mt-1">
                  Line: {result.line}, Column: {result.column}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> This tool validates JSON syntax and shows detailed error information including line and column numbers.</p>
      </div>
    </div>
  );
}
