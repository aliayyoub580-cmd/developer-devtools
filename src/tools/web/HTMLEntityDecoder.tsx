// HTML Entity Decoder Tool
import { useState } from 'react';
import { htmlEntityDecode } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Code } from 'lucide-react';

export default function HTMLEntityDecoder() {
  const [input, setInput] = useState('&lt;script&gt;alert(&quot;Hello &amp; Welcome&quot;);&lt;/script&gt;');
  const [output, setOutput] = useState('');

  const handleDecode = () => {
    const result = htmlEntityDecode(input);
    setOutput(result);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'decoded.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Decode on mount
  useState(() => {
    handleDecode();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">HTML Entity Input</h3>
            <Button onClick={handleClear} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
              Clear
            </Button>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleDecode();
            }}
            placeholder="Enter HTML entity encoded text..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Decoded Output</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3">
            <pre className="whitespace-pre-wrap break-all">{output || 'Decoded text will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleDecode} variant="primary">
          <Code className="w-4 h-4 mr-2" />
          HTML Entity Decode
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> HTML entity decoding converts HTML entity codes back to their original characters.</p>
      </div>
    </div>
  );
}
