// Remove Duplicate Lines Tool
import { useState } from 'react';
import { removeDuplicateLines } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { ListMinus } from 'lucide-react';

export default function RemoveDuplicateLines() {
  const [input, setInput] = useState('apple\nbanana\napple\norange\nbanana\ngrape');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    const result = removeDuplicateLines(input);
    setOutput(result);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Input</h3>
            <Button onClick={handleClear} variant="ghost" size="sm">
              Clear
            </Button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text with duplicate lines..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Output</h3>
            <CopyButton textToCopy={output} size="sm" />
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Deduplicated text will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleProcess} variant="primary">
          <ListMinus className="w-4 h-4 mr-2" />
          Remove Duplicates
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> This removes duplicate lines while preserving the original order of the first occurrence.</p>
      </div>
    </div>
  );
}
