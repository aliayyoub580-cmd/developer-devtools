// UUID Generator Tool
import { useState } from 'react';
import { generateUUID } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Hash, ListPlus } from 'lucide-react';

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState('');
  const [version, setVersion] = useState<1 | 4>(4);
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  const handleGenerate = () => {
    if (count === 1) {
      const result = generateUUID(version);
      setUuid(result);
      setUuids([result]);
    } else {
      const results: string[] = [];
      for (let i = 0; i < count; i++) {
        results.push(generateUUID(version));
      }
      setUuid(results[0]);
      setUuids(results);
    }
  };

  const handleClear = () => {
    setUuid('');
    setUuids([]);
  };

  const handleDownload = () => {
    const content = uuids.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'uuids.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  // Generate on mount
  useState(() => {
    handleGenerate();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">UUID Settings</h3>
          <Button onClick={handleGenerate} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-secondary mb-2 block">UUID Version</label>
            <select
              value={version}
              onChange={(e) => setVersion(parseInt(e.target.value) as 1 | 4)}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value={4}>UUID v4 (Random)</option>
              <option value={1}>UUID v1 (Time-based)</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-secondary mb-2 block">Count</label>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {[1, 5, 10, 50, 100].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {count === 1 ? (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Generated UUID</h3>
            <div className="flex gap-2">
              <CopyButton textToCopy={uuid} size="sm" />
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{uuid}</pre>
          </div>
        </div>
      ) : (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Generated UUIDs ({uuids.length})</h3>
            <div className="flex gap-2">
              <Button onClick={handleCopyAll} variant="ghost" size="sm">
                <ListPlus className="w-4 h-4" />
                Copy All
              </Button>
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3">
            <div className="space-y-2 font-mono text-sm">
              {uuids.map((id, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-muted">{index + 1}.</span>
                  <pre className="flex-1 whitespace-pre-wrap break-all">{id}</pre>
                  <CopyButton textToCopy={id} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={handleGenerate} variant="primary">
          <Hash className="w-4 h-4 mr-2" />
          Generate UUID{count > 1 ? 's' : ''}
        </Button>
        <Button onClick={handleClear} variant="secondary">
          <RefreshCw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> UUID v4 generates random UUIDs, while UUID v1 includes timestamp and MAC address information.</p>
      </div>
    </div>
  );
}
