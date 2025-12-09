
<template>
  <header class="header">
    <div class="header-left">
      <h1 class="title">{{ currentFile || 'untitled.jafa' }}</h1>
      <span class="separator">—</span>
      <span class="subtitle">JaFA IDE</span>
    </div>
    
    <div class="header-right">
      <span class="position" :title="`Cursor position: ${position}`">{{ position }}</span>
      
      <div class="button-group">
        <button
          class="btn btn-save"
          @click="$emit('save')"
          title="Save (Ctrl+S)"
        >
          💾 Save
        </button>
        
        <button
          class="btn btn-run"
          @click="$emit('run')"
          :disabled="running"
          title="Run (F5)"
        >
          {{ running ? '⏳ Running...' : '▶ Run' }}
        </button>
        
      <button class="btn btn-new" @click="$emit('new-file')" title="New file (Ctrl+N)">
        ✚ New
      </button>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  currentFile: String,
  position: String,
  running: Boolean,
});

defineEmits([
  'save',
  'run',
  'new-file',
]);
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: var(--header-bg);
  border-bottom: 1px solid var(--border);
  height: 50px;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.separator {
  color: var(--fg-muted);
  font-weight: 300;
}

.subtitle {
  font-size: 12px;
  color: var(--fg-muted);
  white-space: nowrap;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.position {
  font-size: 11px;
  color: var(--fg-muted);
  font-family: var(--font-mono);
}

.button-group {
  display: flex;
  gap: 8px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--btn-bg);
  color: var(--btn-fg);
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn:hover:not(:disabled) {
  background: var(--btn-hover);
  border-color: var(--accent);
}

.btn:active:not(:disabled) {
  transform: scale(0.98);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-run {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  font-weight: 600;
}

.btn-run:hover:not(:disabled) {
  background: #4a9eff;
  box-shadow: 0 0 12px rgba(88, 166, 255, 0.3);
}

.btn-save,
.btn-new {
  background: var(--btn-secondary-bg);
  color: var(--fg);
}

.btn-save:hover,
.btn-new:hover {
  background: var(--btn-secondary-hover);
}

@media (max-width: 900px) {
  .subtitle {
    display: none;
  }

  .btn {
    padding: 6px 8px;
    font-size: 11px;
  }
}
</style>
