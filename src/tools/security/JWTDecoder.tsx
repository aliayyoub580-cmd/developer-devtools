// JWT Decoder Tool
import { useState } from 'react';
import { decodeJWT } from '../../utils';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { RefreshCw, Key, AlertTriangle } from 'lucide-react';

export default function JWTDecoder() {
  const [input, setInput] = useState('[REDACTED]');
  const [decoded, setDecoded] = useState<{ header: any; payload: any; signature: string; valid: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    try {
      const result = decodeJWT(input);
      setDecoded(result);
      setError(null);
    } catch {
      setError('Invalid JWT token');
    }
  };

  const handleClear = () => {
    setInput('');
    setDecoded(null);
    setError(null);
  };

  const formatJson = (obj: any) => {
    if (!obj) return 'null';
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">JWT Token</h3>
          <Button onClick={handleClear} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
            Clear
          </Button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter JWT token..."
          className="w-full h-16 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleDecode} variant="primary">
          <Key className="w-4 h-4 mr-2" />
          Decode JWT
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
          <AlertTriangle className="w-4 h-4" />
          {error}
        </div>
      )}

      {decoded && (
        <div className="space-y-4">
          {/* Warning */}
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-warning text-sm">
            <AlertTriangle className="w-4 h-4 inline-block mr-2" />
            <strong>Important:</strong> Decoding a JWT does NOT verify its signature. Anyone can decode a JWT, but only the holder of the secret key can verify if it's valid.
          </div>

          {/* Privacy Warning */}
          <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
            <AlertTriangle className="w-4 h-4 inline-block mr-2" />
            <strong>Privacy Notice:</strong> Do not paste sensitive production tokens into third-party services. This tool decodes JWTs entirely in your browser.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Header */}
            <div className="bg-elevated rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-primary">Header</h3>
                <CopyButton textToCopy={formatJson(decoded.header)} size="sm" />
              </div>
              <div className="h-48 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
                <pre className="whitespace-pre-wrap break-all">{formatJson(decoded.header)}</pre>
              </div>
            </div>

            {/* Payload */}
            <div className="bg-elevated rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-primary">Payload</h3>
                <CopyButton textToCopy={formatJson(decoded.payload)} size="sm" />
              </div>
              <div className="h-48 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
                <pre className="whitespace-pre-wrap break-all">{formatJson(decoded.payload)}</pre>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="bg-elevated rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-primary">Signature</h3>
              <CopyButton textToCopy={decoded.signature} size="sm" />
            </div>
            <div className="overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
              <pre className="whitespace-pre-wrap break-all">{decoded.signature}</pre>
            </div>
          </div>
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> A JWT consists of three parts: Header (algorithm & token type), Payload (claims), and Signature (verification).</p>
      </div>
    </div>
  );
}
