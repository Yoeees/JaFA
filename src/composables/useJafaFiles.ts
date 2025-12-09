import { ref } from 'vue';

interface JafaFile {
  name: string;
  type: string;
}

const files = ref<JafaFile[]>([
  { name: 'sample.jafa', type: '(code)' },
  { name: 'JaFA.L', type: '(lexer)' },
  { name: 'JaFA.y', type: '(parser)' },
  { name: 'semantics.c', type: '(semantics)' },
  { name: 'ast.c', type: '(ast)' },
  { name: 'jafa_compiler.c', type: '(compiler)' },
  { name: 'assembly.c', type: '(mips)' },
  { name: 'MIPS.txt', type: '(ref)' },
]);

export function useJafaFiles() {
  const loadFile = async (fileName: string) => {
    try {
      // Call Electron IPC
      const content = await window.api.invoke('read-file', { fileName });
      // Update editor state (handled by App)
      return content;
    } catch (error) {
      console.error('Failed to load file:', error);
      throw error;
    }
  };

  const saveFile = async (fileName: string, content: string) => {
    try {
      await window.api.invoke('write-file', { fileName, content });
      console.log('File saved:', fileName);
    } catch (error) {
      console.error('Failed to save file:', error);
      throw error;
    }
  };

  return {
    files,
    loadFile,
    saveFile,
  };
}
