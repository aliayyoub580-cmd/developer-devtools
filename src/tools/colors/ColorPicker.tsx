// Color Picker Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
export default function ColorPicker() {
  const [color, setColor] = useState('#6C63FF');
  const [format, setFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');

  const getRgb = () => {
    const hex = color.replace(/^#/, '');
    if (hex.length === 3 || hex.length === 6) {
      const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
      const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
      const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return 'rgb(0, 0, 0)';
  };

  const getHsl = () => {
    const rgb = color.replace(/^#/, '').match(/.{1,2}/g)?.map(c => parseInt(c.length === 1 ? c + c : c, 16) / 255) || [0, 0, 0];
    const r = rgb[0], g = rgb[1], b = rgb[2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else {
        h = (r - g) / d + 4;
      }
      h = Math.round(h * 60);
    }

    return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const getFormattedColor = () => {
    switch (format) {
      case 'rgb': return getRgb();
      case 'hsl': return getHsl();
      default: return color;
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Pick a Color</h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-16 rounded-lg cursor-pointer"
          />
          <div className="flex-1">
            <div className="text-lg font-mono">{color}</div>
            <div className="text-sm text-muted">
              {format === 'hex' ? color : format === 'rgb' ? getRgb() : getHsl()}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm text-secondary mb-2 block">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as 'hex' | 'rgb' | 'hsl')}
            className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
          </select>
        </div>
        <div className="mt-4">
          <CopyButton textToCopy={getFormattedColor()} />
        </div>
      </div>
      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Click the color picker to select a color, or enter a color code manually.</p>
      </div>
    </div>
  );
}
