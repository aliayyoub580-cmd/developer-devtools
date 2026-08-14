// MIME Type Lookup Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { RefreshCw, Search } from 'lucide-react';

export default function MIMETypeLookup() {
  const [input, setInput] = useState('json');
  const [result, setResult] = useState<{ extension: string; mimeType: string } | null>(null);

  // Common MIME types
  const mimeTypes: Record<string, string> = {
    // Text
    txt: 'text/plain',
    html: 'text/html',
    htm: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    json: 'application/json',
    xml: 'application/xml',
    csv: 'text/csv',

    // Images
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    ico: 'image/x-icon',

    // Audio
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',

    // Video
    mp4: 'video/mp4',
    webm: 'video/webm',
    mov: 'video/quicktime',

    // Archives
    zip: 'application/zip',
    tar: 'application/x-tar',
    gz: 'application/gzip',
    rar: 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',

    // Documents
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

    // Fonts
    ttf: 'font/ttf',
    otf: 'font/otf',
    woff: 'font/woff',
    woff2: 'font/woff2',

    // Other
    wasm: 'application/wasm',
  };

  // Reverse lookup: MIME type to extension
  const mimeToExt: Record<string, string> = {};
  Object.entries(mimeTypes).forEach(([ext, mime]) => {
    mimeToExt[mime] = ext;
  });

  const handleLookup = () => {
    const query = input.trim().toLowerCase();

    // Try as extension first
    if (mimeTypes[query]) {
      setResult({ extension: query, mimeType: mimeTypes[query] });
      return;
    }

    // Try as MIME type
    if (mimeToExt[query]) {
      setResult({ extension: mimeToExt[query], mimeType: query });
      return;
    }

    // Try with dot prefix
    if (query.startsWith('.') && mimeTypes[query.slice(1)]) {
      setResult({ extension: query.slice(1), mimeType: mimeTypes[query.slice(1)] });
      return;
    }

    // Not found
    setResult(null);
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  // Lookup on mount
  useState(() => {
    handleLookup();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-primary">Lookup</h3>
          <Button onClick={handleClear} variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
            Clear
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleLookup();
            }}
            placeholder="Enter file extension or MIME type..."
            className="w-full pl-10 pr-4 py-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>

      {result && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Result</h3>
            <CopyButton textToCopy={`${result.extension}: ${result.mimeType}`} size="sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-surface rounded-lg p-3">
              <div className="text-sm text-muted mb-1">File Extension</div>
              <div className="font-medium text-primary font-mono">.{result.extension}</div>
            </div>
            <div className="bg-surface rounded-lg p-3">
              <div className="text-sm text-muted mb-1">MIME Type</div>
              <div className="font-medium text-primary font-mono">{result.mimeType}</div>
            </div>
          </div>
        </div>
      )}

      {!result && input && (
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-warning text-sm">
          No MIME type found for "{input}"
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Enter a file extension (e.g., json, png, pdf) or a MIME type (e.g., application/json) to look up the corresponding MIME type or extension.</p>
      </div>
    </div>
  );
}
