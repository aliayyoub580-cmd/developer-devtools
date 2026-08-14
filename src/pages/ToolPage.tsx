import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Tool } from '../types';
import { getCategoryById, getRelatedTools } from '../data/toolRegistry';
import { useRecentTools } from '../contexts/RecentToolsContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { Button } from '../components/Button';
import { FavoriteButton } from '../components/FavoriteButton';
import { ToolCard } from '../components/ToolCard';
import { ArrowLeft, Share2, Code, BookOpen, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ToolPageProps {
  tool: Tool;
}

export const ToolPage = ({ tool }: ToolPageProps) => {
  const location = useLocation();
  const { addRecentTool } = useRecentTools();
  const { isFavorite } = useFavorites();

  const [activeTab, setActiveTab] = useState<'tool' | 'how-to' | 'examples' | 'faq'>('tool');

  const category = getCategoryById(tool.category);
  const relatedTools = getRelatedTools(tool.id);
  const Icon = (LucideIcons as any)[tool.icon] || Code;

  // Track tool usage
  useEffect(() => {
    addRecentTool(tool.id);
  }, [tool.id, addRecentTool]);

  // Scroll to section if specified in location state
  useEffect(() => {
    if (location.state?.scrollToSection) {
      const section = document.getElementById(location.state.scrollToSection);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  const shareTool = async () => {
    try {
      await navigator.share({
        title: tool.name,
        text: tool.description,
        url: window.location.href,
      });
    } catch {
      // Fallback for browsers that don't support Web Share API
      prompt('Copy this URL to share:', window.location.href);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link to="/" className="text-secondary hover:text-primary">
              Home
            </Link>
          </li>
          <li className="text-muted">/</li>
          <li>
            <Link to={`/category/${category?.slug || tool.category}`} className="text-secondary hover:text-primary">
              {category?.name || tool.category}
            </Link>
          </li>
          <li className="text-muted">/</li>
          <li className="text-primary font-medium">{tool.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Link to={`/category/${category?.slug || tool.category}`} className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back to {category?.name || tool.category}
        </Link>

        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-elevated rounded-xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">{tool.name}</h1>
                <p className="text-secondary mt-1">{tool.description}</p>
              </div>
            </div>

            {/* Tool actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <FavoriteButton toolId={tool.id} showLabel={isFavorite(tool.id)} />
              <Button onClick={shareTool} variant="ghost" size="sm" icon={<Share2 className="w-4 h-4" />}>
                Share
              </Button>
              <span className="text-sm text-muted">
                {tool.keywords.slice(0, 3).join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-8">
        <nav className="flex gap-8" aria-label="Tabs">
          {[
            { id: 'tool', label: 'Tool', icon: Code },
            { id: 'how-to', label: 'How to Use', icon: HelpCircle },
            { id: 'examples', label: 'Examples', icon: BookOpen },
            { id: 'faq', label: 'FAQ', icon: HelpCircle },
          ].map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-accent text-accent font-medium'
                    : 'border-transparent text-secondary hover:text-primary'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mb-12">
        {activeTab === 'tool' && (
          <div className="bg-surface border border-border rounded-lg p-6">
            {/* Tool interface will be rendered by the tool component */}
            <tool.component />
          </div>
        )}

        {activeTab === 'how-to' && (
          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">What is {tool.name}?</h3>
              <p className="text-secondary">
                {tool.description}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">How to use this tool</h3>
              <div className="space-y-4 text-secondary">
                <p>
                  This tool allows you to {tool.shortDescription.toLowerCase()}.
                  Simply input your data in the provided editor and use the available actions to process it.
                </p>
                <p>
                  Most tools support the following actions:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Copy the result to clipboard</li>
                  <li>Download the result as a file</li>
                  <li>Clear the input and start over</li>
                  <li>Use keyboard shortcuts for faster workflow</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Example Usage</h3>
              <p className="text-secondary mb-4">
                Here are some examples of how to use {tool.name}:
              </p>
              <div className="space-y-4">
                <div className="bg-elevated rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-primary">Example 1</span>
                  </div>
                  <p className="text-secondary text-sm">
                    Input: Sample data for {tool.name}
                  </p>
                  <p className="text-secondary text-sm mt-2">
                    Output: Processed result from {tool.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-primary mb-2">Is my data safe?</h4>
                  <p className="text-secondary text-sm">
                    Yes! This tool processes data entirely in your browser. Your inputs never leave your device unless explicitly stated otherwise.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">Can I use this tool offline?</h4>
                  <p className="text-secondary text-sm">
                    Most tools work offline once the page is loaded. Some features may require an internet connection.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">How do I save my work?</h4>
                  <p className="text-secondary text-sm">
                    Use the download button to save your results, or copy the output to your clipboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {relatedTools.map(relatedTool => (
              <ToolCard key={relatedTool.id} tool={relatedTool} showCategory={false} />
            ))}
          </div>
        </section>
      )}

      {/* Privacy Notice */}
      <div className="bg-surface/50 border border-border/50 rounded-lg p-4 text-center text-sm text-muted">
        <p>
          <strong>Privacy Notice:</strong> This tool processes data in your browser. Your inputs are not sent to any external servers.
        </p>
      </div>
    </div>
  );
};
