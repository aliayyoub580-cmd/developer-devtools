import type { Tool, ToolCategory, SearchResult } from '../types';

// Import all tool components (will be created)
// JSON Tools
import JSONFormatter from '../tools/json/JSONFormatter';
import JSONValidator from '../tools/json/JSONValidator';
import JSONMinifier from '../tools/json/JSONMinifier';
import JSONToTypeScript from '../tools/json/JSONToTypeScript';
import JSONToCSV from '../tools/json/JSONToCSV';
import JSONToYAML from '../tools/json/JSONToYAML';
import CSVToJSON from '../tools/json/CSVToJSON';
import YAMLToJSON from '../tools/json/YAMLToJSON';

// Text Tools
import CaseConverter from '../tools/text/CaseConverter';
import WordCounter from '../tools/text/WordCounter';
import CharacterCounter from '../tools/text/CharacterCounter';
import TextDiff from '../tools/text/TextDiff';
import MarkdownPreviewer from '../tools/text/MarkdownPreviewer';
import RemoveDuplicateLines from '../tools/text/RemoveDuplicateLines';
import SortLines from '../tools/text/SortLines';
import TextCleaner from '../tools/text/TextCleaner';

// Security Tools
import JWTDecoder from '../tools/security/JWTDecoder';
import HashGenerator from '../tools/security/HashGenerator';
import Base64Encoder from '../tools/security/Base64Encoder';
import Base64Decoder from '../tools/security/Base64Decoder';
import RandomTokenGenerator from '../tools/security/RandomTokenGenerator';

// Generator Tools
import UUIDGenerator from '../tools/generators/UUIDGenerator';
import PasswordGenerator from '../tools/generators/PasswordGenerator';
import QRCodeGenerator from '../tools/generators/QRCodeGenerator';
import LoremIpsumGenerator from '../tools/generators/LoremIpsumGenerator';
import FaviconGenerator from '../tools/generators/FaviconGenerator';
import ColorPaletteGenerator from '../tools/generators/ColorPaletteGenerator';
import FakeDataGenerator from '../tools/generators/FakeDataGenerator';

// Color Tools
import ColorPicker from '../tools/colors/ColorPicker';
import HEXToRGB from '../tools/colors/HEXToRGB';
import RGBToHEX from '../tools/colors/RGBToHEX';
import HEXToHSL from '../tools/colors/HEXToHSL';
import HSLToHEX from '../tools/colors/HSLToHEX';
import ColorContrastChecker from '../tools/colors/ColorContrastChecker';
import GradientGenerator from '../tools/colors/GradientGenerator';

// Image Tools
import ImageCompressor from '../tools/images/ImageCompressor';
import ImageResizer from '../tools/images/ImageResizer';
import ImageConverter from '../tools/images/ImageConverter';
import ImageToWebP from '../tools/images/ImageToWebP';
import ImageToJPG from '../tools/images/ImageToJPG';
import ImageToPNG from '../tools/images/ImageToPNG';
import Base64ImageConverter from '../tools/images/Base64ImageConverter';
import SVGOptimizer from '../tools/images/SVGOptimizer';

// Web Development Tools
import HTMLFormatter from '../tools/web/HTMLFormatter';
import CSSFormatter from '../tools/web/CSSFormatter';
import JavaScriptFormatter from '../tools/web/JavaScriptFormatter';
import HTMLMinifier from '../tools/web/HTMLMinifier';
import CSSMinifier from '../tools/web/CSSMinifier';
import JavaScriptMinifier from '../tools/web/JavaScriptMinifier';
import URLEncoder from '../tools/web/URLEncoder';
import URLDecoder from '../tools/web/URLDecoder';
import HTMLEntityEncoder from '../tools/web/HTMLEntityEncoder';
import HTMLEntityDecoder from '../tools/web/HTMLEntityDecoder';

// SQL Tools
import SQLFormatter from '../tools/sql/SQLFormatter';
import SQLMinifier from '../tools/sql/SQLMinifier';
import SQLValidator from '../tools/sql/SQLValidator';
import SQLToJSON from '../tools/sql/SQLToJSON';

// API Tools
import HTTPStatusCodes from '../tools/api/HTTPStatusCodes';
import RESTAPITester from '../tools/api/RESTAPITester';
import CURLGenerator from '../tools/api/CURLGenerator';
import HTTPHeaderParser from '../tools/api/HTTPHeaderParser';
import UserAgentParser from '../tools/api/UserAgentParser';

// Time Tools
import UnixTimestampConverter from '../tools/time/UnixTimestampConverter';
import TimestampGenerator from '../tools/time/TimestampGenerator';
import DateDifferenceCalculator from '../tools/time/DateDifferenceCalculator';
import TimezoneConverter from '../tools/time/TimezoneConverter';

// Developer Utilities
import RegexTester from '../tools/text/RegexTester';
import CronExpressionGenerator from '../tools/generators/CronExpressionGenerator';
import GitCommandGenerator from '../tools/generators/GitCommandGenerator';
import DiffChecker from '../tools/text/DiffChecker';
import MIMETypeLookup from '../tools/api/MIMETypeLookup';
import FileSizeConverter from '../tools/api/FileSizeConverter';

