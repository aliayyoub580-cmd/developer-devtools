// Regex Tester Tool
import { useState } from 'react';
import { testRegex } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Search } from 'lucide-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('[a-z]+');
  const [text, setText] = useState('Hello World 123');
  const [flags, setFlags] = useState('');
  const [result, setResult] = useState<ReturnType<typeof testRegex>>({ matches: [], matchCount: 0, capturedGroups: [], matchPositions: [] });

  const handleTest = () => {
    try {
      const res = testRegex(text, pattern, flags);
      setResult(res);
    } catch {
      setResult({ matches: [], matchCount: 0, capturedGroups: [], matchPositions: [] });
    }
  };

  const handleClear = () => {
    setPattern('');
    setText('');
    setFlags('');
    setResult({ matches: [], matchCount: 0, capturedGroups: [], matchPositions: [] });
  };

  const flagOptions = ['g', 'i', 'm', 's', 'u', 'y'];

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Regular Expression</h3>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Enter regex pattern..."
          className="w-full p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
        />
        <div className="mt-3">
          <label className="text-sm text-secondary mb-2 block">Flags</label>
          <div className="flex flex-wrap gap-2">
            {flagOptions.map(flag => (
              <button
                key={flag}
                onClick={() => {
                  if (flags.includes(flag)) {
                    setFlags(flags.replace(flag, ''));
                  } else {
                    setFlags(flags + flag);
                  }
                }}
                className={`px-3 py-1 rounded-md text-sm font-mono ${flags.includes(flag) ? 'bg-accent text-white' : 'bg-surface text-secondary hover:bg-elevated'}`}
              >
                {flag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Test String</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to test..."
          className="w-full h-32 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleTest} variant="primary">
          <Search className="w-4 h-4 mr-2" />
          Test Regex
        </Button>
        <Button onClick={handleClear} variant="secondary">
          Clear
        </Button>
      </div>

      {result.matches.length > 0 && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Results</h3>
            <CopyButton textToCopy={result.matches.join('\n')} size="sm" />
          </div>
          <div className="space-y-3">
            <div className="bg-surface rounded-md p-3">
              <div className="text-sm text-muted mb-1">Matches ({result.matchCount})</div>
              <div className="font-mono text-sm">{result.matches.join(', ')}</div>
            </div>
            {result.capturedGroups.length > 0 && (
              <div className="bg-surface rounded-md p-3">
                <div className="text-sm text-muted mb-1">Captured Groups</div>
                {result.capturedGroups.map((group, i) => (
                  <div key={i} className="font-mono text-sm">
                    Group {i + 1}: {group.join(', ')}
                  </div>
                ))}
              </div>
            )}
            {result.matchPositions.length > 0 && (
              <div className="bg-surface rounded-md p-3">
                <div className="text-sm text-muted mb-1">Positions</div>
                {result.matchPositions.map((pos, i) => (
                  <div key={i} className="font-mono text-sm">
                    Match {i + 1}: [{pos.start}, {pos.end}]
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Use flags: g (global), i (case insensitive), m (multiline), s (dotall), u (unicode), y (sticky).</p>
      </div>
    </div>
  );
}
