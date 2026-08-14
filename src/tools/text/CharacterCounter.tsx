// Character Counter Tool
import { useState } from 'react';
import { countCharacters } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
export default function CharacterCounter() {
  const [input, setInput] = useState('Hello, World!');
  const [stats, setStats] = useState(countCharacters(input));

  const handleClear = () => {
    setInput('');
    setStats(countCharacters(''));
  };

  const handleAnalyze = () => {
    setStats(countCharacters(input));
  };

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">Text Input</h3>
          <Button onClick={handleClear} variant="ghost" size="sm">
            Clear
          </Button>
        </div>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleAnalyze();
          }}
          placeholder="Enter text to count characters..."
          className="w-full h-48 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
        />
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-4">Character Count</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-surface rounded-lg">
            <div className="text-3xl font-bold text-primary">{stats.characters}</div>
            <div className="text-sm text-muted mt-1">Total Characters</div>
            <CopyButton textToCopy={String(stats.characters)} className="mt-2" />
          </div>
          <div className="text-center p-4 bg-surface rounded-lg">
            <div className="text-3xl font-bold text-primary">{stats.charactersNoSpaces}</div>
            <div className="text-sm text-muted mt-1">Characters (No Spaces)</div>
            <CopyButton textToCopy={String(stats.charactersNoSpaces)} className="mt-2" />
          </div>
        </div>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Useful for counting characters in social media posts, SMS messages, or any text with length limits.</p>
      </div>
    </div>
  );
}