// Tool Registry
export const toolRegistry: Record<string, Tool> = {
  // JSON & Data Tools
  'json-formatter': {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, beautify, and validate JSON data with syntax highlighting and error detection.',
    shortDescription: 'Beautify and format JSON',
    category: 'json-data',
    icon: 'Braces',
    keywords: ['json', 'format', 'beautify', 'validate', 'minify', 'pretty', 'parse'],
    route: '/tools/json-formatter',
    featured: true,
    relatedTools: ['json-validator', 'json-minifier', 'json-to-typescript', 'json-to-csv', 'json-to-yaml'],
    component: JSONFormatter,
    seo: {
      title: 'JSON Formatter & Beautifier Online — Free Developer Tool',
      description: 'Format, beautify, validate, and minify JSON directly in your browser. Fast, free, and privacy-friendly.',
    },
  },

  'json-validator': {
    id: 'json-validator',
    name: 'JSON Validator',
    slug: 'json-validator',
    description: 'Validate JSON data and check for syntax errors with detailed error messages.',
    shortDescription: 'Validate JSON syntax',
    category: 'json-data',
    icon: 'CheckCircle',
    keywords: ['json', 'validate', 'check', 'syntax', 'error', 'verify'],
    route: '/tools/json-validator',
    featured: true,
    relatedTools: ['json-formatter', 'json-minifier', 'json-to-typescript'],
    component: JSONValidator,
    seo: {
      title: 'JSON Validator Online — Check JSON Syntax',
      description: 'Validate your JSON data and find syntax errors with line and column numbers.',
    },
  },

  'json-minifier': {
    id: 'json-minifier',
    name: 'JSON Minifier',
    slug: 'json-minifier',
    description: 'Minify JSON data by removing all whitespace and unnecessary characters.',
    shortDescription: 'Minify JSON data',
    category: 'json-data',
    icon: 'Minimize',
    keywords: ['json', 'minify', 'compress', 'reduce', 'size', 'optimize'],
    route: '/tools/json-minifier',
    featured: false,
    relatedTools: ['json-formatter', 'json-validator', 'json-to-typescript'],
    component: JSONMinifier,
    seo: {
      title: 'JSON Minifier Online — Compress JSON Data',
      description: 'Minify your JSON data to reduce file size and improve performance.',
    },
  },

  'json-to-typescript': {
    id: 'json-to-typescript',
    name: 'JSON to TypeScript',
    slug: 'json-to-typescript',
    description: 'Convert JSON data to TypeScript interfaces and types automatically.',
    shortDescription: 'Convert JSON to TypeScript',
    category: 'json-data',
    icon: 'Type',
    keywords: ['json', 'typescript', 'interface', 'type', 'convert', 'generate'],
    route: '/tools/json-to-typescript',
    featured: true,
    relatedTools: ['json-formatter', 'json-validator', 'json-to-csv', 'json-to-yaml'],
    component: JSONToTypeScript,
    seo: {
      title: 'JSON to TypeScript Converter — Generate Types Automatically',
      description: 'Convert JSON data to TypeScript interfaces and types with support for nested objects and arrays.',
    },
  },

  'json-to-csv': {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    slug: 'json-to-csv',
    description: 'Convert JSON arrays to CSV format with customizable headers and delimiters.',
    shortDescription: 'Convert JSON to CSV',
    category: 'json-data',
    icon: 'FileSpreadsheet',
    keywords: ['json', 'csv', 'convert', 'export', 'spreadsheet', 'table'],
    route: '/tools/json-to-csv',
    featured: false,
    relatedTools: ['json-formatter', 'json-to-typescript', 'csv-to-json'],
    component: JSONToCSV,
    seo: {
      title: 'JSON to CSV Converter — Export JSON as CSV',
      description: 'Convert JSON arrays to CSV format for use in spreadsheets and databases.',
    },
  },

  'json-to-yaml': {
    id: 'json-to-yaml',
    name: 'JSON to YAML',
    slug: 'json-to-yaml',
    description: 'Convert JSON data to YAML format for better readability and configuration files.',
    shortDescription: 'Convert JSON to YAML',
    category: 'json-data',
    icon: 'FileCode',
    keywords: ['json', 'yaml', 'convert', 'config', 'configuration'],
    route: '/tools/json-to-yaml',
    featured: false,
    relatedTools: ['json-formatter', 'yaml-to-json'],
    component: JSONToYAML,
    seo: {
      title: 'JSON to YAML Converter — Convert JSON to YAML Format',
      description: 'Convert JSON data to YAML format for configuration files and better readability.',
    },
  },

  'csv-to-json': {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    slug: 'csv-to-json',
    description: 'Convert CSV data to JSON format with support for headers and custom delimiters.',
    shortDescription: 'Convert CSV to JSON',
    category: 'json-data',
    icon: 'FileSpreadsheet',
    keywords: ['csv', 'json', 'convert', 'import', 'data', 'table'],
    route: '/tools/csv-to-json',
    featured: false,
    relatedTools: ['json-to-csv', 'json-formatter'],
    component: CSVToJSON,
    seo: {
      title: 'CSV to JSON Converter — Import CSV as JSON',
      description: 'Convert CSV data to JSON format for use in applications and APIs.',
    },
  },

  'yaml-to-json': {
    id: 'yaml-to-json',
    name: 'YAML to JSON',
    slug: 'yaml-to-json',
    description: 'Convert YAML configuration files to JSON format.',
    shortDescription: 'Convert YAML to JSON',
    category: 'json-data',
    icon: 'FileCode',
    keywords: ['yaml', 'json', 'convert', 'config', 'configuration'],
    route: '/tools/yaml-to-json',
    featured: false,
    relatedTools: ['json-to-yaml', 'json-formatter'],
    component: YAMLToJSON,
    seo: {
      title: 'YAML to JSON Converter — Convert YAML to JSON Format',
      description: 'Convert YAML configuration files to JSON format for use in applications.',
    },
  },

  // Text Tools
  'case-converter': {
    id: 'case-converter',
    name: 'Case Converter',
    slug: 'case-converter',
    description: 'Convert text between different cases: camelCase, PascalCase, snake_case, kebab-case, and more.',
    shortDescription: 'Convert text case',
    category: 'text',
    icon: 'CaseSensitive',
    keywords: ['case', 'convert', 'camel', 'pascal', 'snake', 'kebab', 'uppercase', 'lowercase'],
    route: '/tools/case-converter',
    featured: false,
    relatedTools: ['text-cleaner', 'sort-lines', 'remove-duplicate-lines'],
    component: CaseConverter,
    seo: {
      title: 'Case Converter — Convert Text Between Different Cases',
      description: 'Convert text between camelCase, PascalCase, snake_case, kebab-case, UPPERCASE, and more.',
    },
  },

  'word-counter': {
    id: 'word-counter',
    name: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words, characters, sentences, paragraphs, and more in your text.',
    shortDescription: 'Count words and characters',
    category: 'text',
    icon: 'Type',
    keywords: ['word', 'count', 'character', 'text', 'statistics', 'analyze'],
    route: '/tools/word-counter',
    featured: false,
    relatedTools: ['character-counter', 'text-cleaner'],
    component: WordCounter,
    seo: {
      title: 'Word Counter — Count Words, Characters, and More',
      description: 'Count words, characters, sentences, paragraphs, and other text statistics.',
    },
  },

  'character-counter': {
    id: 'character-counter',
    name: 'Character Counter',
    slug: 'character-counter',
    description: 'Count characters in your text with and without spaces.',
    shortDescription: 'Count characters',
    category: 'text',
    icon: 'Hash',
    keywords: ['character', 'count', 'text', 'length', 'size'],
    route: '/tools/character-counter',
    featured: false,
    relatedTools: ['word-counter', 'text-cleaner'],
    component: CharacterCounter,
    seo: {
      title: 'Character Counter — Count Characters in Text',
      description: 'Count characters in your text with and without spaces for accurate length measurement.',
    },
  },

  'text-diff': {
    id: 'text-diff',
    name: 'Text Diff',
    slug: 'text-diff',
    description: 'Compare two pieces of text and see the differences side by side.',
    shortDescription: 'Compare text differences',
    category: 'text',
    icon: 'Diff',
    keywords: ['diff', 'compare', 'text', 'difference', 'change', 'side-by-side'],
    route: '/tools/text-diff',
    featured: true,
    relatedTools: ['diff-checker', 'text-cleaner'],
    component: TextDiff,
    seo: {
      title: 'Text Diff Tool — Compare Text Differences',
      description: 'Compare two pieces of text and see the differences highlighted side by side.',
    },
  },

  'markdown-previewer': {
    id: 'markdown-previewer',
    name: 'Markdown Previewer',
    slug: 'markdown-previewer',
    description: 'Write Markdown and see the rendered output in real-time with syntax highlighting.',
    shortDescription: 'Preview Markdown',
    category: 'text',
    icon: 'FileMarkdown',
    keywords: ['markdown', 'preview', 'render', 'editor', 'md'],
    route: '/tools/markdown-previewer',
    featured: false,
    relatedTools: ['text-cleaner', 'case-converter'],
    component: MarkdownPreviewer,
    seo: {
      title: 'Markdown Previewer — Live Markdown Editor and Preview',
      description: 'Write Markdown and see the rendered output in real-time with full Markdown support.',
    },
  },

  'remove-duplicate-lines': {
    id: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    slug: 'remove-duplicate-lines',
    description: 'Remove duplicate lines from text while preserving the original order.',
    shortDescription: 'Remove duplicate lines',
    category: 'text',
    icon: 'ListMinus',
    keywords: ['duplicate', 'remove', 'lines', 'text', 'clean', 'unique'],
    route: '/tools/remove-duplicate-lines',
    featured: false,
    relatedTools: ['sort-lines', 'text-cleaner'],
    component: RemoveDuplicateLines,
    seo: {
      title: 'Remove Duplicate Lines — Clean Up Text',
      description: 'Remove duplicate lines from text while preserving the original order.',
    },
  },

  'sort-lines': {
    id: 'sort-lines',
    name: 'Sort Lines',
    slug: 'sort-lines',
    description: 'Sort lines of text alphabetically, numerically, or by custom criteria.',
    shortDescription: 'Sort lines of text',
    category: 'text',
    icon: 'SortAsc',
    keywords: ['sort', 'lines', 'text', 'alphabetical', 'numerical', 'order'],
    route: '/tools/sort-lines',
    featured: false,
    relatedTools: ['remove-duplicate-lines', 'text-cleaner'],
    component: SortLines,
    seo: {
      title: 'Sort Lines — Sort Text Alphabetically or Numerically',
      description: 'Sort lines of text alphabetically, numerically, or by custom criteria.',
    },
  },

  'text-cleaner': {
    id: 'text-cleaner',
    name: 'Text Cleaner',
    slug: 'text-cleaner',
    description: 'Clean text by removing extra spaces, special characters, or formatting.',
    shortDescription: 'Clean and format text',
    category: 'text',
    icon: 'Eraser',
    keywords: ['clean', 'text', 'format', 'remove', 'spaces', 'characters'],
    route: '/tools/text-cleaner',
    featured: false,
    relatedTools: ['word-counter', 'character-counter'],
    component: TextCleaner,
    seo: {
      title: 'Text Cleaner — Remove Extra Spaces and Special Characters',
      description: 'Clean text by removing extra spaces, special characters, or unwanted formatting.',
    },
  },

  'regex-tester': {
    id: 'regex-tester',
    name: 'Regex Tester',
    slug: 'regex-tester',
    description: 'Test regular expressions with real-time matching and captured groups.',
    shortDescription: 'Test regular expressions',
    category: 'text',
    icon: 'Search',
    keywords: ['regex', 'regular', 'expression', 'test', 'match', 'pattern'],
    route: '/tools/regex-tester',
    featured: true,
    relatedTools: ['text-cleaner', 'text-diff'],
    component: RegexTester,
    seo: {
      title: 'Regex Tester — Test Regular Expressions Online',
      description: 'Test regular expressions with real-time matching, captured groups, and match positions.',
    },
  },

  // Security Tools
  'jwt-decoder': {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode JWT tokens to see their header, payload, and signature. Client-side decoding for privacy.',
    shortDescription: 'Decode JWT tokens',
    category: 'security',
    icon: 'Key',
    keywords: ['jwt', 'json', 'web', 'token', 'decode', 'header', 'payload'],
    route: '/tools/jwt-decoder',
    featured: true,
    relatedTools: ['base64-encoder', 'base64-decoder', 'hash-generator'],
    component: JWTDecoder,
    seo: {
      title: 'JWT Decoder — Decode JWT Tokens Online',
      description: 'Decode JWT tokens to see their header, payload, and signature. All decoding happens in your browser for privacy.',
    },
  },

  'hash-generator': {
    id: 'hash-generator',
    name: 'Hash Generator',
    slug: 'hash-generator',
    description: 'Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512, etc.) from text.',
    shortDescription: 'Generate cryptographic hashes',
    category: 'security',
    icon: 'Fingerprint',
    keywords: ['hash', 'md5', 'sha1', 'sha256', 'sha512', 'cryptographic', 'security'],
    route: '/tools/hash-generator',
    featured: false,
    relatedTools: ['jwt-decoder', 'base64-encoder', 'random-token-generator'],
    component: HashGenerator,
    seo: {
      title: 'Hash Generator — Generate MD5, SHA-1, SHA-256 Hashes',
      description: 'Generate cryptographic hashes from text using various algorithms like MD5, SHA-1, SHA-256, and SHA-512.',
    },
  },

  'base64-encoder': {
    id: 'base64-encoder',
    name: 'Base64 Encoder',
    slug: 'base64-encoder',
    description: 'Encode text or files to Base64 format.',
    shortDescription: 'Encode to Base64',
    category: 'security',
    icon: 'Lock',
    keywords: ['base64', 'encode', 'text', 'file', 'convert'],
    route: '/tools/base64-encoder',
    featured: false,
    relatedTools: ['base64-decoder', 'jwt-decoder', 'base64-image-converter'],
    component: Base64Encoder,
    seo: {
      title: 'Base64 Encoder — Encode Text to Base64',
      description: 'Encode text or files to Base64 format for data transfer and storage.',
    },
  },

  'base64-decoder': {
    id: 'base64-decoder',
    name: 'Base64 Decoder',
    slug: 'base64-decoder',
    description: 'Decode Base64 encoded text or files back to their original format.',
    shortDescription: 'Decode Base64',
    category: 'security',
    icon: 'Unlock',
    keywords: ['base64', 'decode', 'text', 'file', 'convert'],
    route: '/tools/base64-decoder',
    featured: false,
    relatedTools: ['base64-encoder', 'jwt-decoder'],
    component: Base64Decoder,
    seo: {
      title: 'Base64 Decoder — Decode Base64 Text',
      description: 'Decode Base64 encoded text or files back to their original format.',
    },
  },

  'random-token-generator': {
    id: 'random-token-generator',
    name: 'Random Token Generator',
    slug: 'random-token-generator',
    description: 'Generate random tokens and secrets for authentication and security purposes.',
    shortDescription: 'Generate random tokens',
    category: 'security',
    icon: 'Dice',
    keywords: ['token', 'random', 'secret', 'authentication', 'security', 'generate'],
    route: '/tools/random-token-generator',
    featured: false,
    relatedTools: ['password-generator', 'uuid-generator', 'hash-generator'],
    component: RandomTokenGenerator,
    seo: {
      title: 'Random Token Generator — Generate Secure Tokens',
      description: 'Generate random tokens and secrets for authentication and security purposes.',
    },
  },

  // Generator Tools
  'uuid-generator': {
    id: 'uuid-generator',
    name: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate UUID v4 (and other versions) unique identifiers.',
    shortDescription: 'Generate UUIDs',
    category: 'generators',
    icon: 'Hash',
    keywords: ['uuid', 'guid', 'unique', 'identifier', 'generate', 'v4'],
    route: '/tools/uuid-generator',
    featured: true,
    relatedTools: ['password-generator', 'qr-code-generator', 'random-token-generator'],
    component: UUIDGenerator,
    seo: {
      title: 'UUID Generator — Generate UUID v4 Identifiers',
      description: 'Generate UUID v4 unique identifiers for databases, APIs, and applications.',
    },
  },

  'password-generator': {
    id: 'password-generator',
    name: 'Password Generator',
    slug: 'password-generator',
    description: 'Generate secure, random passwords with customizable options for length and character types.',
    shortDescription: 'Generate secure passwords',
    category: 'generators',
    icon: 'Shield',
    keywords: ['password', 'generate', 'secure', 'random', 'strong'],
    route: '/tools/password-generator',
    featured: true,
    relatedTools: ['uuid-generator', 'random-token-generator'],
    component: PasswordGenerator,
    seo: {
      title: 'Password Generator — Generate Secure Random Passwords',
      description: 'Generate secure, random passwords with customizable options for length and character types.',
    },
  },

  'qr-code-generator': {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    description: 'Generate QR codes from text, URLs, emails, and Wi-Fi information. Download as PNG or SVG.',
    shortDescription: 'Generate QR codes',
    category: 'generators',
    icon: 'QrCode',
    keywords: ['qr', 'code', 'generate', 'url', 'text', 'png', 'svg'],
    route: '/tools/qr-code-generator',
    featured: true,
    relatedTools: ['uuid-generator', 'favicon-generator'],
    component: QRCodeGenerator,
    seo: {
      title: 'QR Code Generator — Create QR Codes Online',
      description: 'Generate QR codes from text, URLs, emails, and Wi-Fi information. Download as PNG or SVG.',
    },
  },

  'lorem-ipsum-generator': {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    slug: 'lorem-ipsum-generator',
    description: 'Generate placeholder text for design and development purposes.',
    shortDescription: 'Generate placeholder text',
    category: 'generators',
    icon: 'FileText',
    keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'generate', 'dummy'],
    route: '/tools/lorem-ipsum-generator',
    featured: false,
    relatedTools: ['fake-data-generator'],
    component: LoremIpsumGenerator,
    seo: {
      title: 'Lorem Ipsum Generator — Generate Placeholder Text',
      description: 'Generate placeholder text for design and development purposes with customizable length.',
    },
  },

  'favicon-generator': {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    slug: 'favicon-generator',
    description: 'Generate favicon files from images with multiple size options.',
    shortDescription: 'Generate favicons',
    category: 'generators',
    icon: 'Image',
    keywords: ['favicon', 'generate', 'icon', 'image', 'html'],
    route: '/tools/favicon-generator',
    featured: false,
    relatedTools: ['qr-code-generator', 'image-compressor'],
    component: FaviconGenerator,
    seo: {
      title: 'Favicon Generator — Create Favicon Files Online',
      description: 'Generate favicon files from images with multiple size options for web applications.',
    },
  },

  'color-palette-generator': {
    id: 'color-palette-generator',
    name: 'Color Palette Generator',
    slug: 'color-palette-generator',
    description: 'Generate beautiful color palettes for design and development projects.',
    shortDescription: 'Generate color palettes',
    category: 'generators',
    icon: 'Palette',
    keywords: ['color', 'palette', 'generate', 'design', 'scheme'],
    route: '/tools/color-palette-generator',
    featured: false,
    relatedTools: ['color-picker', 'gradient-generator'],
    component: ColorPaletteGenerator,
    seo: {
      title: 'Color Palette Generator — Create Beautiful Color Schemes',
      description: 'Generate beautiful color palettes for design and development projects.',
    },
  },

  'fake-data-generator': {
    id: 'fake-data-generator',
    name: 'Fake Data Generator',
    slug: 'fake-data-generator',
    description: 'Generate fake data for testing and development including names, emails, addresses, and more.',
    shortDescription: 'Generate fake data',
    category: 'generators',
    icon: 'Database',
    keywords: ['fake', 'data', 'generate', 'test', 'mock', 'dummy'],
    route: '/tools/fake-data-generator',
    featured: false,
    relatedTools: ['lorem-ipsum-generator', 'uuid-generator'],
    component: FakeDataGenerator,
    seo: {
      title: 'Fake Data Generator — Generate Test Data',
      description: 'Generate fake data for testing and development including names, emails, addresses, and more.',
    },
  },

  'cron-expression-generator': {
    id: 'cron-expression-generator',
    name: 'Cron Expression Generator',
    slug: 'cron-expression-generator',
    description: 'Generate cron expressions with a visual interface and get human-readable explanations.',
    shortDescription: 'Generate cron expressions',
    category: 'generators',
    icon: 'Clock',
    keywords: ['cron', 'expression', 'generate', 'schedule', 'time'],
    route: '/tools/cron-expression-generator',
    featured: false,
    relatedTools: ['timestamp-converter', 'timezone-converter'],
    component: CronExpressionGenerator,
    seo: {
      title: 'Cron Expression Generator — Create Cron Jobs',
      description: 'Generate cron expressions with a visual interface and get human-readable explanations.',
    },
  },

  'git-command-generator': {
    id: 'git-command-generator',
    name: 'Git Command Generator',
    slug: 'git-command-generator',
    description: 'Generate Git commands with explanations and examples for common operations.',
    shortDescription: 'Generate Git commands',
    category: 'generators',
    icon: 'GitBranch',
    keywords: ['git', 'command', 'generate', 'version', 'control'],
    route: '/tools/git-command-generator',
    featured: false,
    relatedTools: ['diff-checker', 'text-diff'],
    component: GitCommandGenerator,
    seo: {
      title: 'Git Command Generator — Generate Git Commands',
      description: 'Generate Git commands with explanations and examples for common version control operations.',
    },
  },

  // Color Tools
  'color-picker': {
    id: 'color-picker',
    name: 'Color Picker',
    slug: 'color-picker',
    description: 'Pick colors visually and get their values in multiple formats.',
    shortDescription: 'Pick colors visually',
    category: 'colors',
    icon: 'Pipette',
    keywords: ['color', 'picker', 'hex', 'rgb', 'hsl', 'select'],
    route: '/tools/color-picker',
    featured: false,
    relatedTools: ['hex-to-rgb', 'rgb-to-hex', 'color-contrast-checker'],
    component: ColorPicker,
    seo: {
      title: 'Color Picker — Select Colors and Get Their Values',
      description: 'Pick colors visually and get their values in HEX, RGB, HSL, and other formats.',
    },
  },

  'hex-to-rgb': {
    id: 'hex-to-rgb',
    name: 'HEX to RGB',
    slug: 'hex-to-rgb',
    description: 'Convert HEX color codes to RGB values.',
    shortDescription: 'Convert HEX to RGB',
    category: 'colors',
    icon: 'Hexagon',
    keywords: ['hex', 'rgb', 'convert', 'color'],
    route: '/tools/hex-to-rgb',
    featured: false,
    relatedTools: ['rgb-to-hex', 'hex-to-hsl', 'color-picker'],
    component: HEXToRGB,
    seo: {
      title: 'HEX to RGB Converter — Convert HEX Colors to RGB',
      description: 'Convert HEX color codes to RGB values for use in CSS and design.',
    },
  },

  'rgb-to-hex': {
    id: 'rgb-to-hex',
    name: 'RGB to HEX',
    slug: 'rgb-to-hex',
    description: 'Convert RGB color values to HEX color codes.',
    shortDescription: 'Convert RGB to HEX',
    category: 'colors',
    icon: 'SquareCode',
    keywords: ['rgb', 'hex', 'convert', 'color'],
    route: '/tools/rgb-to-hex',
    featured: false,
    relatedTools: ['hex-to-rgb', 'hex-to-hsl', 'color-picker'],
    component: RGBToHEX,
    seo: {
      title: 'RGB to HEX Converter — Convert RGB Colors to HEX',
      description: 'Convert RGB color values to HEX color codes for use in CSS and design.',
    },
  },

  'hex-to-hsl': {
    id: 'hex-to-hsl',
    name: 'HEX to HSL',
    slug: 'hex-to-hsl',
    description: 'Convert HEX color codes to HSL values.',
    shortDescription: 'Convert HEX to HSL',
    category: 'colors',
    icon: 'Droplets',
    keywords: ['hex', 'hsl', 'convert', 'color'],
    route: '/tools/hex-to-hsl',
    featured: false,
    relatedTools: ['hsl-to-hex', 'hex-to-rgb', 'color-picker'],
    component: HEXToHSL,
    seo: {
      title: 'HEX to HSL Converter — Convert HEX Colors to HSL',
      description: 'Convert HEX color codes to HSL values for use in CSS and design.',
    },
  },

  'hsl-to-hex': {
    id: 'hsl-to-hex',
    name: 'HSL to HEX',
    slug: 'hsl-to-hex',
    description: 'Convert HSL color values to HEX color codes.',
    shortDescription: 'Convert HSL to HEX',
    category: 'colors',
    icon: 'SquareCode',
    keywords: ['hsl', 'hex', 'convert', 'color'],
    route: '/tools/hsl-to-hex',
    featured: false,
    relatedTools: ['hex-to-hsl', 'hex-to-rgb', 'color-picker'],
    component: HSLToHEX,
    seo: {
      title: 'HSL to HEX Converter — Convert HSL Colors to HEX',
      description: 'Convert HSL color values to HEX color codes for use in CSS and design.',
    },
  },

  'color-contrast-checker': {
    id: 'color-contrast-checker',
    name: 'Color Contrast Checker',
    slug: 'color-contrast-checker',
    description: 'Check the contrast ratio between colors for WCAG accessibility compliance.',
    shortDescription: 'Check color contrast',
    category: 'colors',
    icon: 'Eye',
    keywords: ['contrast', 'color', 'wcag', 'accessibility', 'check'],
    route: '/tools/color-contrast-checker',
    featured: false,
    relatedTools: ['color-picker', 'gradient-generator'],
    component: ColorContrastChecker,
    seo: {
      title: 'Color Contrast Checker — Check WCAG Accessibility',
      description: 'Check the contrast ratio between colors for WCAG accessibility compliance.',
    },
  },

  'gradient-generator': {
    id: 'gradient-generator',
    name: 'Gradient Generator',
    slug: 'gradient-generator',
    description: 'Create beautiful CSS gradients with custom colors and angles.',
    shortDescription: 'Generate CSS gradients',
    category: 'colors',
    icon: 'Gradient',
    keywords: ['gradient', 'css', 'generate', 'color', 'background'],
    route: '/tools/gradient-generator',
    featured: false,
    relatedTools: ['color-picker', 'color-palette-generator'],
    component: GradientGenerator,
    seo: {
      title: 'Gradient Generator — Create CSS Gradients',
      description: 'Create beautiful CSS gradients with custom colors and angles for web design.',
    },
  },

  // Image Tools
  'image-compressor': {
    id: 'image-compressor',
    name: 'Image Compressor',
    slug: 'image-compressor',
    description: 'Compress images to reduce file size while maintaining quality. Supports JPEG, PNG, WebP.',
    shortDescription: 'Compress images',
    category: 'images',
    icon: 'Image',
    keywords: ['image', 'compress', 'reduce', 'size', 'jpeg', 'png', 'webp'],
    route: '/tools/image-compressor',
    featured: true,
    relatedTools: ['image-resizer', 'image-converter', 'image-to-webp'],
    component: ImageCompressor,
    seo: {
      title: 'Image Compressor — Reduce Image File Size Online',
      description: 'Compress images to reduce file size while maintaining quality. Supports JPEG, PNG, WebP formats.',
    },
  },

  'image-resizer': {
    id: 'image-resizer',
    name: 'Image Resizer',
    slug: 'image-resizer',
    description: 'Resize images to specific dimensions while maintaining aspect ratio.',
    shortDescription: 'Resize images',
    category: 'images',
    icon: 'Expand',
    keywords: ['image', 'resize', 'dimensions', 'width', 'height', 'aspect'],
    route: '/tools/image-resizer',
    featured: false,
    relatedTools: ['image-compressor', 'image-converter'],
    component: ImageResizer,
    seo: {
      title: 'Image Resizer — Resize Images Online',
      description: 'Resize images to specific dimensions while maintaining aspect ratio.',
    },
  },

  'image-converter': {
    id: 'image-converter',
    name: 'Image Converter',
    slug: 'image-converter',
    description: 'Convert images between different formats (JPEG, PNG, WebP, GIF, SVG).',
    shortDescription: 'Convert image formats',
    category: 'images',
    icon: 'Image',
    keywords: ['image', 'convert', 'format', 'jpeg', 'png', 'webp', 'gif'],
    route: '/tools/image-converter',
    featured: false,
    relatedTools: ['image-compressor', 'image-to-webp', 'image-to-jpg'],
    component: ImageConverter,
    seo: {
      title: 'Image Converter — Convert Image Formats Online',
      description: 'Convert images between different formats including JPEG, PNG, WebP, GIF, and SVG.',
    },
  },

  'image-to-webp': {
    id: 'image-to-webp',
    name: 'Image to WebP',
    slug: 'image-to-webp',
    description: 'Convert images to WebP format for better compression and quality.',
    shortDescription: 'Convert to WebP',
    category: 'images',
    icon: 'Image',
    keywords: ['image', 'webp', 'convert', 'compress', 'quality'],
    route: '/tools/image-to-webp',
    featured: false,
    relatedTools: ['image-compressor', 'image-converter'],
    component: ImageToWebP,
    seo: {
      title: 'Image to WebP Converter — Convert Images to WebP',
      description: 'Convert images to WebP format for better compression and quality.',
    },
  },

  'image-to-jpg': {
    id: 'image-to-jpg',
    name: 'Image to JPG',
    slug: 'image-to-jpg',
    description: 'Convert images to JPEG format with adjustable quality settings.',
    shortDescription: 'Convert to JPG',
    category: 'images',
    icon: 'Image',
    keywords: ['image', 'jpg', 'jpeg', 'convert', 'quality'],
    route: '/tools/image-to-jpg',
    featured: false,
    relatedTools: ['image-compressor', 'image-converter'],
    component: ImageToJPG,
    seo: {
      title: 'Image to JPG Converter — Convert Images to JPEG',
      description: 'Convert images to JPEG format with adjustable quality settings.',
    },
  },

  'image-to-png': {
    id: 'image-to-png',
    name: 'Image to PNG',
    slug: 'image-to-png',
    description: 'Convert images to PNG format with transparency support.',
    shortDescription: 'Convert to PNG',
    category: 'images',
    icon: 'Image',
    keywords: ['image', 'png', 'convert', 'transparency'],
    route: '/tools/image-to-png',
    featured: false,
    relatedTools: ['image-compressor', 'image-converter'],
    component: ImageToPNG,
    seo: {
      title: 'Image to PNG Converter — Convert Images to PNG',
      description: 'Convert images to PNG format with transparency support.',
    },
  },

  'base64-image-converter': {
    id: 'base64-image-converter',
    name: 'Base64 Image Converter',
    slug: 'base64-image-converter',
    description: 'Convert images to Base64 data URLs and vice versa.',
    shortDescription: 'Convert image to Base64',
    category: 'images',
    icon: 'Image',
    keywords: ['base64', 'image', 'convert', 'data', 'url'],
    route: '/tools/base64-image-converter',
    featured: false,
    relatedTools: ['base64-encoder', 'base64-decoder'],
    component: Base64ImageConverter,
    seo: {
      title: 'Base64 Image Converter — Convert Images to Base64',
      description: 'Convert images to Base64 data URLs and vice versa for embedding in HTML and CSS.',
    },
  },

  'svg-optimizer': {
    id: 'svg-optimizer',
    name: 'SVG Optimizer',
    slug: 'svg-optimizer',
    description: 'Optimize SVG files by removing unnecessary metadata and reducing file size.',
    shortDescription: 'Optimize SVG files',
    category: 'images',
    icon: 'Image',
    keywords: ['svg', 'optimize', 'reduce', 'size', 'vector'],
    route: '/tools/svg-optimizer',
    featured: false,
    relatedTools: ['image-compressor', 'image-converter'],
    component: SVGOptimizer,
    seo: {
      title: 'SVG Optimizer — Optimize SVG Files Online',
      description: 'Optimize SVG files by removing unnecessary metadata and reducing file size.',
    },
  },

  // Web Development Tools
  'html-formatter': {
    id: 'html-formatter',
    name: 'HTML Formatter',
    slug: 'html-formatter',
    description: 'Format and beautify HTML code with proper indentation and syntax highlighting.',
    shortDescription: 'Format HTML code',
    category: 'web',
    icon: 'Code',
    keywords: ['html', 'format', 'beautify', 'indent', 'code'],
    route: '/tools/html-formatter',
    featured: false,
    relatedTools: ['css-formatter', 'javascript-formatter', 'html-minifier'],
    component: HTMLFormatter,
    seo: {
      title: 'HTML Formatter — Format and Beautify HTML Code',
      description: 'Format and beautify HTML code with proper indentation and syntax highlighting.',
    },
  },

  'css-formatter': {
    id: 'css-formatter',
    name: 'CSS Formatter',
    slug: 'css-formatter',
    description: 'Format and beautify CSS code with proper indentation and organization.',
    shortDescription: 'Format CSS code',
    category: 'web',
    icon: 'Code',
    keywords: ['css', 'format', 'beautify', 'indent', 'code'],
    route: '/tools/css-formatter',
    featured: false,
    relatedTools: ['html-formatter', 'javascript-formatter', 'css-minifier'],
    component: CSSFormatter,
    seo: {
      title: 'CSS Formatter — Format and Beautify CSS Code',
      description: 'Format and beautify CSS code with proper indentation and organization.',
    },
  },

  'javascript-formatter': {
    id: 'javascript-formatter',
    name: 'JavaScript Formatter',
    slug: 'javascript-formatter',
    description: 'Format and beautify JavaScript code with proper indentation and syntax.',
    shortDescription: 'Format JavaScript code',
    category: 'web',
    icon: 'Code',
    keywords: ['javascript', 'format', 'beautify', 'indent', 'code'],
    route: '/tools/javascript-formatter',
    featured: false,
    relatedTools: ['html-formatter', 'css-formatter', 'javascript-minifier'],
    component: JavaScriptFormatter,
    seo: {
      title: 'JavaScript Formatter — Format and Beautify JavaScript Code',
      description: 'Format and beautify JavaScript code with proper indentation and syntax.',
    },
  },

  'html-minifier': {
    id: 'html-minifier',
    name: 'HTML Minifier',
    slug: 'html-minifier',
    description: 'Minify HTML code by removing whitespace and unnecessary characters.',
    shortDescription: 'Minify HTML code',
    category: 'web',
    icon: 'Minimize',
    keywords: ['html', 'minify', 'compress', 'reduce', 'size'],
    route: '/tools/html-minifier',
    featured: false,
    relatedTools: ['html-formatter', 'css-minifier', 'javascript-minifier'],
    component: HTMLMinifier,
    seo: {
      title: 'HTML Minifier — Minify HTML Code',
      description: 'Minify HTML code by removing whitespace and unnecessary characters to reduce file size.',
    },
  },

  'css-minifier': {
    id: 'css-minifier',
    name: 'CSS Minifier',
    slug: 'css-minifier',
    description: 'Minify CSS code by removing whitespace and unnecessary characters.',
    shortDescription: 'Minify CSS code',
    category: 'web',
    icon: 'Minimize',
    keywords: ['css', 'minify', 'compress', 'reduce', 'size'],
    route: '/tools/css-minifier',
    featured: false,
    relatedTools: ['css-formatter', 'html-minifier', 'javascript-minifier'],
    component: CSSMinifier,
    seo: {
      title: 'CSS Minifier — Minify CSS Code',
      description: 'Minify CSS code by removing whitespace and unnecessary characters to reduce file size.',
    },
  },

  'javascript-minifier': {
    id: 'javascript-minifier',
    name: 'JavaScript Minifier',
    slug: 'javascript-minifier',
    description: 'Minify JavaScript code by removing whitespace and unnecessary characters.',
    shortDescription: 'Minify JavaScript code',
    category: 'web',
    icon: 'Minimize',
    keywords: ['javascript', 'minify', 'compress', 'reduce', 'size'],
    route: '/tools/javascript-minifier',
    featured: false,
    relatedTools: ['javascript-formatter', 'html-minifier', 'css-minifier'],
    component: JavaScriptMinifier,
    seo: {
      title: 'JavaScript Minifier — Minify JavaScript Code',
      description: 'Minify JavaScript code by removing whitespace and unnecessary characters to reduce file size.',
    },
  },

  'url-encoder': {
    id: 'url-encoder',
    name: 'URL Encoder',
    slug: 'url-encoder',
    description: 'Encode URLs and special characters for safe use in web addresses.',
    shortDescription: 'Encode URLs',
    category: 'web',
    icon: 'Link',
    keywords: ['url', 'encode', 'percent', 'encoding', 'web'],
    route: '/tools/url-encoder',
    featured: false,
    relatedTools: ['url-decoder', 'html-entity-encoder'],
    component: URLEncoder,
    seo: {
      title: 'URL Encoder — Encode URLs and Special Characters',
      description: 'Encode URLs and special characters for safe use in web addresses.',
    },
  },

  'url-decoder': {
    id: 'url-decoder',
    name: 'URL Decoder',
    slug: 'url-decoder',
    description: 'Decode percent-encoded URLs and special characters back to their original form.',
    shortDescription: 'Decode URLs',
    category: 'web',
    icon: 'Link',
    keywords: ['url', 'decode', 'percent', 'encoding', 'web'],
    route: '/tools/url-decoder',
    featured: false,
    relatedTools: ['url-encoder', 'html-entity-decoder'],
    component: URLDecoder,
    seo: {
      title: 'URL Decoder — Decode Percent-Encoded URLs',
      description: 'Decode percent-encoded URLs and special characters back to their original form.',
    },
  },

  'html-entity-encoder': {
    id: 'html-entity-encoder',
    name: 'HTML Entity Encoder',
    slug: 'html-entity-encoder',
    description: 'Encode special characters to HTML entities for safe HTML display.',
    shortDescription: 'Encode HTML entities',
    category: 'web',
    icon: 'Code',
    keywords: ['html', 'entity', 'encode', 'special', 'characters'],
    route: '/tools/html-entity-encoder',
    featured: false,
    relatedTools: ['html-entity-decoder', 'url-encoder'],
    component: HTMLEntityEncoder,
    seo: {
      title: 'HTML Entity Encoder — Encode Special Characters to HTML Entities',
      description: 'Encode special characters to HTML entities for safe HTML display.',
    },
  },

  'html-entity-decoder': {
    id: 'html-entity-decoder',
    name: 'HTML Entity Decoder',
    slug: 'html-entity-decoder',
    description: 'Decode HTML entities back to their original special characters.',
    shortDescription: 'Decode HTML entities',
    category: 'web',
    icon: 'Code',
    keywords: ['html', 'entity', 'decode', 'special', 'characters'],
    route: '/tools/html-entity-decoder',
    featured: false,
    relatedTools: ['html-entity-encoder', 'url-decoder'],
    component: HTMLEntityDecoder,
    seo: {
      title: 'HTML Entity Decoder — Decode HTML Entities to Characters',
      description: 'Decode HTML entities back to their original special characters.',
    },
  },

  // SQL Tools
  'sql-formatter': {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    slug: 'sql-formatter',
    description: 'Format SQL queries with proper indentation and syntax highlighting.',
    shortDescription: 'Format SQL queries',
    category: 'sql',
    icon: 'Database',
    keywords: ['sql', 'format', 'beautify', 'query', 'database'],
    route: '/tools/sql-formatter',
    featured: false,
    relatedTools: ['sql-minifier', 'sql-validator', 'sql-to-json'],
    component: SQLFormatter,
    seo: {
      title: 'SQL Formatter — Format SQL Queries Online',
      description: 'Format SQL queries with proper indentation and syntax highlighting for better readability.',
    },
  },

  'sql-minifier': {
    id: 'sql-minifier',
    name: 'SQL Minifier',
    slug: 'sql-minifier',
    description: 'Minify SQL queries by removing unnecessary whitespace and formatting.',
    shortDescription: 'Minify SQL queries',
    category: 'sql',
    icon: 'Minimize',
    keywords: ['sql', 'minify', 'compress', 'query', 'database'],
    route: '/tools/sql-minifier',
    featured: false,
    relatedTools: ['sql-formatter', 'sql-validator'],
    component: SQLMinifier,
    seo: {
      title: 'SQL Minifier — Minify SQL Queries',
      description: 'Minify SQL queries by removing unnecessary whitespace and formatting to reduce size.',
    },
  },

  'sql-validator': {
    id: 'sql-validator',
    name: 'SQL Validator',
    slug: 'sql-validator',
    description: 'Validate SQL queries for syntax errors and common issues.',
    shortDescription: 'Validate SQL queries',
    category: 'sql',
    icon: 'CheckCircle',
    keywords: ['sql', 'validate', 'check', 'query', 'database', 'syntax'],
    route: '/tools/sql-validator',
    featured: false,
    relatedTools: ['sql-formatter', 'sql-minifier'],
    component: SQLValidator,
    seo: {
      title: 'SQL Validator — Check SQL Query Syntax',
      description: 'Validate SQL queries for syntax errors and common issues.',
    },
  },

  'sql-to-json': {
    id: 'sql-to-json',
    name: 'SQL to JSON',
    slug: 'sql-to-json',
    description: 'Convert SQL query results to JSON format.',
    shortDescription: 'Convert SQL to JSON',
    category: 'sql',
    icon: 'Database',
    keywords: ['sql', 'json', 'convert', 'query', 'database'],
    route: '/tools/sql-to-json',
    featured: false,
    relatedTools: ['sql-formatter', 'json-formatter'],
    component: SQLToJSON,
    seo: {
      title: 'SQL to JSON Converter — Convert SQL Results to JSON',
      description: 'Convert SQL query results to JSON format for use in applications.',
    },
  },

  // API Tools
  'http-status-codes': {
    id: 'http-status-codes',
    name: 'HTTP Status Codes',
    slug: 'http-status-codes',
    description: 'Browse and search all HTTP status codes with explanations and usage examples.',
    shortDescription: 'Browse HTTP status codes',
    category: 'api',
    icon: 'Server',
    keywords: ['http', 'status', 'code', 'response', 'api', 'web'],
    route: '/tools/http-status-codes',
    featured: false,
    relatedTools: ['rest-api-tester', 'curl-generator'],
    component: HTTPStatusCodes,
    seo: {
      title: 'HTTP Status Codes — Complete List with Explanations',
      description: 'Browse and search all HTTP status codes with explanations and usage examples.',
    },
  },

  'rest-api-tester': {
    id: 'rest-api-tester',
    name: 'REST API Tester',
    slug: 'rest-api-tester',
    description: 'Test REST APIs directly from the browser with custom headers and request bodies.',
    shortDescription: 'Test REST APIs',
    category: 'api',
    icon: 'Server',
    keywords: ['rest', 'api', 'test', 'http', 'request', 'response'],
    route: '/tools/rest-api-tester',
    featured: false,
    relatedTools: ['http-status-codes', 'curl-generator'],
    component: RESTAPITester,
    seo: {
      title: 'REST API Tester — Test APIs Online',
      description: 'Test REST APIs directly from the browser with custom headers and request bodies.',
    },
  },

  'curl-generator': {
    id: 'curl-generator',
    name: 'cURL Generator',
    slug: 'curl-generator',
    description: 'Generate cURL commands from API request details.',
    shortDescription: 'Generate cURL commands',
    category: 'api',
    icon: 'Terminal',
    keywords: ['curl', 'generate', 'command', 'api', 'http', 'request'],
    route: '/tools/curl-generator',
    featured: false,
    relatedTools: ['rest-api-tester', 'http-header-parser'],
    component: CURLGenerator,
    seo: {
      title: 'cURL Generator — Generate cURL Commands',
      description: 'Generate cURL commands from API request details for easy testing.',
    },
  },

  'http-header-parser': {
    id: 'http-header-parser',
    name: 'HTTP Header Parser',
    slug: 'http-header-parser',
    description: 'Parse and analyze HTTP headers from requests and responses.',
    shortDescription: 'Parse HTTP headers',
    category: 'api',
    icon: 'Server',
    keywords: ['http', 'header', 'parse', 'request', 'response', 'api'],
    route: '/tools/http-header-parser',
    featured: false,
    relatedTools: ['user-agent-parser', 'rest-api-tester'],
    component: HTTPHeaderParser,
    seo: {
      title: 'HTTP Header Parser — Parse and Analyze HTTP Headers',
      description: 'Parse and analyze HTTP headers from requests and responses.',
    },
  },

  'user-agent-parser': {
    id: 'user-agent-parser',
    name: 'User Agent Parser',
    slug: 'user-agent-parser',
    description: 'Parse user agent strings to extract browser, OS, and device information.',
    shortDescription: 'Parse user agent strings',
    category: 'api',
    icon: 'Smartphone',
    keywords: ['user', 'agent', 'parse', 'browser', 'device', 'os'],
    route: '/tools/user-agent-parser',
    featured: false,
    relatedTools: ['http-header-parser'],
    component: UserAgentParser,
    seo: {
      title: 'User Agent Parser — Parse User Agent Strings',
      description: 'Parse user agent strings to extract browser, OS, and device information.',
    },
  },

  'mime-type-lookup': {
    id: 'mime-type-lookup',
    name: 'MIME Type Lookup',
    slug: 'mime-type-lookup',
    description: 'Look up MIME types for file extensions and vice versa.',
    shortDescription: 'Look up MIME types',
    category: 'api',
    icon: 'File',
    keywords: ['mime', 'type', 'lookup', 'file', 'extension'],
    route: '/tools/mime-type-lookup',
    featured: false,
    relatedTools: ['file-size-converter'],
    component: MIMETypeLookup,
    seo: {
      title: 'MIME Type Lookup — Find MIME Types for File Extensions',
      description: 'Look up MIME types for file extensions and vice versa.',
    },
  },

  'file-size-converter': {
    id: 'file-size-converter',
    name: 'File Size Converter',
    slug: 'file-size-converter',
    description: 'Convert between different file size units (bytes, KB, MB, GB, TB).',
    shortDescription: 'Convert file sizes',
    category: 'api',
    icon: 'HardDrive',
    keywords: ['file', 'size', 'convert', 'bytes', 'kb', 'mb', 'gb'],
    route: '/tools/file-size-converter',
    featured: false,
    relatedTools: ['mime-type-lookup'],
    component: FileSizeConverter,
    seo: {
      title: 'File Size Converter — Convert Between Size Units',
      description: 'Convert between different file size units including bytes, KB, MB, GB, and TB.',
    },
  },

  // Time Tools
  'unix-timestamp-converter': {
    id: 'unix-timestamp-converter',
    name: 'Unix Timestamp Converter',
    slug: 'unix-timestamp-converter',
    description: 'Convert Unix timestamps to human-readable dates and vice versa.',
    shortDescription: 'Convert Unix timestamps',
    category: 'time',
    icon: 'Clock',
    keywords: ['unix', 'timestamp', 'convert', 'date', 'time', 'epoch'],
    route: '/tools/unix-timestamp-converter',
    featured: false,
    relatedTools: ['timestamp-generator', 'date-difference-calculator', 'timezone-converter'],
    component: UnixTimestampConverter,
    seo: {
      title: 'Unix Timestamp Converter — Convert Timestamps to Dates',
      description: 'Convert Unix timestamps to human-readable dates and vice versa.',
    },
  },

  'timestamp-generator': {
    id: 'timestamp-generator',
    name: 'Timestamp Generator',
    slug: 'timestamp-generator',
    description: 'Generate Unix timestamps for specific dates and times.',
    shortDescription: 'Generate timestamps',
    category: 'time',
    icon: 'Clock',
    keywords: ['timestamp', 'generate', 'unix', 'date', 'time'],
    route: '/tools/timestamp-generator',
    featured: false,
    relatedTools: ['unix-timestamp-converter', 'date-difference-calculator'],
    component: TimestampGenerator,
    seo: {
      title: 'Timestamp Generator — Generate Unix Timestamps',
      description: 'Generate Unix timestamps for specific dates and times.',
    },
  },

  'date-difference-calculator': {
    id: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    slug: 'date-difference-calculator',
    description: 'Calculate the difference between two dates in days, hours, minutes, and seconds.',
    shortDescription: 'Calculate date differences',
    category: 'time',
    icon: 'Calendar',
    keywords: ['date', 'difference', 'calculate', 'days', 'time', 'duration'],
    route: '/tools/date-difference-calculator',
    featured: false,
    relatedTools: ['unix-timestamp-converter', 'timestamp-generator'],
    component: DateDifferenceCalculator,
    seo: {
      title: 'Date Difference Calculator — Calculate Time Between Dates',
      description: 'Calculate the difference between two dates in days, hours, minutes, and seconds.',
    },
  },

  'timezone-converter': {
    id: 'timezone-converter',
    name: 'Timezone Converter',
    slug: 'timezone-converter',
    description: 'Convert times between different timezones with support for daylight saving time.',
    shortDescription: 'Convert between timezones',
    category: 'time',
    icon: 'Globe',
    keywords: ['timezone', 'convert', 'time', 'date', 'utc', 'gmt'],
    route: '/tools/timezone-converter',
    featured: false,
    relatedTools: ['unix-timestamp-converter', 'timestamp-generator'],
    component: TimezoneConverter,
    seo: {
      title: 'Timezone Converter — Convert Times Between Timezones',
      description: 'Convert times between different timezones with support for daylight saving time.',
    },
  },

  // Additional Tools
  'diff-checker': {
    id: 'diff-checker',
    name: 'Diff Checker',
    slug: 'diff-checker',
    description: 'Compare two pieces of text or code and see the differences highlighted.',
    shortDescription: 'Compare text and code',
    category: 'text',
    icon: 'Diff',
    keywords: ['diff', 'compare', 'text', 'code', 'difference', 'change'],
    route: '/tools/diff-checker',
    featured: true,
    relatedTools: ['text-diff', 'git-command-generator'],
    component: DiffChecker,
    seo: {
      title: 'Diff Checker — Compare Text and Code Differences',
      description: 'Compare two pieces of text or code and see the differences highlighted.',
    },
  },
};

