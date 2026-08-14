// Color Palette Generator Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { RefreshCw } from 'lucide-react';

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#6C63FF');
  const [palette, setPalette] = useState<string[]>([]);

  const generatePalette = () => {
    // Simple palette generation based on base color
    const colors: string[] = [];
    const base = baseColor.replace(/^#/, '');

    // Generate variations
    for (let i = 0; i < 5; i++) {
      // This is a simplified approach - real implementation would use color theory
      const variation = Math.floor(i * 51).toString(16).padStart(2, '0');
      colors.push(`#${base}${variation}`);
    }

    setPalette(colors);
  };

  const handleClear = () => {
    setBaseColor('#6C63FF');
    setPalette([]);
  };

  // Generate initial palette
  useState(() => {
    generatePalette();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Base Color</h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => {
              setBaseColor(e.target.value);
              generatePalette();
            }}
            className="w-16 h-16 rounded-lg cursor-pointer"
          />
          <input
            type="text"
            value={baseColor}
            onChange={(e) => {
              setBaseColor(e.target.value);
              generatePalette();
            }}
            className="flex-1 p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
          />
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={generatePalette} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          <Button onClick={handleClear} variant="ghost" size="sm">
            Clear
          </Button>
        </div>
      </div>

      {palette.length > 0 && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Color Palette</h3>
            <CopyButton textToCopy={palette.join(', ')} size="sm" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {palette.map((color, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-full h-16 rounded-lg mb-1"
                  style={{ backgroundColor: color }}
                />
                <div className="font-mono text-xs">{color}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Click Regenerate to create a new palette based on your base color.</p>
      </div>
    </div>
  );
}
