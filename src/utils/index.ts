// JSON utilities
export const formatJSON = (jsonString: string, indent: number = 2): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, indent);
  } catch {
    return jsonString;
  }
};

export const minifyJSON = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed);
  } catch {
    return jsonString;
  }
};

export const validateJSON = (jsonString: string): { valid: boolean; error?: string; line?: number; column?: number } => {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Try to extract line and column from error message
      const match = error.message.match(/position (\d+)/) || error.message.match(/at line (\d+) column (\d+)/);
      if (match) {
        const line = match[1] ? parseInt(match[1]) : undefined;
        const column = match[2] ? parseInt(match[2]) : undefined;
        return { valid: false, error: error.message, line, column };
      }
      return { valid: false, error: error.message };
    }
    return { valid: false, error: 'Invalid JSON' };
  }
};

// JSON to TypeScript conversion
export const jsonToTypeScript = (jsonString: string, interfaceName: string = 'Root'): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return generateTypeScriptFromObject(parsed, interfaceName);
  } catch {
    return 'Invalid JSON input';
  }
};

const generateTypeScriptFromObject = (obj: any, name: string, indent: number = 2): string => {
  const space = ' '.repeat(indent);

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return `${name}: any[];`;
    }
    const itemType = generateTypeScriptFromObject(obj[0], '', indent);
    return `${name}: ${itemType}[];`;
  }

  if (obj === null) {
    return `${name}: null;`;
  }

  if (typeof obj === 'object') {
    const properties = Object.entries(obj).map(([key, value]) => {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
      const type = generateTypeScriptFromObject(value, '', indent);
      return `${space}${safeKey}: ${type}`;
    }).join('\n');

    return `interface ${name} {\n${properties}\n${space}}`;
  }

  if (typeof obj === 'string') {
    return 'string';
  }

  if (typeof obj === 'number') {
    return 'number';
  }

  if (typeof obj === 'boolean') {
    return 'boolean';
  }

  return 'any';
};

