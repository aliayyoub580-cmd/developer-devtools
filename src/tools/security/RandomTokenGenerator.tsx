// Random Token Generator Tool
import { useState } from 'react';
import { generateRandomToken } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Dice1 } from 'lucide-react';

export default function RandomTokenGenerator() {
  const [token, setToken] = useState('');
  const [length, setLength] = useState(32);

  const handleGenerate = () => {
    const result = generateRandomToken(length);
    setToken(result);
  };

  const handleClear = () => {
    setToken('');
  };

  const handleDownload = () => {
    const blob = new Blob([token], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'token.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate a token on mount
  useState(() => {
    handleGenerate();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">Token Settings</h3>
          <Button onClick={handleGenerate} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </Button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-secondary mb-2 block">Token Length</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Math.max(1, Math.min(1000, parseInt(e.target.value) || 32)))}
              min="1"
              max="1000"
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">Generated Token</h3>
          <div className="flex gap-2">
            <CopyButton textToCopy={token} size="sm" />
            <Button onClick={handleDownload} variant="ghost" size="sm">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button onClick={handleClear} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
              Clear
            </Button>
          </div>
        </div>
        <div className="overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
          <pre className="whitespace-pre-wrap break-all">{token || 'Token will appear here'}</pre>
        </div>
        <div className="mt-2 text-sm text-muted">
          Length: {token.length} characters
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleGenerate} variant="primary">
          <Dice1 className="w-4 h-4 mr-2" />
          Generate Token
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Random tokens are useful for API keys, session IDs, CSRF tokens, and other security purposes.</p>
      </div>
    </div>
  );
}
