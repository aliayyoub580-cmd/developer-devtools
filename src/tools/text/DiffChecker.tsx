// Diff Checker Tool
import { useState } from 'react';
import { calculateDiff } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Diff } from 'lucide-react';

export default function DiffChecker() {
  const [oldText, setOldText] = useState('Hello, World!\nThis is the original text.\nIt has multiple lines.');
  const [newText, setNewText] = useState('Hello, World!\nThis is the modified text.\nIt has been changed.');
  const [diffResult, setDiffResult] = useState<ReturnType<typeof calculateDiff>>({ oldText: '', newText: '', diffs: [] });

  const handleCompare = () => {
    const result = calculateDiff(oldText, newText);
    setDiffResult(result);
  };

  const handleClear = () => {
    setOldText('');
    setNewText('');
    setDiffResult({ oldText: '', newText: '', diffs: [] });
  };

  const handleSwap = () => {
    setOldText(newText);
    setNewText(oldText);
    handleCompare();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Original */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Original</h3>
            <Button onClick={handleClear} variant="ghost" size="sm">
              Clear
            </Button>
          </div>
          <textarea
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            placeholder="Enter original text..."
            className="w-full h-48 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Modified */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Modified</h3>
            <Button onClick={handleSwap} variant="ghost" size="sm">
              Swap
            </Button>
          </div>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Enter modified text..."
            className="w-full h-48 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleCompare} variant="primary">
          <Diff className="w-4 h-4 mr-2" />
          Compare
        </Button>
      </div>

      {diffResult.diffs.length > 0 && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Differences</h3>
            <CopyButton textToCopy={diffResult.diffs.map(d => d.text).join('')} size="sm" />
          </div>
          <div className="h-48 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            {diffResult.diffs.map((diff, index) => (
              <span
                key={index}
                className={`whitespace-pre-wrap ${diff.type === 'insert' ? 'bg-success/20 text-success' : diff.type === 'delete' ? 'bg-error/20 text-error' : ''}`}
              >
                {diff.text}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Deleted text is shown in red, inserted text in green. Unchanged text is shown normally.</p>
      </div>
    </div>
  );
}
