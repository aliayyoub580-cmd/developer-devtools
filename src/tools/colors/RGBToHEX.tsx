// RGB to HEX Converter
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { SquareCode } from 'lucide-react';

export default function RGBToHEX() {
  const [input, setInput] = useState('rgb(108, 99, 255)');
  const [output, setOutput] = useState('#6C63FF');

  const handleConvert = () => {
    const match = input.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const r = parseInt(match[1]).toString(16).padStart(2, '0').toUpperCase();
      const g = parseInt(match[2]).toString(16).padStart(2, '0').toUpperCase();
      const b = parseInt(match[3]).toString(16).padStart(2, '0').toUpperCase();
      setOutput(`#${r}${g}${b}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">RGB Input</h3>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter RGB color..."
            className="w-full p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
          />
        </div>
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">HEX Output</h3>
            <CopyButton textToCopy={output} size="sm" />
          </div>
          <div className="bg-surface rounded-md p-3 font-mono">{output}</div>
        </div>
      </div>
      <Button onClick={handleConvert} variant="primary">
        <SquareCode className="w-4 h-4 mr-2" />
        Convert to HEX
      </Button>
    </div>
  );
}
