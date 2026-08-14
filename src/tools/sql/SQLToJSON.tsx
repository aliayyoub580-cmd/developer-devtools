// SQL to JSON Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Database } from 'lucide-react';

export default function SQLToJSON() {
  const [input, setInput] = useState('SELECT id, name, email FROM users WHERE status = "active"');
  const [output, setOutput] = useState('');

  const handleConvert = () => {
    // Simple SQL to JSON conversion - this is a placeholder
    // In a real implementation, you would parse the SQL and convert to JSON schema
    try {
      const trimmed = input.trim();

      if (trimmed.toUpperCase().startsWith('SELECT')) {
        // Extract columns
        const selectMatch = trimmed.match(/SELECT\s+(.+?)\s+FROM/i);
        const columns = selectMatch ? selectMatch[1].split(',').map(col => col.trim()) : [];

        // Extract table
        const fromMatch = trimmed.match(/FROM\s+(\w+)/i);
        const table = fromMatch ? fromMatch[1] : 'table';

        // Create JSON schema
        const jsonSchema = {
          table: table,
          columns: columns.map(col => ({
            name: col,
            type: 'string' // Default type
          })),
          query: trimmed
        };

        setOutput(JSON.stringify(jsonSchema, null, 2));
      } else {
        setOutput('Invalid SQL: Only SELECT queries are supported for conversion.');
      }
    } catch {
      setOutput('Error converting SQL to JSON');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sql-to-json.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Convert on mount
  useState(() => {
    handleConvert();
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
              handleConvert();
            }}
            placeholder="Enter SQL query..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">JSON Output</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'JSON output will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleConvert} variant="primary">
          <Database className="w-4 h-4 mr-2" />
          Convert SQL to JSON
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> This tool converts SQL SELECT queries to a JSON schema representation.</p>
      </div>
    </div>
  );
}
