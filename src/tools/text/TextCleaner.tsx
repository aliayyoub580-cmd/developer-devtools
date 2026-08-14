// Text Cleaner Tool
import { useState } from 'react';
import { cleanText } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Eraser } from 'lucide-react';

export default function TextCleaner() {
  const [input, setInput] = useState('  Hello   World!  \n\n  This   has   extra   spaces.  ');
  const [output, setOutput] = useState('');
  const [options, setOptions] = useState({
    removeExtraSpaces: true,
    removeSpecialChars: false,
    removeNumbers: false,
    removePunctuation: false,
    trimLines: true,
  });

  const handleClean = () => {
    const result = cleanText(input, options);
    setOutput(result);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleOptionChange = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Cleaning Options</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(options).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center gap-2 cursor-pointer p-2 bg-surface rounded-md hover:bg-elevated transition-colors"
            >
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleOptionChange(key as keyof typeof options)}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm text-secondary">
                {key.replace(/([A-Z])/g, ' $1').replace(/^ /, '')}
              </span>
            </label>
          ))}
        </div>
      </div>

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
            placeholder="Enter text to clean..."
            className="w-full h-48 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Output */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Cleaned Output</h3>
            <CopyButton textToCopy={output} size="sm" />
          </div>
          <div className="h-48 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{output || 'Cleaned text will appear here'}</pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleClean} variant="primary">
          <Eraser className="w-4 h-4 mr-2" />
          Clean Text
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Select cleaning options and click Clean Text to process your input.</p>
      </div>
    </div>
  );
}
