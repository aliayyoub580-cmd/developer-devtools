// File Size Converter Tool
import { useState, useEffect } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { RefreshCw, ArrowLeftRight } from 'lucide-react';

export default function FileSizeConverter() {
  const [input, setInput] = useState('1024');
  const [fromUnit, setFromUnit] = useState<'bytes' | 'kb' | 'mb' | 'gb' | 'tb'>('kb');
  const [toUnit, setToUnit] = useState<'bytes' | 'kb' | 'mb' | 'gb' | 'tb'>('mb');
  const [result, setResult] = useState('1');

  const units = ['bytes', 'kb', 'mb', 'gb', 'tb'] as const;
  const unitNames: Record<string, string> = {
    bytes: 'Bytes',
    kb: 'Kilobytes',
    mb: 'Megabytes',
    gb: 'Gigabytes',
    tb: 'Terabytes',
  };

  const convert = () => {
    const value = parseFloat(input) || 0;
    const fromIndex = units.indexOf(fromUnit);
    const toIndex = units.indexOf(toUnit);

    if (fromIndex === -1 || toIndex === -1) {
      setResult('0');
      return;
    }

    const exponent = toIndex - fromIndex;
    const factor = Math.pow(1024, exponent);
    const converted = value * factor;

    setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleClear = () => {
    setInput('');
    setResult('0');
  };

  useEffect(() => {
    convert();
  }, [input, fromUnit, toUnit]);

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">File Size Conversion</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <input
              type="number"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder="Enter size"
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <select
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value as any);
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unitNames[unit]}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSwap} variant="ghost" size="sm">
              <ArrowLeftRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="mt-3 text-center">
          <svg className="w-6 h-6 mx-auto text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div>
            <select
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value as any);
                convert();
              }}
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unitNames[unit]}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              value={result}
              readOnly
              className="w-full p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <CopyButton textToCopy={result} className="absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Button onClick={handleClear} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Common Conversions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          {[
            { from: '1 KB', to: '1024 Bytes' },
            { from: '1 MB', to: '1024 KB' },
            { from: '1 GB', to: '1024 MB' },
            { from: '1 TB', to: '1024 GB' },
          ].map((conv, index) => (
            <div key={index} className="bg-surface rounded-lg p-2 text-center">
              <div className="font-medium text-primary">{conv.from}</div>
              <div className="text-muted">= {conv.to}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> File sizes are calculated using binary prefixes (1 KB = 1024 bytes).</p>
      </div>
    </div>
  );
}
