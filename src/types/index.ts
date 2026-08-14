// Tool category types
export type ToolCategory = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color?: string;
};

// Individual tool type
export type Tool = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  icon: string;
  keywords: string[];
  route: string;
  featured: boolean;
  relatedTools: string[];
  component: React.ComponentType;
  seo?: {
    title: string;
    description: string;
  };
};

// Tool registry type
export type ToolRegistry = Record<string, Tool>;

// Theme type
export type Theme = 'dark' | 'light' | 'system';

// Toast type
export type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
};

// Favorite tools type
export type Favorites = {
  tools: string[];
  updatedAt: number;
};

// Recently used tools type
export type RecentTools = {
  tools: string[];
  updatedAt: number;
};

// Search result type
export type SearchResult = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  route: string;
  score: number;
};

// Editor props
export type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  lineNumbers?: boolean;
};

// Tool output props
export type ToolOutputProps = {
  value: string;
  onCopy: () => void;
  onDownload?: () => void;
  onClear?: () => void;
  label?: string;
  className?: string;
  downloadName?: string;
};

// Button props
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  as?: any;
  to?: string;
};

// Card props
export type CardProps = {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
};

// Toast context type
export type ToastContextType = {
  addToast: (message: string, type?: Toast['type'], duration?: number) => void;
  removeToast: (id: string) => void;
};

// Theme context type
export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

// Favorites context type
export type FavoritesContextType = {
  favorites: string[];
  addFavorite: (toolId: string) => void;
  removeFavorite: (toolId: string) => void;
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
};

// Recent tools context type
export type RecentToolsContextType = {
  recentTools: string[];
  addRecentTool: (toolId: string) => void;
  clearRecentTools: () => void;
};

// Command palette context type
export type CommandPaletteContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

// Tool page props
export type ToolPageProps = {
  tool: Tool;
};

// SEO props
export type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: any;
};

// Breadcrumb item
export type BreadcrumbItem = {
  name: string;
  path: string;
};

// HTTP status code type
export type HTTPStatusCode = {
  code: number;
  name: string;
  description: string;
  category: string;
  categoryName: string;
};

// Color types
export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv';

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type HSL = {
  h: number;
  s: number;
  l: number;
};

export type HSV = {
  h: number;
  s: number;
  v: number;
};

export type Color = {
  hex: string;
  rgb: RGB;
  hsl: HSL;
  hsv: HSV;
};

// Image processing types
export type ImageFormat = 'jpeg' | 'png' | 'webp' | 'gif' | 'svg';

export type ImageCompressionOptions = {
  quality: number;
  format: ImageFormat;
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
};

// UUID version type
export type UUIDVersion = 1 | 4;

// Password generation options
export type PasswordOptions = {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
};

// JWT decoded type
export type DecodedJWT = {
  header: Record<string, any>;
  payload: Record<string, any>;
  signature: string;
  valid: boolean;
};

// Regex test result
export type RegexTestResult = {
  matches: string[];
  matchCount: number;
  capturedGroups: string[][];
  matchPositions: { start: number; end: number }[];
};

// Diff result type
export type DiffResult = {
  oldText: string;
  newText: string;
  diffs: { type: 'insert' | 'delete' | 'equal'; text: string }[];
};

// Markdown preview props
export type MarkdownPreviewProps = {
  markdown: string;
  className?: string;
};

// SQL formatter options
export type SQLFormatterOptions = {
  indent: number;
  uppercase: boolean;
  linesBetweenQueries: number;
};

// Cron expression type
export type CronExpression = {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
  expression: string;
  description: string;
};

// Git command type
export type GitCommand = {
  name: string;
  command: string;
  description: string;
  example: string;
  category: string;
};

// Contrast ratio result
export type ContrastRatioResult = {
  ratio: number;
  foreground: string;
  background: string;
  aaNormal: boolean;
  aaaNormal: boolean;
  aaLarge: boolean;
  aaaLarge: boolean;
};

// Gradient type
export type Gradient = {
  type: 'linear' | 'radial';
  colors: string[];
  angle: number;
  css: string;
};

// File type for uploads
export type UploadedFile = {
  file: File;
  url: string;
  preview: string;
};

// Tool action types
export type ToolAction = {
  label: string;
  action: () => void;
  icon: React.ReactNode;
  shortcut?: string;
  variant?: ButtonProps['variant'];
};
