// Sort Lines Tool
import { useState } from 'react';
import { sortLines } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { SortAsc } from 'lucide-react';

export default function SortLines() {
  const [input, setInput] = useState('banana\napple\norange\ngrape\nkiwi');
  const [output, setOutput] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [numeric, setNumeric] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(true);

  const handleSort = () => {
    const result = sortLines(input, order, numeric, caseSensitive);
    setOutput(result);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Sort Options</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
            className="p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <label className="flex items-center gap-2 cursor-pointer p-2 bg-surface rounded-md">
            <input
              type="checkbox"
              checked={numeric}
              onChange={(e) => setNumeric(e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm text-secondary">Numeric</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-2 bg-surface rounded-md">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm text-secondary">Case Sensitive</span>
          </label>
          <Button onClick={handleClear} variant="ghost" size="sm">
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Input</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to sort..."
            className="w-full h-48 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Sorted Output</h3>
            <CopyButton textToCopy={output} size="sm" />
          </div>
          <div className="h-48 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Sorted text will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSort} variant="primary">
          <SortAsc className="w-4 h-4 mr-2" />
          Sort Lines
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Sort lines alphabetically or numerically. Choose ascending or descending order.</p>
      </div>
    </div>
  );
}
