<template>
  <div class="output-panel">
    <div class="panel-header">
      <div class="tab-bar">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="$emit('tabChange', tab.id)"
        >
          {{ tab.label }}
          <span v-if="tab.id === 'output'" class="tab-badge">{{ outputLines }}</span>
        </button>
      </div>
      
      <div class="panel-actions">
        <button class="icon-btn" @click="$emit('clear')" title="Clear output">
          🗑
        </button>
      </div>
    </div>
    
    <div class="panel-content-wrapper">
      <pre
        v-show="activeTab === 'output'"
        class="panel-content output"
        :class="{ loading }"
      >{{ loading ? 'Running JaFA compiler...' : output }}</pre>
      
      <pre
        v-show="activeTab === 'assembly'"
        class="panel-content assembly"
        :class="{ loading }"
      >{{ loading ? 'Generating MIPS assembly...' : assembly }}</pre>
      
      <pre
        v-show="activeTab === 'machine'"
        class="panel-content machine"
        :class="{ loading }"
      >{{ loading ? 'Generating machine code...' : machineCode }}</pre>
    </div>
    
    <div class="panel-resize-handle" @mousedown="startResize" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  output: String,
  assembly: String,
  machineCode: String,
  activeTab: String,
  loading: Boolean,
});

const emit = defineEmits([
  'tab-change',
  'clear',
]);

const tabs = [
  { id: 'output', label: 'OUTPUT' },
  { id: 'assembly', label: 'ASSEMBLY (MIPS)' },
  { id: 'machine', label: 'MACHINE CODE' },
];

const outputLines = ref(0);

const startResize = (e) => {
  const startY = e.clientY;
  const panel = e.target.parentElement;
  const startHeight = panel?.offsetHeight || 0;

  const onMouseMove = (moveEvent) => {
    const delta = moveEvent.clientY - startY;
    const newHeight = Math.max(100, startHeight - delta);
    if (panel) {
      panel.style.height = `${newHeight}px`;
    }
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
</script>

<style scoped>
.output-panel {
  height: 25vh;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  background: var(--panel-bg);
  position: relative;
  resize: vertical;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background: var(--header-bg);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.tab-bar {
  display: flex;
  gap: 0;
  flex: 1;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--fg-muted);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.tab-btn:hover {
  color: var(--fg);
  background: var(--hover-bg);
}

.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.tab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: var(--accent);
  color: white;
  border-radius: 2px;
  font-size: 10px;
  font-weight: 600;
}

.panel-actions {
  display: flex;
  gap: 4px;
  padding: 0 8px;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  color: var(--fg-muted);
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: var(--hover-bg);
  color: var(--fg);
}

.panel-content-wrapper {
  flex: 1;
  overflow: hidden;
  display: flex;
}

.panel-content {
  flex: 1;
  margin: 0;
  padding: 12px 16px;
  overflow-y: auto;
  overflow-x: auto;
  white-space: pre;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.5;
  color: var(--fg);
}

.output {
  color: #a5d6ff;
}

.assembly {
  color: #7ee787;
}

.machine {
  color: #f85149;
}

.loading {
  color: var(--fg-muted);
  font-style: italic;
}

.panel-resize-handle {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  cursor: row-resize;
  background: transparent;
  transition: background 0.2s;
}

.panel-resize-handle:hover {
  background: var(--accent);
}

.panel-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.panel-content::-webkit-scrollbar-track {
  background: transparent;
}

.panel-content::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: var(--fg-muted);
}
</style>
