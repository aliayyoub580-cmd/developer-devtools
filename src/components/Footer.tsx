import { Link } from 'react-router-dom';
import { Heart, Code, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="DevTools Logo" className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm" />
              <span className="text-xl sm:text-2xl font-bold text-primary tracking-tight">DevTools</span>
            </div>
            <p className="text-sm text-secondary">
              Powerful developer tools. Fast, private, and free.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-secondary hover:text-primary transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link to="/category/json-data" className="text-secondary hover:text-primary transition-colors">
                  JSON & Data
                </Link>
              </li>
              <li>
                <Link to="/category/text" className="text-secondary hover:text-primary transition-colors">
                  Text
                </Link>
              </li>
              <li>
                <Link to="/category/security" className="text-secondary hover:text-primary transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/category/generators" className="text-secondary hover:text-primary transition-colors">
                  Generators
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/colors" className="text-secondary hover:text-primary transition-colors">
                  Colors
                </Link>
              </li>
              <li>
                <Link to="/category/images" className="text-secondary hover:text-primary transition-colors">
                  Images
                </Link>
              </li>
              <li>
                <Link to="/category/web" className="text-secondary hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/category/sql" className="text-secondary hover:text-primary transition-colors">
                  SQL
                </Link>
              </li>
              <li>
                <Link to="/category/api" className="text-secondary hover:text-primary transition-colors">
                  API & HTTP
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-secondary hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/about#privacy" className="text-secondary hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-primary transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors flex items-center gap-1"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} DevTools. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            Built with <Heart className="w-4 h-4 inline-block text-error" /> and <Code className="w-4 h-4 inline-block" />
          </p>
        </div>
      </div>
    </footer>
  );
};
