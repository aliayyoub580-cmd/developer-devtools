import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { Button } from './Button';

interface FavoriteButtonProps {
  toolId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const FavoriteButton = ({ toolId, className = '', size = 'sm', showLabel = false }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const isFav = isFavorite(toolId);

  return (
    <Button
      onClick={() => toggleFavorite(toolId)}
      variant="ghost"
      size={size}
      className={`p-2 ${className}`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`w-4 h-4 transition-colors ${isFav ? 'fill-current text-error' : 'text-secondary'}`}
        fill={isFav ? 'currentColor' : 'none'}
      />
      {showLabel && (
        <span className={isFav ? 'text-error' : 'text-secondary'}>
          {isFav ? 'Favorited' : 'Favorite'}
        </span>
      )}
    </Button>
  );
};
