// Color Contrast Checker
import { useState, useEffect } from 'react';
export default function ColorContrastChecker() {
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

  useEffect(() => {
    calculateContrast();
  }, [fgColor, bgColor]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Foreground Color</h3>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer"
          />
          <div className="mt-2 text-center font-mono text-sm">{fgColor}</div>
        </div>
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Background Color</h3>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
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
