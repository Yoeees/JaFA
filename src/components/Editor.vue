<template>
  <div class="editor-wrapper">
    <div ref="editorContainer" class="editor-container" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as monaco from 'monaco-editor';
import { setupJafaLanguage } from '../utils/jafaSyntax';
import { EDITOR_OPTIONS, JAFA_DARK_THEME } from '../utils/monacoConfig';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits([
  'update:modelValue',
  'change',
  'mounted',
  'position-change',
]);

const editorContainer = ref();
let editor = null;

onMounted(() => {
  if (!editorContainer.value) return;

  setupJafaLanguage();
  monaco.editor.defineTheme('jafaDark', JAFA_DARK_THEME);

  editor = monaco.editor.create(editorContainer.value, {
    ...EDITOR_OPTIONS,
    value: props.modelValue,
    language: 'jafa',
    theme: 'jafaDark',
  });

  emit('mounted', editor);

  editor.onDidChangeModelContent(() => {
    if (!editor) return;
    const value = editor.getValue();
    emit('update:modelValue', value);
    emit('change', value);
  });

  editor.onDidChangeCursorPosition((e) => {
    if (!editor) return;
    const line = e.position.lineNumber;
    const column = e.position.column;
    const lines = editor.getModel()?.getLineCount() || 1;
    emit('position-change', { line, column, lines });
  });

  setupKeyboardShortcuts(editor);

  const handleResize = () => {
    editor?.layout();
  };
  window.addEventListener('resize', handleResize);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    editor?.dispose();
  });
});

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

const setupKeyboardShortcuts = (ed) => {
  ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    console.log('Ctrl+S pressed - save triggered by editor');
  });

  ed.addCommand(monaco.KeyCode.F5, () => {
    console.log('F5 pressed - run triggered by editor');
  });

  ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyN, () => {
    console.log('Ctrl+N pressed - new file triggered by editor');
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
