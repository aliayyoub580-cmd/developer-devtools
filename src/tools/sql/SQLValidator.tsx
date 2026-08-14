// SQL Validator Tool
import { useState } from 'react';
import { Button } from '../../components';
import { CheckCircle, XCircle, RefreshCw, Database } from 'lucide-react';

export default function SQLValidator() {
  const [input, setInput] = useState('SELECT id, name FROM users WHERE status = "active"');
  const [result, setResult] = useState<{ valid: boolean; error?: string } | null>(null);

  const handleValidate = () => {
    // Simple SQL validation - check for basic syntax issues
    try {
      const trimmed = input.trim();

      if (trimmed === '') {
        setResult({ valid: false, error: 'Empty SQL query' });
        return;
      }

      // Check if it starts with a valid SQL keyword
      const validStarts = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'SHOW', 'DESCRIBE', 'EXPLAIN'];
      const firstWord = trimmed.split('\s')[0].toUpperCase();

      if (!validStarts.includes(firstWord)) {
        setResult({ valid: false, error: `Invalid SQL: Query should start with a valid SQL keyword` });
        return;
      }

      // Check for balanced parentheses
      let parenCount = 0;
      for (const char of trimmed) {
        if (char === '(') parenCount++;
        if (char === ')') parenCount--;
      }

      if (parenCount !== 0) {
        setResult({ valid: false, error: 'Invalid SQL: Unbalanced parentheses' });
        return;
      }

      // Check for balanced quotes
      let singleQuoteCount = 0;
      let doubleQuoteCount = 0;
      for (const char of trimmed) {
        if (char === "'") singleQuoteCount++;
        if (char === '"') doubleQuoteCount++;
      }

      if (singleQuoteCount % 2 !== 0) {
        setResult({ valid: false, error: 'Invalid SQL: Unbalanced single quotes' });
        return;
      }

      if (doubleQuoteCount % 2 !== 0) {
        setResult({ valid: false, error: 'Invalid SQL: Unbalanced double quotes' });
        return;
      }

      // If all checks pass
      setResult({ valid: true });
    } catch {
      setResult({ valid: false, error: 'Error validating SQL' });
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  // Validate on mount
  useState(() => {
    handleValidate();
    return null;
  });

  return (
    <div className="space-y-4">
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
            handleValidate();
          }}
          placeholder="Enter SQL query to validate..."
          className="w-full h-48 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleValidate} variant="primary">
          <Database className="w-4 h-4 mr-2" />
          Validate SQL
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
            <h3 className="font-medium">{result.valid ? '✓ Valid SQL' : '✗ Invalid SQL'}</h3>
          </div>
          {!result.valid && (
            <div className="text-sm">
              <p>{result.error}</p>
            </div>
          )}
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> SQL validation checks for basic syntax errors like unbalanced parentheses and quotes.</p>
      </div>
    </div>
  );
}
