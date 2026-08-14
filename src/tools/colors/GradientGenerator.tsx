// Gradient Generator Tool
import { useState, useEffect } from 'react';
import { CopyButton } from '../../components';
export default function GradientGenerator() {
  const [color1, setColor1] = useState('#6C63FF');
  const [color2, setColor2] = useState('#22C55E');
  const [angle, setAngle] = useState(90);
  const [css, setCss] = useState('linear-gradient(90deg, #6C63FF, #22C55E)');

  const handleGenerate = () => {
    setCss(`linear-gradient(${angle}deg, ${color1}, ${color2})`);
  };

  useEffect(() => {
    handleGenerate();
  }, [color1, color2, angle]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Color 1</h3>
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer mb-2"
          />
          <input
            type="text"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
          />
        </div>
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Color 2</h3>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer mb-2"
          />
          <input
            type="text"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono"
          />
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Angle</h3>
        <input
          type="range"
          value={angle}
          onChange={(e) => setAngle(parseInt(e.target.value))}
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
