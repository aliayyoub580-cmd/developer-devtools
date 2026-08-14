// HEX to RGB Converter
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Hexagon } from 'lucide-react';

export default function HEXToRGB() {
  const [input, setInput] = useState('#6C63FF');
  const [output, setOutput] = useState('rgb(108, 99, 255)');

  const handleConvert = () => {
    const hex = input.replace(/^#/, '');
    if (hex.length === 3 || hex.length === 6) {
      const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
      const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
      const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
      setOutput(`rgb(${r}, ${g}, ${b})`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">HEX Input</h3>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter HEX color..."
            className="w-full p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
          />
        </div>
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">RGB Output</h3>
            <CopyButton textToCopy={output} size="sm" />
          </div>
          <div className="bg-surface rounded-md p-3 font-mono">{output}</div>
        </div>
      </div>
      <Button onClick={handleConvert} variant="primary">
        <Hexagon className="w-4 h-4 mr-2" />
        Convert to RGB
      </Button>
    </div>
  );
}
