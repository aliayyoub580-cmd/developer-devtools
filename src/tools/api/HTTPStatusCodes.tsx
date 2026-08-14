// HTTP Status Codes Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Search } from 'lucide-react';

export default function HTTPStatusCodes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // HTTP status codes data
  const statusCodes = [
    { code: 100, name: 'Continue', category: '1xx', description: 'The server has received the request headers and the client should proceed to send the request body.' },
    { code: 101, name: 'Switching Protocols', category: '1xx', description: 'The server is switching protocols as requested by the client.' },
    { code: 200, name: 'OK', category: '2xx', description: 'The request was successful.' },
    { code: 201, name: 'Created', category: '2xx', description: 'The request was successful and a new resource was created.' },
    { code: 202, name: 'Accepted', category: '2xx', description: 'The request has been accepted for processing, but the processing has not been completed.' },
    { code: 204, name: 'No Content', category: '2xx', description: 'The request was successful but there is no content to return.' },
    { code: 301, name: 'Moved Permanently', category: '3xx', description: 'The requested resource has been permanently moved to a new URL.' },
    { code: 302, name: 'Found', category: '3xx', description: 'The requested resource temporarily resides at a different URL.' },
    { code: 304, name: 'Not Modified', category: '3xx', description: 'The resource has not been modified since the last request.' },
    { code: 400, name: 'Bad Request', category: '4xx', description: 'The server could not understand the request due to invalid syntax.' },
    { code: 401, name: 'Unauthorized', category: '4xx', description: 'Authentication is required and has failed or not been provided.' },
    { code: 403, name: 'Forbidden', category: '4xx', description: 'The server understood the request but refuses to authorize it.' },
    { code: 404, name: 'Not Found', category: '4xx', description: 'The requested resource could not be found.' },
    { code: 405, name: 'Method Not Allowed', category: '4xx', description: 'The request method is not supported for the requested resource.' },
    { code: 500, name: 'Internal Server Error', category: '5xx', description: 'The server encountered an unexpected condition that prevented it from fulfilling the request.' },
    { code: 502, name: 'Bad Gateway', category: '5xx', description: 'The server received an invalid response from an upstream server.' },
    { code: 503, name: 'Service Unavailable', category: '5xx', description: 'The server is temporarily unable to handle the request.' },
    { code: 504, name: 'Gateway Timeout', category: '5xx', description: 'The server did not receive a timely response from an upstream server.' },
  ];

  const categories = ['all', '1xx', '2xx', '3xx', '4xx', '5xx'];

  const filteredCodes = statusCodes.filter(code => {
    if (selectedCategory === 'all') return true;
    return code.category === selectedCategory;
  }).filter(code => {
    if (!searchQuery) return true;
    return code.code.toString().includes(searchQuery) ||
           code.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           code.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">Search & Filter</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search status codes..."
                className="w-full pl-10 pr-4 py-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-elevated rounded-lg border border-border p-4">
        <h3 className="font-medium text-primary mb-3">HTTP Status Codes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCodes.map(code => (
            <div key={code.code} className="bg-surface rounded-lg p-3 border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  code.category === '1xx' ? 'bg-blue-500/10 text-blue-400' :
                  code.category === '2xx' ? 'bg-green-500/10 text-green-400' :
                  code.category === '3xx' ? 'bg-yellow-500/10 text-yellow-400' :
                  code.category === '4xx' ? 'bg-orange-500/10 text-orange-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {code.code}
                </span>
                <CopyButton textToCopy={code.code.toString()} size="sm" />
              </div>
              <div className="font-medium text-primary">{code.name}</div>
              <div className="text-sm text-muted mt-1">{code.description}</div>
            </div>
          ))}
        </div>
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-8 text-muted">
          No status codes found matching your search.
        </div>
      )}

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> HTTP status codes indicate the result of a HTTP request. 1xx: Informational, 2xx: Success, 3xx: Redirection, 4xx: Client Error, 5xx: Server Error.</p>
      </div>
    </div>
  );
}
