// HSL to HEX Converter
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { SquareCode } from 'lucide-react';

export default function HSLToHEX() {
  const [input, setInput] = useState('hsl(245, 100%, 70%)');
  const [output, setOutput] = useState('#6C63FF');

  const handleConvert = () => {
    const match = input.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (match) {
      const h = parseInt(match[1]) / 360;
      const s = parseInt(match[2]) / 100;
      const l = parseInt(match[3]) / 100;

      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h * 60) % 2) - 1));
      const m = l - c / 2;

      let r = 0, g = 0, b = 0;
      if (h >= 0 && h < 1/6) { r = c; g = x; b = 0; }
      else if (h >= 1/6 && h < 2/6) { r = x; g = c; b = 0; }
      else if (h >= 2/6 && h < 3/6) { r = 0; g = c; b = x; }
      else if (h >= 3/6 && h < 4/6) { r = 0; g = x; b = c; }
      else if (h >= 4/6 && h < 5/6) { r = x; g = 0; b = c; }
      else { r = c; g = 0; b = x; }

      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);

      setOutput(`#${[r, g, b].map(c => c.toString(16).padStart(2, '0').toUpperCase()).join('')}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">HSL Input</h3>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter HSL color..."
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
