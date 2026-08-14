import { Link } from 'react-router-dom';
import { Info, Shield, Zap, Globe, Heart, Code } from 'lucide-react';
import { Button } from '../components/Button';

export const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Info className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">About DevTools</h1>
        <p className="text-lg text-secondary">
          A comprehensive collection of developer tools built for speed, privacy, and ease of use.
        </p>
      </div>

      {/* What is DevTools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4">What is DevTools?</h2>
        <div className="bg-surface border border-border rounded-lg p-6">
          <p className="text-secondary mb-4">
            DevTools is a web-based platform that provides developers with a comprehensive suite of tools for everyday tasks.
            From formatting and validating JSON to generating UUIDs, compressing images, and testing regular expressions,
            DevTools has everything you need in one convenient location.
          </p>
          <p className="text-secondary">
            Our mission is to make developers' lives easier by providing fast, reliable, and privacy-friendly tools that work
            directly in your browser without the need for installation or signup.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">Core Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'Blazing Fast',
              description: 'All tools are optimized for speed and run directly in your browser.'
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: 'Privacy-First',
              description: 'Your data stays in your browser. We never send inputs to external servers.'
            },
            {
              icon: <Globe className="w-6 h-6" />,
              title: 'Works Everywhere',
              description: 'Access DevTools from any device with a modern browser.'
            },
            {
              icon: <Code className="w-6 h-6" />,
              title: 'No Installation',
              description: 'No need to install anything. All tools work directly in your browser.'
            },
            {
              icon: <Heart className="w-6 h-6" />,
              title: 'Free Forever',
              description: 'All tools are completely free to use with no hidden costs.'
            },
            {
              icon: <Code className="w-6 h-6" />,
              title: 'Developer-Focused',
              description: 'Built by developers, for developers with modern tooling in mind.'
            },
          ].map((feature, index) => (
            <div key={index} className="bg-surface border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-elevated rounded-lg flex items-center justify-center mb-4">
                <span className="text-accent">{feature.icon}</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tool Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">Tool Categories</h2>
        <div className="bg-surface border border-border rounded-lg p-6">
          <p className="text-secondary mb-4">
            DevTools offers a wide range of tools organized into categories:
          </p>
          <ul className="text-secondary space-y-2">
            <li><strong>JSON & Data:</strong> Format, validate, and convert JSON, CSV, and YAML data.</li>
            <li><strong>Text:</strong> Case conversion, word counting, text comparison, and more.</li>
            <li><strong>Security:</strong> JWT decoding, hashing, Base64 encoding/decoding, and token generation.</li>
            <li><strong>Generators:</strong> UUID, password, QR code, Lorem Ipsum, and other data generators.</li>
            <li><strong>Colors:</strong> Color picking, conversion, contrast checking, and gradient generation.</li>
            <li><strong>Images:</strong> Compression, resizing, format conversion, and Base64 encoding.</li>
            <li><strong>Web Development:</strong> HTML, CSS, and JavaScript formatting and minification.</li>
            <li><strong>SQL:</strong> SQL formatting, validation, and conversion.</li>
            <li><strong>API & HTTP:</strong> HTTP status codes, API testing, cURL generation, and header parsing.</li>
            <li><strong>Time:</strong> Timestamp conversion, date calculations, and timezone conversion.</li>
          </ul>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">Privacy & Security</h2>
        <div className="bg-surface border border-border rounded-lg p-6">
          <p className="text-secondary mb-4">
            Your privacy is our top priority. Here's what you need to know:
          </p>
          <ul className="text-secondary space-y-3">
            <li>
              <strong>Browser-First Processing:</strong> Most tools process data entirely in your browser. Your inputs never leave your device.
            </li>
            <li>
              <strong>No Tracking:</strong> We don't track what tools you use or what data you input.
            </li>
            <li>
              <strong>No Accounts Required:</strong> All tools work without any signup or authentication.
            </li>
            <li>
              <strong>Local Storage Only:</strong> Favorites and recent tools are stored only in your browser's local storage.
            </li>
            <li>
              <strong>Secure Connections:</strong> All communication is over HTTPS for maximum security.
            </li>
          </ul>
          <p className="text-secondary mt-4">
            For tools that require external APIs (like image compression), we clearly indicate when data needs to be sent to external services.
          </p>
        </div>
      </section>

      {/* Technology */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">Built With</h2>
        <div className="bg-surface border border-border rounded-lg p-6">
          <p className="text-secondary mb-4">
            DevTools is built using modern web technologies:
          </p>
          <div className="flex flex-wrap gap-3">
            {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Lucide React'].map(tech => (
              <span key={tech} className="px-3 py-1 bg-elevated text-secondary text-sm rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Ready to Get Started?</h2>
        <p className="text-secondary mb-6">
          Explore our collection of tools and start using them right away.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button as={Link} to="/" variant="primary" size="lg">
            Browse All Tools
          </Button>
          <Button as={Link} to="/category/json-data" variant="secondary" size="lg">
            Try JSON Tools
          </Button>
        </div>
      </section>
    </div>
  );
};
