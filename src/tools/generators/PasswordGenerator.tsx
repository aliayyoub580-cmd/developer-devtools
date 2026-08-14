// Password Generator Tool
import { useState } from 'react';
import { generatePassword, calculatePasswordStrength } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Download, RefreshCw, Shield, Eye, EyeOff } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeAmbiguous: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleGenerate = () => {
    const result = generatePassword(options);
    setPassword(result);
  };

  const handleClear = () => {
    setPassword('');
  };

  const handleDownload = () => {
    const blob = new Blob([password], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'password.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const strength = calculatePasswordStrength(password);

  // Generate on mount
  useState(() => {
    handleGenerate();
    return null;
  });

  const handleOptionChange = (key: keyof typeof options, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">Password Settings</h3>
          <Button onClick={handleGenerate} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={options.length}
              onChange={(e) => handleOptionChange('length', Math.max(4, Math.min(128, parseInt(e.target.value) || 16)))}
              min="4"
              max="128"
              className="w-16 p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <label className="text-sm text-secondary">Length</label>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeUppercase}
              onChange={(e) => handleOptionChange('includeUppercase', e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm text-secondary">Uppercase</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeLowercase}
              onChange={(e) => handleOptionChange('includeLowercase', e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm text-secondary">Lowercase</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={(e) => handleOptionChange('includeNumbers', e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm text-secondary">Numbers</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={(e) => handleOptionChange('includeSymbols', e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm text-secondary">Symbols</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.excludeAmbiguous}
              onChange={(e) => handleOptionChange('excludeAmbiguous', e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm text-secondary">Exclude Ambiguous</span>
          </label>
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">Generated Password</h3>
          <div className="flex gap-2">
            <CopyButton textToCopy={password} size="sm" />
            <Button onClick={handleDownload} variant="ghost" size="sm">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button onClick={handleClear} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
              Clear
            </Button>
            <Button onClick={() => setShowPassword(!showPassword)} variant="ghost" size="sm">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <div className="overflow-auto bg-surface rounded-md p-3 font-mono text-lg">
          <pre className="whitespace-pre-wrap break-all">
            {showPassword ? password : '*'.repeat(password.length)}
          </pre>
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-secondary">Password Strength:</span>
            <span className={`text-sm font-medium ${strength.color}`}>
              {strength.label}
            </span>
            <span className="text-sm text-muted">({strength.score}/100)</span>
          </div>
          <div className="h-2 bg-border/20 rounded-full overflow-hidden">
            <div
              className={`h-full ${strength.color.replace('text-', 'bg-')}`}
              style={{ width: `${strength.score}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleGenerate} variant="primary">
          <Shield className="w-4 h-4 mr-2" />
          Generate Password
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Use strong, unique passwords for each account. Consider using a password manager to store them securely.</p>
      </div>
    </div>
  );
}