// Get all tools as array
export const allTools = Object.values(toolRegistry);

// Get tools by category
export const getToolsByCategory = (category: string) => {
  return allTools.filter(tool => tool.category === category);
};

// Get featured tools
export const featuredTools = allTools.filter(tool => tool.featured);

// Get popular tools (featured + some others)
export const popularTools = [
  ...featuredTools,
  ...allTools.filter(tool => !tool.featured && ['json-formatter', 'jwt-decoder', 'uuid-generator', 'password-generator'].includes(tool.id))
].slice(0, 8);

// Categories configuration
export const categories: ToolCategory[] = [
  {
    id: 'json-data',
    name: 'JSON & Data',
    slug: 'json-data',
    icon: 'Braces',
    description: 'Tools for working with JSON, CSV, YAML, and other data formats.',
    color: '#6C63FF',
  },
  {
    id: 'text',
    name: 'Text',
    slug: 'text',
    icon: 'FileText',
    description: 'Text processing and manipulation tools.',
    color: '#22C55E',
  },
  {
    id: 'security',
    name: 'Security',
    slug: 'security',
    icon: 'Shield',
    description: 'Security-related tools for encoding, decoding, and hashing.',
    color: '#EF4444',
  },
  {
    id: 'generators',
    name: 'Generators',
    slug: 'generators',
    icon: 'Sparkles',
    description: 'Generate UUIDs, passwords, QR codes, and other useful data.',
    color: '#F59E0B',
  },
  {
    id: 'colors',
    name: 'Colors',
    slug: 'colors',
    icon: 'Palette',
    description: 'Color tools for picking, converting, and checking contrast.',
    color: '#EC4899',
  },
  {
    id: 'images',
    name: 'Images',
    slug: 'images',
    icon: 'Image',
    description: 'Image processing tools for compression, resizing, and conversion.',
    color: '#3B82F6',
  },
  {
    id: 'web',
    name: 'Web Development',
    slug: 'web',
    icon: 'Code',
    description: 'Tools for HTML, CSS, JavaScript, and web development.',
    color: '#10B981',
  },
  {
    id: 'sql',
    name: 'SQL',
    slug: 'sql',
    icon: 'Database',
    description: 'SQL formatting, validation, and conversion tools.',
    color: '#06B6D4',
  },
  {
    id: 'api',
    name: 'API & HTTP',
    slug: 'api',
    icon: 'Server',
    description: 'API testing, HTTP tools, and network utilities.',
    color: '#8B5CF6',
  },
  {
    id: 'time',
    name: 'Time',
    slug: 'time',
    icon: 'Clock',
    description: 'Time-related tools for timestamps, dates, and timezones.',
    color: '#F97316',
  },
];

