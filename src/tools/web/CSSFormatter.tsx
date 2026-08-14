// CSS Formatter Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Code } from 'lucide-react';

export default function CSSFormatter() {
  const [input, setInput] = useState('body{color:#333;background:#fff;margin:0;padding:0}h1{font-size:2em;color:#6C63FF}');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    // Simple CSS formatting
    try {
      // Split by } and process each rule
      const rules = input.split('}').filter(rule => rule.trim());
      const formattedRules = rules.map(rule => {
        const parts = rule.split('{');
        if (parts.length === 2) {
          const selector = parts[0].trim();
          const properties = parts[1].trim();

          // Format properties
          const formattedProperties = properties
            .split(';')
            .filter(prop => prop.trim())
            .map(prop => {
              const [property, value] = prop.split(':').map(p => p.trim());
              return `  ${property}: ${value};`;
            })
            .join('\n');

          return `${selector} {\n${formattedProperties}\n}`;
        }
        return rule;
      });

      setOutput(formattedRules.join('\n\n'));
    } catch {
      setOutput('Error formatting CSS');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted.css';
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
            <h3 className="font-medium text-primary">CSS Input</h3>
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
            placeholder="Enter CSS code..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Formatted CSS</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Formatted CSS will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleFormat} variant="primary">
          <Code className="w-4 h-4 mr-2" />
          Format CSS
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> CSS formatting adds proper indentation and organization for better readability.</p>
      </div>
    </div>
  );
}
