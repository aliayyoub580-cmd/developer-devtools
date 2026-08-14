// Simple placeholder tools for the remaining categories
// These will be enhanced later

import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, FileText, Code, Database, Server, Clock, Palette, Image as ImageIcon, Terminal, GitBranch, Calendar, Globe, HardDrive, File, Smartphone, Pipette, SquareCode, Droplets, Eye, Gradient, Search, Diff, ListMinus, SortAsc, Eraser, CaseSensitive, Hash, Type, FileSpreadsheet, Minimize, Link, Hexagon, SquareCode as SquareCodeIcon, Sun, Moon, Star, TrendingUp, Shield, Dice, QrCode, Key, Fingerprint, AlertTriangle } from 'lucide-react';

// Color Picker Tool
export function ColorPicker() {
  const [color, setColor] = useState('#6C63FF');
  const [format, setFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');

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
              {format === 'hex' ? color : format === 'rgb' ? `rgb(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)})` : `hsl(${Math.round((parseInt(color.slice(1, 3), 16) / 255) * 360)}, 100%, 50%)`}
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
      </div>
      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Click the color picker to select a color, or enter a color code manually.</p>
      </div>
    </div>
  );
}

// HEX to RGB Converter
export function HEXToRGB() {
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

// RGB to HEX Converter
export function RGBToHEX() {
  const [input, setInput] = useState('rgb(108, 99, 255)');
  const [output, setOutput] = useState('#6C63FF');

  const handleConvert = () => {
    const match = input.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const r = parseInt(match[1]).toString(16).padStart(2, '0');
      const g = parseInt(match[2]).toString(16).padStart(2, '0');
      const b = parseInt(match[3]).toString(16).padStart(2, '0');
      setOutput(`#${r}${g}${b}`.toUpperCase());
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
        <SquareCodeIcon className="w-4 h-4 mr-2" />
        Convert to HEX
      </Button>
    </div>
  );
}

// HEX to HSL Converter
export function HEXToHSL() {
  const [input, setInput] = useState('#6C63FF');
  const [output, setOutput] = useState('hsl(245, 100%, 70%)');

  const handleConvert = () => {
    const hex = input.replace(/^#/, '');
    if (hex.length === 3 || hex.length === 6) {
      const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16) / 255;

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

      setOutput(`hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
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
            <h3 className="font-medium text-primary">HSL Output</h3>
            <CopyButton textToCopy={output} size="sm" />
          </div>
          <div className="bg-surface rounded-md p-3 font-mono">{output}</div>
        </div>
      </div>
      <Button onClick={handleConvert} variant="primary">
        <Droplets className="w-4 h-4 mr-2" />
        Convert to HSL
      </Button>
    </div>
  );
}

// HSL to HEX Converter
export function HSLToHEX() {
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
        <SquareCodeIcon className="w-4 h-4 mr-2" />
        Convert to HEX
      </Button>
    </div>
  );
}

// Color Contrast Checker
export function ColorContrastChecker() {
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [ratio, setRatio] = useState(21);

  const calculateContrast = () => {
    const getLuminance = (hex: string) => {
      const rgb = hex.replace(/^#/, '').match(/.{1,2}/g)?.map(c => parseInt(c.length === 1 ? c + c : c, 16) / 255) || [0, 0, 0];
      const a = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const l1 = getLuminance(fgColor);
    const l2 = getLuminance(bgColor);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const newRatio = (lighter + 0.05) / (darker + 0.05);
    setRatio(Math.round(newRatio * 100) / 100);
  };

  const aaNormal = ratio >= 4.5;
  const aaaNormal = ratio >= 7;
  const aaLarge = ratio >= 3;
  const aaaLarge = ratio >= 4.5;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Foreground Color</h3>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => {
              setFgColor(e.target.value);
              calculateContrast();
            }}
            className="w-full h-12 rounded-lg cursor-pointer"
          />
          <div className="mt-2 text-center font-mono text-sm">{fgColor}</div>
        </div>
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Background Color</h3>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => {
              setBgColor(e.target.value);
              calculateContrast();
            }}
            className="w-full h-12 rounded-lg cursor-pointer"
          />
          <div className="mt-2 text-center font-mono text-sm">{bgColor}</div>
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Contrast Ratio: {ratio.toFixed(2)}:1</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-primary mb-2">Normal Text</h4>
            <div className="space-y-1">
              <div className={`p-2 rounded text-sm ${aaNormal ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                AA: {aaNormal ? '✓ Pass' : '✗ Fail'}
              </div>
              <div className={`p-2 rounded text-sm ${aaaNormal ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                AAA: {aaaNormal ? '✓ Pass' : '✗ Fail'}
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">Large Text</h4>
            <div className="space-y-1">
              <div className={`p-2 rounded text-sm ${aaLarge ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                AA: {aaLarge ? '✓ Pass' : '✗ Fail'}
              </div>
              <div className={`p-2 rounded text-sm ${aaaLarge ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                AAA: {aaaLarge ? '✓ Pass' : '✗ Fail'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> WCAG requires at least 4.5:1 contrast for normal text and 3:1 for large text.</p>
      </div>
    </div>
  );
}

// Gradient Generator
export function GradientGenerator() {
  const [color1, setColor1] = useState('#6C63FF');
  const [color2, setColor2] = useState('#22C55E');
  const [angle, setAngle] = useState(90);
  const [css, setCss] = useState('linear-gradient(90deg, #6C63FF, #22C55E)');

  const handleGenerate = () => {
    setCss(`linear-gradient(${angle}deg, ${color1}, ${color2})`);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Color 1</h3>
          <input
            type="color"
            value={color1}
            onChange={(e) => {
              setColor1(e.target.value);
              handleGenerate();
            }}
            className="w-full h-12 rounded-lg cursor-pointer mb-2"
          />
          <input
            type="text"
            value={color1}
            onChange={(e) => {
              setColor1(e.target.value);
              handleGenerate();
            }}
            className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
          />
        </div>
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Color 2</h3>
          <input
            type="color"
            value={color2}
            onChange={(e) => {
              setColor2(e.target.value);
              handleGenerate();
            }}
            className="w-full h-12 rounded-lg cursor-pointer mb-2"
          />
          <input
            type="text"
            value={color2}
            onChange={(e) => {
              setColor2(e.target.value);
              handleGenerate();
            }}
            className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
          />
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Angle</h3>
        <input
          type="range"
          value={angle}
          onChange={(e) => {
            setAngle(parseInt(e.target.value));
            handleGenerate();
          }}
          min="0"
          max="360"
          className="w-full"
        />
        <div className="text-center mt-2">{angle}°</div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">CSS Gradient</h3>
          <CopyButton textToCopy={css} size="sm" />
        </div>
        <div className="bg-surface rounded-md p-3 font-mono text-sm">{css}</div>
        <div className="mt-4 h-24 rounded-lg" style={{ background: css }} />
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Copy the CSS and use it directly in your stylesheets.</p>
      </div>
    </div>
  );
}