// Get category by ID
export const getCategoryById = (id: string) => {
  return categories.find(cat => cat.id === id);
};

// Search tools
export const searchTools = (query: string): SearchResult[] => {
  const lowerQuery = query.toLowerCase();

  return allTools
    .map(tool => {
      // Calculate score based on matches
      let score = 0;

      // Exact match in name
      if (tool.name.toLowerCase() === lowerQuery) {
        score += 100;
      }

      // Partial match in name
      if (tool.name.toLowerCase().includes(lowerQuery)) {
        score += 50;
      }

      // Match in keywords
      if (tool.keywords.some(kw => kw.includes(lowerQuery))) {
        score += 30;
      }

      // Match in description
      if (tool.description.toLowerCase().includes(lowerQuery)) {
        score += 20;
      }

      // Match in short description
      if (tool.shortDescription.toLowerCase().includes(lowerQuery)) {
        score += 15;
      }

      // Match in category
      if (tool.category.includes(lowerQuery)) {
        score += 10;
      }

      return {
        id: tool.id,
        name: tool.name,
        slug: tool.slug,
        description: tool.shortDescription,
        category: tool.category,
        icon: tool.icon,
        route: tool.route,
        score,
      };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);
};

// Get tool by ID
export const getToolById = (id: string) => {
  return toolRegistry[id];
};

// Get tool by slug
export const getToolBySlug = (slug: string) => {
  return allTools.find(tool => tool.slug === slug);
};

// Get related tools
export const getRelatedTools = (toolId: string) => {
  const tool = toolRegistry[toolId];
  if (!tool) return [];

  return tool.relatedTools
    .map(id => toolRegistry[id])
    .filter(Boolean) as Tool[];
};
