// SQL Formatter Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Database } from 'lucide-react';

export default function SQLFormatter() {
  const [input, setInput] = useState('SELECT id,name,email FROM users WHERE status="active" AND created_at>"2023-01-01" ORDER BY name ASC LIMIT 10');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    // Simple SQL formatting
    try {
      // Convert to uppercase keywords
      let result = input;

      // SQL keywords to uppercase
      const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'ON', 'AS', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'INDEX', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'DEFAULT', 'NULL', 'TRUE', 'FALSE'];

      keywords.forEach(keyword => {
        const regex = new RegExp(`\b${keyword.toLowerCase()}\b`, 'gi');
        result = result.replace(regex, keyword);
      });

      // Add spaces around operators
      result = result.replace(/([=<>!]+)\s*/g, ' $1 ');
      result = result.replace(/\s+([=<>!]+)\s+/g, ' $1 ');

      // Add spaces around commas
      result = result.replace(/,\s*/g, ', ');

      // Add newlines after SELECT, FROM, WHERE, etc.
      const newlinesAfter = ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'ON', 'SET', 'VALUES', 'UPDATE', 'INSERT INTO', 'DELETE FROM'];
      newlinesAfter.forEach(keyword => {
        const regex = new RegExp(`\b${keyword}\b`, 'gi');
        result = result.replace(regex, keyword + '\n');
      });

      // Add indentation for subqueries and nested clauses
      result = result.replace(/(\n)\s*(SELECT|FROM|WHERE|JOIN)/g, '$1  $2');

      // Clean up multiple newlines
      result = result.replace(/\n\s*\n/g, '\n');

      // Trim
      result = result.trim();

      setOutput(result);
    } catch {
      setOutput('Error formatting SQL');
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
    link.download = 'formatted.sql';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Format on mount
  useState(() => {
    handleFormat();
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
              handleFormat();
            }}
            placeholder="Enter SQL query..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Formatted SQL</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Formatted SQL will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleFormat} variant="primary">
          <Database className="w-4 h-4 mr-2" />
          Format SQL
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> SQL formatting capitalizes keywords and adds proper spacing and line breaks for better readability.</p>
      </div>
    </div>
  );
}
