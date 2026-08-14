import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Home, Search } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-primary mb-2">Tool not found</h2>
          <p className="text-secondary">
            Looks like this tool doesn't exist or the URL is incorrect.
          </p>
        </div>

        <div className="space-y-4">
          <Button as={Link} to="/" variant="primary" size="lg" className="w-full">
            <Home className="w-5 h-5 mr-2" />
            Back Home
          </Button>

          <Button as={Link} to="/" variant="secondary" size="lg" className="w-full">
            <Search className="w-5 h-5 mr-2" />
            Browse Tools
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted">
            Try searching for a tool using the search bar or browse our categories.
          </p>
        </div>
      </div>
    </div>
  );
};
