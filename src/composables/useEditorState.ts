import { ref, computed } from 'vue';

const code = ref(`SUGOD
entero x = 42.
printa(x).
letra c = 'A'.
printa(c).
HUMAN
END`);

const currentFile = ref('sample.jafa');
const output = ref('');
const assembly = ref('');
const machineCode = ref('');

export function useEditorState() {
  return {
    code,
    currentFile,
    output,
    assembly,
    machineCode,
  };
}
