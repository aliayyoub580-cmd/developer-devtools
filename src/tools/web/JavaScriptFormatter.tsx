// JavaScript Formatter Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Code } from 'lucide-react';

export default function JavaScriptFormatter() {
  const [input, setInput] = useState('function hello(){console.log("Hello, World!");const x=1;const y=2;return x+y;}');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    // Simple JavaScript formatting
    try {
      // This is a simplified formatter - in production, use a proper JS parser
      let result = input;

      // Add spaces around operators
      result = result.replace(/([+\-*/%=<>!&|^~])\s*/g, ' $1 ');
      result = result.replace(/\s+([+\-*/%=<>!&|^~])\s+/g, ' $1 ');

      // Add spaces after keywords
      result = result.replace(/([a-zA-Z]+)\s*(\(|\{|;|,)/g, '$1 $2');

      // Add spaces before braces
      result = result.replace(/(\w)\s*({)/g, '$1 $2');

      // Add spaces after braces
      result = result.replace(/({)\s*(\w)/g, '$1 $2');

      // Add spaces around equals
      result = result.replace(/([a-zA-Z0-9_]+)\s*(=)\s*([^=])/g, '$1 $2 $3');

      // Add newlines after opening braces
      result = result.replace(/({\s*)/g, '{\n  ');

      // Add newlines before closing braces
      result = result.replace(/(\s*)}/g, '\n}');

      // Add indentation
      let indentLevel = 0;
      let finalResult = '';

      result.split('\n').forEach(line => {
        const trimmed = line.trim();

        if (trimmed === '') {
          finalResult += '\n';
          return;
        }

        // Remove leading whitespace
        const content = line.trim();

        // Adjust indentation
        if (content === '}' || content.endsWith('}')) {
          indentLevel--;
        }

        finalResult += '  '.repeat(indentLevel) + content + '\n';

        if (content === '{' || content.endsWith('{')) {
          indentLevel++;
        }
      });

      setOutput(finalResult.trim());
    } catch {
      setOutput('Error formatting JavaScript');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted.js';
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
            <h3 className="font-medium text-primary">JavaScript Input</h3>
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
            placeholder="Enter JavaScript code..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Formatted JavaScript</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Formatted JavaScript will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleFormat} variant="primary">
          <Code className="w-4 h-4 mr-2" />
          Format JavaScript
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> JavaScript formatting adds proper indentation, spacing, and line breaks for better readability.</p>
      </div>
    </div>
  );
}
