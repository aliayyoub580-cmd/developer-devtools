// REST API Tester Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { Send, RefreshCw } from 'lucide-react';

export default function RESTAPITester() {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    setResponse('');
    setStatus(0);

    try {
      const headerMap: Record<string, string> = headers.reduce((acc, header) => {
        if (header.key) {
          acc[header.key] = header.value;
        }
        return acc;
      }, {} as Record<string, string>);

      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        if (!headerMap['Content-Type']) {
          headerMap['Content-Type'] = 'application/json';
        }
      }

      const options: RequestInit = {
        method,
        headers: headerMap,
      };

      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = body;
      }

      const res = await fetch(url, options);
      setStatus(res.status);

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await res.json();
        setResponse(JSON.stringify(json, null, 2));
      } else {
        const text = await res.text();
        setResponse(text);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error sending request');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUrl('https://jsonplaceholder.typicode.com/posts/1');
    setHeaders([{ key: '', value: '' }]);
    setBody('');
    setResponse('');
    setStatus(0);
    setError(null);
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleRemoveHeader = (index: number) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Request</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as any)}
            className="p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL..."
            className="sm:col-span-3 p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>

        <div className="mb-3">
          <h4 className="font-medium text-primary mb-2">Headers</h4>
          {headers.map((header, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={header.key}
                onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                placeholder="Header name"
                className="flex-1 p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <input
                type="text"
                value={header.value}
                onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                placeholder="Header value"
                className="flex-1 p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <Button onClick={() => handleRemoveHeader(index)} variant="ghost" size="sm">
                ×
              </Button>
            </div>
          ))}
          <Button onClick={handleAddHeader} variant="ghost" size="sm">
            + Add Header
          </Button>
        </div>

        {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
          <div>
            <h4 className="font-medium text-primary mb-2">Body</h4>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter request body..."
              className="w-full h-24 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
            />
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <Button onClick={handleSend} variant="primary" disabled={loading}>
            <Send className="w-4 h-4 mr-2" />
            {loading ? 'Sending...' : 'Send Request'}
          </Button>
          <Button onClick={handleClear} variant="secondary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {status > 0 && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <h3 className="font-medium text-primary mb-3">Response</h3>
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded text-sm font-bold ${
              status >= 200 && status < 300 ? 'bg-success/10 text-success' :
              status >= 300 && status < 400 ? 'bg-warning/10 text-warning' :
              status >= 400 && status < 500 ? 'bg-error/10 text-error' :
              'bg-muted/10 text-muted'
            }`}>
              {status}
            </span>
            <CopyButton textToCopy={response} size="sm" />
          </div>
          <div className="h-48 overflow-auto bg-surface rounded-md p-3 font-mono text-sm">
            {error ? (
              <div className="text-error">{error}</div>
            ) : (
              <pre className="whitespace-pre-wrap break-all">{response || 'Response will appear here'}</pre>
            )}
          </div>
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Test REST API endpoints directly from your browser. Note that CORS restrictions may apply to some endpoints.</p>
      </div>
    </div>
  );
}
