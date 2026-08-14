// Markdown Previewer Tool
import { useState } from 'react';
import { CopyButton } from '../../components';
import { Button } from '../../components';

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(`# Heading 1

## Heading 2

This is a **bold** text and this is *italic* text.

- List item 1
- List item 2
- List item 3


> This is a blockquote




Code block:
\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

[Link](https://example.com)`);

  const handleClear = () => {
    setMarkdown('');
  };

  // Simple markdown rendering
  const renderMarkdown = (md: string): string => {
    return md
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/!\\[(.*?)\\]\\((.*?)\\)/g, '<img src="$2" alt="$1" />')
      .replace(/\\[(.*?)\\]\\((.*?)\\)/g, '<a href="$2">$1</a>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^```(\w*)\n([\s\S]*?)```$/gm, '<pre><code class="language-$1">$2</code></pre>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Markdown Editor</h3>
            <Button onClick={handleClear} variant="ghost" size="sm">
              Clear
            </Button>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter Markdown..."
            className="w-full h-64 p-3 bg-surface text-primary placeholder:text-muted rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-sm"
          />
        </div>

        {/* Preview */}
        <div className="bg-elevated rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-primary">Preview</h3>
            <CopyButton textToCopy={markdown} size="sm" />
          </div>
          <div className="h-64 overflow-auto bg-surface rounded-md p-3">
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
            />
          </div>
        </div>
      </div>

      <div className="p-3 bg-border/10 rounded-lg text-sm text-muted">
        <p><strong>Tip:</strong> Write Markdown in the editor and see the rendered output in real-time.</p>
      </div>
    </div>
  );
}
