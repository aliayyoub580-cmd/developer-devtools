// cURL Generator Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';
import { RefreshCw, Server } from 'lucide-react';

export default function CURLGenerator() {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET');
  const [url, setUrl] = useState('https://api.example.com/data');
  const [headers, setHeaders] = useState([{ key: 'Content-Type', value: 'application/json' }]);
  const [body, setBody] = useState('{"name": "John Doe", "email": "john@example.com"}');
  const [curlCommand, setCurlCommand] = useState('');

  const generateCurl = () => {
    let command = `curl -X ${method} "${url}"`;

    // Add headers
    headers.forEach(header => {
      if (header.key) {
        command += ` -H "${header.key}: ${header.value}"`;
      }
    });

    // Add body if present
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      command += ` -d '${body}'`;
    }

    setCurlCommand(command);
  };

  const handleClear = () => {
    setUrl('https://api.example.com/data');
    setHeaders([{ key: 'Content-Type', value: 'application/json' }]);
    setBody('{"name": "John Doe", "email": "john@example.com"}');
    setCurlCommand('');
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
    generateCurl();
  };

  // Generate initial command
  useState(() => {
    generateCurl();
    return null;
  });

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Request Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
          <select
            value={method}
            onChange={(e) => {
              setMethod(e.target.value as any);
              generateCurl();
            }}
            className="p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              generateCurl();
            }}
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
              onChange={(e) => {
                setBody(e.target.value);
                generateCurl();
              }}
              placeholder="Enter request body..."
              className="w-full h-24 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
            />
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <Button onClick={generateCurl} variant="primary">
            <Server className="w-4 h-4 mr-2" />
            Generate cURL
          </Button>
          <Button onClick={handleClear} variant="secondary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {curlCommand && (
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">cURL Command</h3>
            <CopyButton textToCopy={curlCommand} size="sm" />
          </div>
          <div className="bg-surface rounded-md p-3 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{curlCommand}</pre>
          </div>
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Copy the cURL command and run it in your terminal to test API endpoints.</p>
      </div>
    </div>
  );
}