// JSON to CSV conversion
export const jsonToCSV = (jsonString: string, delimiter: string = ','): string => {
  try {
    const parsed = JSON.parse(jsonString);

    if (!Array.isArray(parsed)) {
      return 'Input should be a JSON array for CSV conversion';
    }

    if (parsed.length === 0) {
      return '';
    }

    // Get headers from first object
    const headers = Object.keys(parsed[0] || {});

    // Create CSV rows
    const rows = parsed.map(row => {
      return headers.map(header => {
        let value = row[header];
        if (value === undefined || value === null) {
          value = '';
        } else if (typeof value === 'object') {
          value = JSON.stringify(value);
        } else if (typeof value === 'string' && (value.includes(delimiter) || value.includes('"') || value.includes('\n'))) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(delimiter);
    });

    return [headers.join(delimiter), ...rows].join('\n');
  } catch {
    return 'Invalid JSON input';
  }
};

// CSV to JSON conversion
export const csvToJSON = (csvString: string, delimiter: string = ','): string => {
  const lines = csvString.split('\n').filter(line => line.trim() !== '');

  if (lines.length === 0) {
    return '[]';
  }

  const headers = lines[0].split(delimiter).map(h => h.trim());
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter);
    const obj: Record<string, any> = {};

    for (let j = 0; j < Math.min(headers.length, values.length); j++) {
      let value = values[j].trim();

      // Remove quotes and unescape
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1).replace(/"""/g, '"');
      }

      // Try to parse as number
      if (!isNaN(Number(value)) && value !== '' && !value.includes(' ')) {
        obj[headers[j]] = Number(value);
      } else if (value.toLowerCase() === 'true') {
        obj[headers[j]] = true;
      } else if (value.toLowerCase() === 'false') {
        obj[headers[j]] = false;
      } else if (value === '') {
        obj[headers[j]] = null;
      } else {
        obj[headers[j]] = value;
      }
    }

    result.push(obj);
  }

  return JSON.stringify(result, null, 2);
};

// YAML to JSON conversion (simplified)
export const yamlToJSON = (yamlString: string): string => {
  try {
    // Simple YAML parsing for basic cases
    const lines = yamlString.split('\n');
    const result: any = {};
    let currentPath: string[] = [];
    let currentObject = result;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed === '' || trimmed.startsWith('#')) {
        continue;
      }

      const indent = line.search(/\S/);
      const level = Math.floor(indent / 2);

      // Adjust path based on indentation
      while (currentPath.length > level) {
        currentPath.pop();
        currentObject = result;
        for (const key of currentPath) {
          currentObject = currentObject[key];
        }
      }

      if (trimmed.includes(':')) {
        const [key, ...valueParts] = trimmed.split(':');
        const value = valueParts.join(':').trim();
        const trimmedKey = key.trim();

        if (value === '' || value.startsWith('#')) {
          // This is a key with no value or comment - treat as object
          currentObject[trimmedKey] = {};
          currentPath.push(trimmedKey);
          currentObject = currentObject[trimmedKey];
        } else if (value.startsWith('[') && value.endsWith(']')) {
          // Array
          try {
            currentObject[trimmedKey] = JSON.parse(value);
          } catch {
            currentObject[trimmedKey] = value.slice(1, -1).split(',').map(v => v.trim());
          }
        } else if (value.startsWith('{') && value.endsWith('}')) {
          // Object
          try {
            currentObject[trimmedKey] = JSON.parse(value);
          } catch {
            currentObject[trimmedKey] = value;
          }
        } else if (!isNaN(Number(value))) {
          currentObject[trimmedKey] = Number(value);
        } else if (value.toLowerCase() === 'true') {
          currentObject[trimmedKey] = true;
        } else if (value.toLowerCase() === 'false') {
          currentObject[trimmedKey] = false;
        } else if (value.toLowerCase() === 'null') {
          currentObject[trimmedKey] = null;
        } else {
          currentObject[trimmedKey] = value;
        }
      }
    }

    return JSON.stringify(result, null, 2);
  } catch {
    return 'Invalid YAML input';
  }
};

// JSON to YAML conversion
export const jsonToYAML = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return objectToYAML(parsed);
  } catch {
    return 'Invalid JSON input';
  }
};

const objectToYAML = (obj: any, indent: number = 0): string => {
  const space = ' '.repeat(indent);

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return '[]';
    }
    return obj.map(item => {
      if (typeof item === 'object' && item !== null) {
        return `${space}- ${objectToYAML(item, indent + 2).trim()}`;
      }
      return `${space}- ${formatYAMLValue(item)}`;
    }).join('\n');
  }

  if (obj === null) {
    return 'null';
  }

  if (typeof obj === 'object') {
    const entries = Object.entries(obj);
    if (entries.length === 0) {
      return '{}';
    }
    return entries.map(([key, value]) => {
      const formattedKey = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : `"${key}"`;
      if (typeof value === 'object' && value !== null) {
        const yamlValue = objectToYAML(value, indent + 2);
        if (Array.isArray(value) && value.length === 0) {
          return `${space}${formattedKey}: []`;
        }
        if (Object.keys(value).length === 0) {
          return `${space}${formattedKey}: {}`;
        }
        return `${space}${formattedKey}:\n${yamlValue}`;
      }
      return `${space}${formattedKey}: ${formatYAMLValue(value)}`;
    }).join('\n');
  }

  return formatYAMLValue(obj);
};

const formatYAMLValue = (value: any): string => {
  if (value === null) return 'null';
  if (value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') {
    if (value === '') return '""';
    if (/^[a-zA-Z0-9_\-.:]+$/.test(value)) return value;
    if (value.includes('\n') || value.includes(':') || value.includes('#') || value.includes('"')) {
      return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    }
    return value;
  }
  return JSON.stringify(value);
};

// Base64 utilities
export const base64Encode = (text: string): string => {
  return btoa(encodeURIComponent(text));
};

export const base64Decode = (text: string): string => {
  try {
    return decodeURIComponent(atob(text));
  } catch {
    return 'Invalid Base64 input';
  }
};

// URL utilities
export const urlEncode = (text: string): string => {
  return encodeURIComponent(text);
};

export const urlDecode = (text: string): string => {
  try {
    return decodeURIComponent(text);
  } catch {
    return 'Invalid URL encoded input';
  }
};

// HTML entity utilities
export const htmlEntityEncode = (text: string): string => {
  return text.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[char] || char;
  });
};

export const htmlEntityDecode = (text: string): string => {
  return text.replace(/&(amp|lt|gt|quot|#39);/g, (entity) => {
    const entities: Record<string, string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
    };
    return entities[entity] || entity;
  });
};

// UUID generation
export const generateUUID = (version: 1 | 4 = 4): string => {
  if (version === 4) {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  // UUID v1 (simplified - not fully RFC compliant)
  const now = Date.now();
  const timeLow = (now & 0xfffffff).toString(16).padStart(8, '0');
  const timeMid = ((now >>> 28) & 0xffff).toString(16).padStart(4, '0');
  const timeHi = ((now >>> 44) & 0xfff).toString(16).padStart(4, '0');
  const clockSeq = (Math.random() * 0x3fff | 0).toString(16).padStart(4, '0');
  const node = 'xxxxxxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
  return `${timeLow}-${timeMid}-${timeHi}-1${clockSeq}-${node}`;
};

// Password generation
export const generatePassword = (options: {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
}): string => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let chars = '';
  if (options.includeUppercase) {
    chars += options.excludeAmbiguous ? uppercase.replace(/[O]/g, '') : uppercase;
  }
  if (options.includeLowercase) {
    chars += options.excludeAmbiguous ? lowercase.replace(/[l]/g, '') : lowercase;
  }
  if (options.includeNumbers) {
    chars += options.excludeAmbiguous ? numbers.replace(/[01]/g, '') : numbers;
  }
  if (options.includeSymbols) {
    chars += options.excludeAmbiguous ? symbols.replace(/[<>]/g, '') : symbols;
  }

  if (chars === '') {
    chars = lowercase + numbers;
  }

  let password = '';
  const crypto = window.crypto || (window as any).msCrypto;

  if (crypto && crypto.getRandomValues) {
    const values = new Uint32Array(options.length);
    crypto.getRandomValues(values);
    for (let i = 0; i < options.length; i++) {
      password += chars[values[i] % chars.length];
    }
  } else {
    for (let i = 0; i < options.length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  // Ensure at least one character from each selected category
  const requiredChars = [];
  if (options.includeUppercase) requiredChars.push(uppercase);
  if (options.includeLowercase) requiredChars.push(lowercase);
  if (options.includeNumbers) requiredChars.push(numbers);
  if (options.includeSymbols) requiredChars.push(symbols);

  for (const charSet of requiredChars) {
    const filtered = options.excludeAmbiguous ? charSet.replace(/[Ol01<>]/g, '') : charSet;
    if (filtered && !password.split('').some(c => filtered.includes(c))) {
      const randomChar = filtered[Math.floor(Math.random() * filtered.length)];
      const randomPos = Math.floor(Math.random() * password.length);
      password = password.substring(0, randomPos) + randomChar + password.substring(randomPos);
    }
  }

  return password;
};

// Password strength calculation
export const calculatePasswordStrength = (password: string): { score: number; label: string; color: string } => {
  let score = 0;

  // Length
  score += Math.min(password.length * 2, 40);

  // Character variety
  if (/[a-z]/.test(password)) score += 5;
  if (/[A-Z]/.test(password)) score += 5;
  if (/[0-9]/.test(password)) score += 5;
  if (/[^a-zA-Z0-9]/.test(password)) score += 10;

  // Deductions
  if (password.length < 8) score -= 20;
  if (/password|123456|qwerty/i.test(password)) score -= 30;
  if (/(\w)\1{2,}/.test(password)) score -= 10; // Repeated characters

  score = Math.max(0, Math.min(100, score));

  if (score < 30) {
    return { score, label: 'Weak', color: 'text-error' };
  } else if (score < 70) {
    return { score, label: 'Medium', color: 'text-warning' };
  } else {
    return { score, label: 'Strong', color: 'text-success' };
  }
};

// JWT decoding
export const decodeJWT = (token: string): { header: any; payload: any; signature: string; valid: boolean } => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { header: null, payload: null, signature: '', valid: false };
    }

    const decodePart = (part: string) => {
      try {
        return JSON.parse(atob(part));
      } catch {
        return null;
      }
    };

    return {
      header: decodePart(parts[0]),
      payload: decodePart(parts[1]),
      signature: parts[2],
      valid: true,
    };
  } catch {
    return { header: null, payload: null, signature: '', valid: false };
  }
};

// Hash generation
export const generateHash = async (text: string, algorithm: string = 'SHA-256'): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Text case conversion
export const convertCase = (text: string, targetCase: string): string => {
  switch (targetCase) {
    case 'UPPERCASE':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'Title Case':
      return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    case 'Sentence case':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case 'camelCase':
      return text
        .split(/[\s\-_]+/)
        .map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
    case 'PascalCase':
      return text
        .split(/[\s\-_]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
    case 'snake_case':
      return text
        .split(/[\s\-]+/)
        .map(word => word.toLowerCase())
        .join('_');
    case 'kebab-case':
      return text
        .split(/[\s_]+/)
        .map(word => word.toLowerCase())
        .join('-');
    case 'CONSTANT_CASE':
      return text
        .split(/[\s\-_]+/)
        .map(word => word.toUpperCase())
        .join('_');
    default:
      return text;
  }
};

// Word counting
export const countWords = (text: string): { words: number; characters: number; charactersNoSpaces: number; lines: number; sentences: number; paragraphs: number } => {
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const lines = text.split('\n').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim() !== '').length;
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim() !== '').length;

  return { words, characters, charactersNoSpaces, lines, sentences, paragraphs };
};

// Character counting
export const countCharacters = (text: string): { characters: number; charactersNoSpaces: number } => {
  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
  };
};

// Remove duplicate lines
export const removeDuplicateLines = (text: string): string => {
  const lines = text.split('\n');
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    if (!seen.has(line)) {
      seen.add(line);
      result.push(line);
    }
  }

  return result.join('\n');
};

// Sort lines
export const sortLines = (text: string, order: 'asc' | 'desc', numeric: boolean = false, caseSensitive: boolean = true): string => {
  const lines = text.split('\n');

  const sorted = [...lines].sort((a, b) => {
    const aVal = caseSensitive ? a : a.toLowerCase();
    const bVal = caseSensitive ? b : b.toLowerCase();

    if (numeric) {
      const aNum = parseFloat(aVal) || 0;
      const bNum = parseFloat(bVal) || 0;
      return order === 'asc' ? aNum - bNum : bNum - aNum;
    }

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted.join('\n');
};

// Text cleaning
export const cleanText = (text: string, options: {
  removeExtraSpaces: boolean;
  removeSpecialChars: boolean;
  removeNumbers: boolean;
  removePunctuation: boolean;
  trimLines: boolean;
}): string => {
  let result = text;

  if (options.removeExtraSpaces) {
    result = result.replace(/\s+/g, ' ').trim();
  }

  if (options.removeSpecialChars) {
    result = result.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  if (options.removeNumbers) {
    result = result.replace(/[0-9]/g, '');
  }

  if (options.removePunctuation) {
    result = result.replace(/[.,;:!?"'()\[\]{}]/g, '');
  }

  if (options.trimLines) {
    result = result.split('\n').map(line => line.trim()).join('\n');
  }

  return result;
};

// Regex testing
export const testRegex = (text: string, pattern: string, flags: string = ''): { matches: string[]; matchCount: number; capturedGroups: string[][]; matchPositions: { start: number; end: number }[] } => {
  try {
    const regex = new RegExp(pattern, flags);
    const matches: string[] = [];
    const capturedGroups: string[][] = [];
    const matchPositions: { start: number; end: number }[] = [];

    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index !== undefined) {
        matches.push(match[0]);
        capturedGroups.push(match.slice(1));
        matchPositions.push({ start: match.index, end: match.index + match[0].length });
      }
      if (match.index === undefined) break;
    }

    return {
      matches,
      matchCount: matches.length,
      capturedGroups,
      matchPositions,
    };
  } catch {
    return { matches: [], matchCount: 0, capturedGroups: [], matchPositions: [] };
  }
};

// Diff calculation
export const calculateDiff = (oldText: string, newText: string): { oldText: string; newText: string; diffs: { type: 'insert' | 'delete' | 'equal'; text: string }[] } => {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');

  // Simple LCS-based diff
  const lcs = findLCS(oldLines, newLines);

  const diffs: { type: 'insert' | 'delete' | 'equal'; text: string }[] = [];
  let oldIdx = 0;
  let newIdx = 0;
  let lcsIdx = 0;

  while (oldIdx < oldLines.length || newIdx < newLines.length) {
    if (lcsIdx < lcs.length && oldIdx < oldLines.length && oldLines[oldIdx] === lcs[lcsIdx]) {
      if (newIdx < newLines.length && newLines[newIdx] === lcs[lcsIdx]) {
        diffs.push({ type: 'equal', text: oldLines[oldIdx] });
        oldIdx++;
        newIdx++;
        lcsIdx++;
      } else {
        diffs.push({ type: 'insert', text: newLines[newIdx] });
        newIdx++;
      }
    } else if (lcsIdx < lcs.length && newIdx < newLines.length && newLines[newIdx] === lcs[lcsIdx]) {
      diffs.push({ type: 'delete', text: oldLines[oldIdx] });
      oldIdx++;
    } else if (oldIdx < oldLines.length && newIdx < newLines.length) {
      diffs.push({ type: 'delete', text: oldLines[oldIdx] });
      diffs.push({ type: 'insert', text: newLines[newIdx] });
      oldIdx++;
      newIdx++;
    } else if (oldIdx < oldLines.length) {
      diffs.push({ type: 'delete', text: oldLines[oldIdx] });
      oldIdx++;
    } else if (newIdx < newLines.length) {
      diffs.push({ type: 'insert', text: newLines[newIdx] });
      newIdx++;
    }
  }

  return {
    oldText,
    newText,
    diffs,
  };
};

const findLCS = (arr1: string[], arr2: string[]): string[] => {
  const m = arr1.length;
  const n = arr2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find LCS
  const lcs: string[] = [];
  let i = m;
  let j = n;

  while (i > 0 && j > 0) {
    if (arr1[i - 1] === arr2[j - 1]) {
      lcs.unshift(arr1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
};

// Color utilities
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const cleaned = hex.replace(/^#/, '');
  if (cleaned.length !== 3 && cleaned.length !== 6) return null;

  let r, g, b;
  if (cleaned.length === 3) {
    r = parseInt(cleaned[0] + cleaned[0], 16);
    g = parseInt(cleaned[1] + cleaned[1], 16);
    b = parseInt(cleaned[2] + cleaned[2], 16);
  } else {
    r = parseInt(cleaned.substring(0, 2), 16);
    g = parseInt(cleaned.substring(2, 4), 16);
    b = parseInt(cleaned.substring(4, 6), 16);
  }

  return { r, g, b };
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
};

export const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return rgbToHex(r, g, b);
};

// Contrast ratio calculation
export const calculateContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

const getLuminance = (rgb: { r: number; g: number; b: number }): number => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const a = [r, g, b].map(v => {
    v /= 12.92;
    return v <= 0.03928 ? v : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Check WCAG compliance
export const checkWCAGCompliance = (ratio: number): { aaNormal: boolean; aaaNormal: boolean; aaLarge: boolean; aaaLarge: boolean } => {
  return {
    aaNormal: ratio >= 4.5,
    aaaNormal: ratio >= 7,
    aaLarge: ratio >= 3,
    aaaLarge: ratio >= 4.5,
  };
};

// Gradient generation
export const generateGradient = (color1: string, color2: string, angle: number = 90): string => {
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
};

// Timestamp utilities
export const unixToDate = (timestamp: number, milliseconds: boolean = false): Date => {
  const ts = milliseconds ? timestamp : timestamp * 1000;
  return new Date(ts);
};

export const dateToUnix = (date: Date, milliseconds: boolean = false): number => {
  const ts = date.getTime();
  return milliseconds ? ts : Math.floor(ts / 1000);
};

// File size conversion
export const convertFileSize = (bytes: number, to: 'bytes' | 'kb' | 'mb' | 'gb' | 'tb' = 'mb'): number => {
  const units = { bytes: 1, kb: 1024, mb: 1024 ** 2, gb: 1024 ** 3, tb: 1024 ** 4 };
  return bytes / units[to];
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
  if (bytes < 1024 ** 4) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  return `${(bytes / 1024 ** 4).toFixed(2)} TB`;
};

// Timezone utilities
export const convertTimezone = (date: Date, fromTimezone: string, toTimezone: string): Date => {
  try {
    const dateString = date.toLocaleString('en-US', { timeZone: fromTimezone });
    const newDate = new Date(dateString);
    return new Date(newDate.toLocaleString('en-US', { timeZone: toTimezone }));
  } catch {
    return date;
  }
};

// Date difference calculation
export const calculateDateDifference = (date1: Date, date2: Date): { days: number; hours: number; minutes: number; seconds: number; totalSeconds: number } => {
  const diffMs = Math.abs(date2.getTime() - date1.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return { days, hours, minutes, seconds, totalSeconds };
};

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
};

// Download file
export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain'): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generate random token
export const generateRandomToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const crypto = window.crypto || (window as any).msCrypto;

  if (crypto && crypto.getRandomValues) {
    const values = new Uint32Array(length);
    crypto.getRandomValues(values);
    for (let i = 0; i < length; i++) {
      token += chars[values[i] % chars.length];
    }
  } else {
    for (let i = 0; i < length; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  return token;
};

// Generate Lorem Ipsum
export const generateLoremIpsum = (paragraphs: number = 1, sentencesPerParagraph: number = 5): string => {
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const sentences = lorem.split('. ').filter(s => s.length > 0);
  const result: string[] = [];

  for (let p = 0; p < paragraphs; p++) {
    const paragraphSentences = [];
    for (let s = 0; s < sentencesPerParagraph; s++) {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      paragraphSentences.push(sentences[randomIndex]);
    }
    result.push(paragraphSentences.join('. ') + '.');
  }

  return result.join('\n\n');
};

// Format date for display
export const formatDate = (date: Date, includeTime: boolean = true): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }

  return date.toLocaleDateString('en-US', options);
};

// Sanitize HTML (basic)
export const sanitizeHTML = (html: string): string => {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, (tag) => {
      const allowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      const tagName = tag.match(/^<(\w+)/)?.[1] || '';
      if (allowedTags.includes(tagName)) {
        return tag.replace(/javascript:/gi, '');
      }
      return '';
    });
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Sleep function
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Generate slug from text
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Check if value is empty
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

// Format number with commas
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Get ordinal suffix
export const getOrdinalSuffix = (num: number): string => {
  const j = num % 10, k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
};
