import { Link } from 'react-router-dom';
import type { ToolCategory } from '../types';
import { Card } from './Card';
import * as LucideIcons from 'lucide-react';

interface CategoryCardProps {
  category: ToolCategory;
  toolCount: number;
  className?: string;
}

export const CategoryCard = ({ category, toolCount, className = '' }: CategoryCardProps) => {
  const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Folder;

  return (
    <Card className={`p-6 ${className}`} hoverable>
      <Link to={`/category/${category.slug}`} className="block">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-elevated rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-primary">{category.name}</h3>
            <p className="text-sm text-muted mt-1">{category.description}</p>
            <div className="mt-2 text-xs text-muted">
              {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};
