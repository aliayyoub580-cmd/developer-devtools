// HTML Formatter Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Code } from 'lucide-react';

export default function HTMLFormatter() {
  const [input, setInput] = useState('<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Hello</h1><p>World</p></body></html>');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    // Simple HTML formatting
    try {
      // Parse and re-serialize with indentation
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, 'text/html');

      const serializer = new XMLSerializer();
      let result = serializer.serializeToString(doc);

      // Add proper indentation
      result = formatHtml(result);
      setOutput(result);
    } catch {
      setOutput('Error formatting HTML');
    }
  };

  const formatHtml = (html: string): string => {
    let result = '';
    let indent = '';
    let inTag = false;
    let inComment = false;

    for (let i = 0; i < html.length; i++) {
      const char = html[i];

      if (inComment) {
        if (char === '>' && html[i - 1] === '-' && html[i - 2] === '-') {
          inComment = false;
        }
        result += char;
        continue;
      }

      if (char === '<') {
        if (html[i + 1] === '!') {
          // Check for comment
          if (html[i + 2] === '-' && html[i + 3] === '-') {
            inComment = true;
          }
        }
        inTag = true;
        result += char;
      } else if (char === '>') {
        inTag = false;
        result += char;

        // Check if this is a self-closing tag
        const tagContent = result.slice(result.lastIndexOf('<') + 1, result.length - 1);
        if (!tagContent.endsWith('/') && !['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(tagContent.split(' ')[0])) {
          result += '\n' + indent;
        }
      } else if (char === '\n') {
        // Skip existing newlines
      } else if (inTag) {
        result += char;
      } else {
        result += char;
      }
    }

    return result;
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted.html';
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
            <h3 className="font-medium text-primary">HTML Input</h3>
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
            placeholder="Enter HTML code..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Formatted HTML</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Formatted HTML will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleFormat} variant="primary">
          <Code className="w-4 h-4 mr-2" />
          Format HTML
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> HTML formatting adds proper indentation and line breaks for better readability.</p>
      </div>
    </div>
  );
}
