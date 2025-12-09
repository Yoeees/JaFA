<template>
  <div class="editor-wrapper">
    <div ref="editorContainer" class="editor-container" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as monaco from 'monaco-editor';
import { setupJafaLanguage } from '../utils/jafaSyntax';
import { EDITOR_OPTIONS, JAFA_DARK_THEME } from '../utils/monacoConfig';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [value: string];
  mounted: [editor: monaco.editor.IStandaloneCodeEditor];
  'position-change': [pos: { line: number; column: number; lines: number }];
}>();

const editorContainer = ref<HTMLDivElement>();
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

onMounted(() => {
  if (!editorContainer.value) return;

  // Setup JaFA language (must be done before creating editor)
  setupJafaLanguage();

  // Define theme
  monaco.editor.defineTheme('jafaDark', JAFA_DARK_THEME);

  // Create editor instance
  editor = monaco.editor.create(editorContainer.value, {
    ...EDITOR_OPTIONS,
    value: props.modelValue,
    language: 'jafa',
    theme: 'jafaDark',
  });

  // Emit mounted event
  emit('mounted', editor);

  // Track content changes
  editor.onDidChangeModelContent(() => {
    if (!editor) return;
    const value = editor.getValue();
    emit('update:modelValue', value);
    emit('change', value);
  });

  // Track cursor position
  editor.onDidChangeCursorPosition((e) => {
    if (!editor) return;
    const line = e.position.lineNumber;
    const column = e.position.column;
    const lines = editor.getModel()?.getLineCount() || 1;
    emit('position-change', { line, column, lines });
  });

  // Setup keyboard shortcuts
  setupKeyboardShortcuts(editor);

  // Handle window resize
  const handleResize = () => {
    editor?.layout();
  };
  window.addEventListener('resize', handleResize);

  // Cleanup on unmount
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    editor?.dispose();
  });
});

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor && editor.getValue() !== newValue) {
      const position = editor.getPosition();
      editor.setValue(newValue);
      if (position) {
        editor.setPosition(position);
      }
    }
  }
);

// Setup keyboard shortcuts
const setupKeyboardShortcuts = (ed: monaco.editor.IStandaloneCodeEditor) => {
  // Ctrl+S: Save (will be handled by parent)
  ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    console.log('Ctrl+S pressed - save triggered by editor');
    // Parent component will handle via @save event
  });

  // F5: Run (will be handled by parent)
  ed.addCommand(monaco.KeyCode.F5, () => {
    console.log('F5 pressed - run triggered by editor');
    // Parent component will handle via @run event
  });

  // Ctrl+N: New File (will be handled by parent)
  ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyN, (e) => {
    console.log('Ctrl+N pressed - new file triggered by editor');
    // Parent component will handle via @new-file event
  });
};

onBeforeUnmount(() => {
  editor?.dispose();
});
</script>

<style scoped>
.editor-wrapper {
  flex: 1;
  display: flex;
  overflow: hidden;
  background: var(--editor-bg);
}

.editor-container {
  width: 100%;
  height: 100%;
  background: var(--editor-bg);
}
</style>
