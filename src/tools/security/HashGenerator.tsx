// Hash Generator Tool
import { useState } from 'react';
import { generateHash } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Fingerprint } from 'lucide-react';

export default function HashGenerator() {
  const [input, setInput] = useState('Hello, World!');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const algorithms = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateHash(input, algorithm);
      setOutput(result);
    } catch {
      setOutput('Error generating hash');
    } finally {
      setLoading(false);
    }
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
    link.download = 'hash.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Text Input</h3>
            <Button onClick={handleClear} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
              Clear
            </Button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-48 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
          <div className="mt-3">
            <label className="text-sm text-secondary mb-2 block">Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {algorithms.map(alg => (
                <option key={alg} value={alg}>{alg}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">{algorithm} Hash</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={output} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-48 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Hash will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleGenerate} variant="primary" disabled={loading}>
          <Fingerprint className="w-4 h-4 mr-2" />
          {loading ? 'Generating...' : 'Generate Hash'}
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Cryptographic hashes are one-way functions. The same input always produces the same hash, but you cannot reverse a hash to get the original input.</p>
      </div>
    </div>
  );
}
