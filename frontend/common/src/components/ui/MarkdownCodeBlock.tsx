// In frontend/common/src/components/ui/MarkdownCodeBlock.tsx
import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

[
  ['bash', bash],
  ['c', c],
  ['cpp', cpp],
  ['csharp', csharp],
  ['css', css],
  ['diff', diff],
  ['go', go],
  ['java', java],
  ['javascript', javascript],
  ['json', json],
  ['jsx', jsx],
  ['markdown', markdown],
  ['markup', markup],
  ['python', python],
  ['rust', rust],
  ['sql', sql],
  ['tsx', tsx],
  ['typescript', typescript],
  ['yaml', yaml],
].forEach(([name, language]) => {
  SyntaxHighlighter.registerLanguage(name as string, language);
});

export const MarkdownCodeBlock: React.FC<any> = ({ node, inline, className, children, ...props }) => {
  // 1. Robustly extract the code string
  let codeString = '';
  if (Array.isArray(children)) {
    codeString = children.join(''); // Join array elements
  } else if (typeof children === 'string') {
    codeString = children; // Use string directly
  } else if (children) {
    // Fallback for unexpected types, attempt string conversion
    codeString = String(children);
  } else {
      codeString = ''; // Handle null or undefined children
  }

  // 2. Clean up trailing newline, often added by markdown processors
  codeString = codeString.replace(/\n$/, '');

  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : undefined;

  // Check if node has properties indicating it's a code block (might depend on markdown processor)
  // Simple check: if it's not inline and has a language, treat as block
  const isCodeBlock = !inline && language;

  return isCodeBlock ? ( // Apply syntax highlighting only for non-inline blocks with a language
    <SyntaxHighlighter
      style={vscDarkPlus} // Use your theme
      language={language}
      PreTag="div" // Use div for block display
      {...props} // Pass down other props
    >
      {codeString}
    </SyntaxHighlighter>
  ) : (
    // For inline code or blocks without a specific language, render a simple <code> tag
    <code className={className} {...props}> {/* Pass down className and other props */}
      {codeString} {/* Use the processed string */}
    </code>
  );
};
