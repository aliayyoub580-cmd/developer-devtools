import { Link } from 'react-router-dom';
import type { ToolCategory } from '../types';
import { getToolsByCategory } from '../data/toolRegistry';
import { ToolCard } from '../components/ToolCard';
import { Button } from '../components/Button';
import { ArrowLeft, Grid3X3 } from 'lucide-react';

interface CategoryPageProps {
  category: ToolCategory;
}

export const CategoryPage = ({ category }: CategoryPageProps) => {
  const tools = getToolsByCategory(category.id);

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
          <li className="text-primary font-medium">{category.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back to all tools
        </Link>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-elevated rounded-xl flex items-center justify-center">
            <Grid3X3 className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">{category.name}</h1>
            <p className="text-secondary mt-1">{category.description}</p>
            <div className="mt-2 text-sm text-muted">
              {tools.length} tools available
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} showCategory={false} />
        ))}
      </div>

      {/* Empty state */}
      {tools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No tools found in this category.</p>
          <Button onClick={() => window.history.back()} variant="ghost" className="mt-4">
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
};
