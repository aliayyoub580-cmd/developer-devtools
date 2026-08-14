// Word Counter Tool
import { useState } from 'react';
import { countWords } from '../../utils';
import { Button } from '../../components';
export default function WordCounter() {
  const [input, setInput] = useState('The quick brown fox jumps over the lazy dog. This is a sample text for word counting.');
  const [stats, setStats] = useState(countWords(input));

  const handleClear = () => {
    setInput('');
    setStats(countWords(''));
  };

  const handleAnalyze = () => {
    setStats(countWords(input));
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
          placeholder="Enter text to analyze..."
          className="w-full h-48 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
        />
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-4">Text Statistics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.words}</div>
            <div className="text-sm text-muted">Words</div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.characters}</div>
            <div className="text-sm text-muted">Characters</div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
            <div className="text-sm text-muted">No Spaces</div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.lines}</div>
            <div className="text-sm text-muted">Lines</div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.sentences}</div>
            <div className="text-sm text-muted">Sentences</div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
            <div className="text-sm text-muted">Paragraphs</div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Statistics are updated automatically as you type.</p>
      </div>
    </div>
  );
}
