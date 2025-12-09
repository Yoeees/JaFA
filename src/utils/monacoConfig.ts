import * as monaco from 'monaco-editor';

export const JAFA_DARK_THEME: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: 'FF79C6', fontStyle: 'bold' },
    { token: 'keyword.operator', foreground: 'FF79C6' },
    { token: 'identifier', foreground: '8BE9FD' },
    { token: 'number', foreground: 'F1FA8C' },
    { token: 'string', foreground: 'F1FA8C' },
    { token: 'string.char', foreground: 'F1FA8C' },
    { token: 'comment', foreground: '6272A4', fontStyle: 'italic' },
    { token: 'delimiter', foreground: 'E6EDF3' },
    { token: 'delimiter.parenthesis', foreground: 'E6EDF3' },
  ],
  colors: {
    'editor.background': '#0d1117',
    'editor.foreground': '#e6edf3',
    'editor.lineNumbersBackground': '#0d1117',
    'editor.lineNumbersForeground': '#30363d',
    'editor.selectionBackground': '#388bfd40',
    'editor.selectionBorder': '#58a6ff',
    'editorCursor.foreground': '#58a6ff',
    'editorWhitespace.foreground': '#30363d',// omments
    'editor.findMatchBackground': '#a371f7',
    'editor.findMatchBorder': '#a371f7',
    'editor.findMatchHighlightBackground': '#a371f730',
  },
};

export const EDITOR_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
  fontSize: 14,
  fontFamily: '"JetBrains Mono", "Courier New", monospace',
  fontLigatures: true,
  minimap: { enabled: false },
  wordWrap: 'off',
  automaticLayout: true,
  tabSize: 2,
  insertSpaces: true,
  lineNumbers: 'on',
  folding: true,
  bracketPairColorization: { enabled: true },
  'bracketPairColorization.independentColorPoolPerBracketType': true,
  scrollBeyondLastLine: false,
  renderLineHighlight: 'gutter',
  smoothScrolling: true,
  cursorBlinking: 'blink',
};
