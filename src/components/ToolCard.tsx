import { Link } from 'react-router-dom';
import type { Tool } from '../types';
import { FavoriteButton } from './FavoriteButton';
import { Card } from './Card';
import * as LucideIcons from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  showCategory?: boolean;
  showDescription?: boolean;
  className?: string;
}

export const ToolCard = ({ tool, showCategory = true, showDescription = true, className = '' }: ToolCardProps) => {
  const Icon = (LucideIcons as any)[tool.icon] || LucideIcons.Code;

  return (
    <Card className={`p-4 group ${className}`} hoverable>
      <Link to={tool.route} className="block">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-elevated rounded-lg flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-primary group-hover:text-accent transition-colors truncate">{tool.name}</h3>
              {showDescription && (
                <p className="text-sm text-muted mt-1 line-clamp-2">{tool.shortDescription}</p>
              )}
            </div>
          </div>
          <FavoriteButton toolId={tool.id} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {showCategory && (
          <div className="flex items-center gap-2">
            <span className="text-xs bg-border/20 text-muted px-2 py-1 rounded-full">
              {tool.category}
            </span>
          </div>
        )}
      </Link>
    </Card>
  );
};
