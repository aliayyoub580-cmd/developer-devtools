// User Agent Parser Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Smartphone, RefreshCw } from 'lucide-react';

export default function UserAgentParser() {
  const [input, setInput] = useState('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  const [parsed, setParsed] = useState<any>(null);

  const handleParse = () => {
    try {
      // Simple user agent parsing
      const ua = input;
      const result: any = {};

      // Browser detection
      if (ua.includes('Chrome')) {
        result.browser = 'Chrome';
        const chromeMatch = ua.match(/Chrome\/([\d.]+)/);
        if (chromeMatch) {
          result.browserVersion = chromeMatch[1];
        }
      } else if (ua.includes('Firefox')) {
        result.browser = 'Firefox';
        const firefoxMatch = ua.match(/Firefox\/([\d.]+)/);
        if (firefoxMatch) {
          result.browserVersion = firefoxMatch[1];
        }
      } else if (ua.includes('Safari')) {
        result.browser = 'Safari';
        const safariMatch = ua.match(/Safari\/([\d.]+)/);
        if (safariMatch) {
          result.browserVersion = safariMatch[1];
        }
      } else if (ua.includes('Edge')) {
        result.browser = 'Edge';
        const edgeMatch = ua.match(/Edge\/([\d.]+)/);
        if (edgeMatch) {
          result.browserVersion = edgeMatch[1];
        }
      }

      // OS detection
      if (ua.includes('Windows NT 10.0')) {
        result.os = 'Windows 10';
      } else if (ua.includes('Windows NT 6.3')) {
        result.os = 'Windows 8.1';
      } else if (ua.includes('Mac OS X')) {
        result.os = 'macOS';
        const macMatch = ua.match(/Mac OS X (\d+[._]\d+)/);
        if (macMatch) {
          result.osVersion = macMatch[1].replace('_', '.');
        }
      } else if (ua.includes('Linux')) {
        result.os = 'Linux';
      } else if (ua.includes('iPhone') || ua.includes('iPad')) {
        result.os = 'iOS';
      } else if (ua.includes('Android')) {
        result.os = 'Android';
      }

      // Device detection
      if (ua.includes('Mobile')) {
        result.device = 'Mobile';
      } else if (ua.includes('Tablet')) {
        result.device = 'Tablet';
      } else {
        result.device = 'Desktop';
      }

      // Engine detection
      if (ua.includes('AppleWebKit')) {
        result.engine = 'WebKit';
      } else if (ua.includes('Gecko')) {
        result.engine = 'Gecko';
      } else if (ua.includes('Trident')) {
        result.engine = 'Trident';
      }

      // Architecture
      if (ua.includes('Win64') || ua.includes('x64')) {
        result.architecture = '64-bit';
      } else if (ua.includes('WOW64')) {
        result.architecture = '64-bit (WOW64)';
      } else if (ua.includes('Win32') || ua.includes('x86')) {
        result.architecture = '32-bit';
      }

      setParsed(result);
    } catch {
      setParsed(null);
    }
  };

  const handleClear = () => {
    setInput('');
    setParsed(null);
  };

  // Parse on mount
  useState(() => {
    handleParse();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">User Agent String</h3>
          <Button onClick={handleClear} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
            Clear
          </Button>
        </div>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleParse();
          }}
          placeholder="Enter User Agent string..."
          className="w-full h-24 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
        />
      </div>

      {parsed && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Parsed Information</h3>
            <CopyButton textToCopy={JSON.stringify(parsed, null, 2)} size="sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-surface rounded-lg p-3">
              <div className="text-sm text-muted mb-1">Browser</div>
              <div className="font-medium text-primary">{parsed.browser || 'Unknown'} {parsed.browserVersion ? `(${parsed.browserVersion})` : ''}</div>
            </div>
            <div className="bg-surface rounded-lg p-3">
              <div className="text-sm text-muted mb-1">Operating System</div>
              <div className="font-medium text-primary">{parsed.os || 'Unknown'} {parsed.osVersion ? `(${parsed.osVersion})` : ''}</div>
            </div>
            <div className="bg-surface rounded-lg p-3">
              <div className="text-sm text-muted mb-1">Device</div>
              <div className="font-medium text-primary">{parsed.device || 'Unknown'}</div>
            </div>
            <div className="bg-surface rounded-lg p-3">
              <div className="text-sm text-muted mb-1">Engine</div>
              <div className="font-medium text-primary">{parsed.engine || 'Unknown'}</div>
            </div>
            <div className="bg-surface rounded-lg p-3">
              <div className="text-sm text-muted mb-1">Architecture</div>
              <div className="font-medium text-primary">{parsed.architecture || 'Unknown'}</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={handleParse} variant="primary">
          <Smartphone className="w-4 h-4 mr-2" />
          Parse User Agent
        </Button>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> User Agent strings contain information about the browser, operating system, and device. This tool extracts and parses that information.</p>
      </div>
    </div>
  );
}
