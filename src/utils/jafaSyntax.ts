import * as monaco from 'monaco-editor';

export function setupJafaLanguage() {
  // Register the language
  monaco.languages.register({ id: 'jafa' });

  // Set Monarch tokenizer (cleaner than custom tokenizer)
  monaco.languages.setMonarchTokensProvider('jafa', {
    tokenizer: {
      root: [
        // Whitespace (ignored)
        [/[ \t\r\n]+/, 'white'],

        // Keywords from your lexer
        [/\b(SUGOD|HUMAN|END|entero|letra|printa|si|sino|mientras|para)\b/, 'keyword'],

        // Compound assignment operators
        [/(addset|subset|mulset|divset)/, 'keyword.operator'],

        // Comments
        [/\/\/.*$/, 'comment'],
        [/\/\*/, 'comment', '@comment'],

        // String literals (double quotes)
        [/"[^"]*"/, 'string'],

        // Character literals (single quotes with single letter)
        [/'[A-Za-z]'/, 'string.char'],

        // Numbers (integers and floats)
        [/\d+(\.\d+)?/, 'number'],

        // Identifiers
        [/[A-Za-z_]\w*/, 'identifier'],

        // Operators
        [/[+\-*/=]/, 'operator'],

        // Delimiters
        [/[()[\]{}]/, 'delimiter'],
        [/[;.]/, 'delimiter'],

        // Comma
        [/,/, 'delimiter'],

        // Catch-all error
        [/./, 'error'],
      ],

      comment: [
        [/[^/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[/*]/, 'comment'],
      ],
    },
  });

  // Register autocomplete provider
  monaco.languages.registerCompletionItemProvider('jafa', {
    provideCompletionItems: (model, position) => {
      const suggestions: monaco.languages.CompletionItem[] = [
        {
          label: 'SUGOD',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'SUGOD',
          documentation: 'Start of JaFA program',
        },
        {
          label: 'HUMAN',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'HUMAN',
          documentation: 'Human-readable section',
        },
        {
          label: 'END',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'END',
          documentation: 'End of program',
        },
        {
          label: 'entero',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'entero ${1:name} = ${2:value}.',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Declare integer variable',
        },
        {
          label: 'letra',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'letra ${1:name} = ${2:value}.',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Declare character variable',
        },
        {
          label: 'printa',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'printa(${1:value}).',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Print value to output',
        },
        {
          label: 'si',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'si (${1:condition}) {\n  ${2:body}\n}.',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'If statement',
        },
        {
          label: 'sino',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'sino {\n  ${1:body}\n}.',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Else statement',
        },
        {
          label: 'mientras',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'mientras (${1:condition}) {\n  ${2:body}\n}.',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'While loop',
        },
      ];

      return { suggestions };
    },
  });

  // Optional: Register hover provider for documentation
  monaco.languages.registerHoverProvider('jafa', {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      const keywords: Record<string, string> = {
        SUGOD: 'Program start marker',
        HUMAN: 'Human-readable section marker',
        END: 'Program end marker',
        entero: 'Integer variable declaration',
        letra: 'Character variable declaration',
        printa: 'Print statement',
        si: 'Conditional if statement',
        sino: 'Conditional else statement',
        mientras: 'While loop',
        para: 'For loop',
      };

      if (word && keywords[word.word]) {
        return {
          contents: [{ value: keywords[word.word] }],
        };
      }

      return null;
    },
  });
}
