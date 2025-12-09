<template>
  <div class="jafa-ide">
    <Sidebar
      :files="files"
      :current-file="currentFile"
      :collapsed="sidebarCollapsed"
      @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed"
      @load-file="handleLoadFile"
    />

    <div class="main-content">
      <HeaderBar
        :current-file="currentFile"
        :position="position"
        :running="running"
        @run="handleRun"
        @new-file="handleNewFile"
        @save="handleSave"
      />

      <Editor
        v-model="code"
        @change="onCodeChange"
        @mounted="onEditorMount"
        @position-change="updatePosition"
      />

      <OutputTabs
        :output="output"
        :assembly="assembly"
        :machine-code="machineCode"
        :active-tab="activeTab"
        :loading="running"
        @tab-change="activeTab = $event"
        @clear="clearOutput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Sidebar from './Sidebar.vue';
import HeaderBar from './HeaderBar.vue';
import Editor from './Editor.vue';
import OutputTabs from './OutputTabs.vue';
import { useJafaFiles } from '../composables/useJafaFiles';
import { useJafaRunner } from '../composables/useJafaRunner';
import { useEditorState } from '../composables/useEditorState';

// Get state from composables
const { code, currentFile, output, assembly, machineCode } = useEditorState();
const { files, loadFile, saveFile } = useJafaFiles();
const { runCompiler } = useJafaRunner();

// Local state
const sidebarCollapsed = ref(false);
const activeTab = ref('output');
const running = ref(false);
const position = ref('Ln 1, Col 1');

// Lifecycle
onMounted(async () => {
  // Load initial file
  try {
    const content = await loadFile('sample.jafa');
    code.value = content;
  } catch (error) {
    console.error('Failed to load initial file:', error);
  }
});

// Event handlers
const onEditorMount = (editor: any) => {
  console.log('Editor mounted successfully');
};

const onCodeChange = (value: string) => {
  code.value = value;
};

const updatePosition = (pos: { line: number; column: number; lines: number }) => {
  position.value = `Ln ${pos.line}, Col ${pos.column} (${pos.lines} lines)`;
};

const handleLoadFile = async (fileName: string) => {
  try {
    currentFile.value = fileName;
    const content = await loadFile(fileName);
    code.value = content;
  } catch (error) {
    console.error('Failed to load file:', error);
  }
};

const handleSave = async () => {
  try {
    await saveFile(currentFile.value, code.value);
    console.log('File saved:', currentFile.value);
  } catch (error) {
    console.error('Failed to save file:', error);
  }
};

const handleRun = async () => {
  running.value = true;
  try {
    const result = await runCompiler(code.value);
    output.value = result.output;
    assembly.value = result.assembly;
    machineCode.value = result.machineCode;
    activeTab.value = 'output';
  } catch (error) {
    output.value = `Error: ${error instanceof Error ? error.message : String(error)}`;
  } finally {
    running.value = false;
  }
};

const handleNewFile = () => {
  code.value = 'SUGOD\n// New JaFA file\nHUMAN\nEND';
  currentFile.value = 'untitled.jafa';
};

const clearOutput = () => {
  output.value = '';
  assembly.value = '';
  machineCode.value = '';
};
</script>

<style scoped>
.jafa-ide {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}
</style>
