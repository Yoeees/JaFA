<template>
  <div class="sidebar" :class="{ collapsed }">
    <div class="sidebar-header">
      <h2 v-if="!collapsed" class="header-title">EXPLORER</h2>
      <button class="toggle-btn" @click="$emit('toggleSidebar')" title="Toggle sidebar">
        ☰
      </button>
    </div>
    
    <div class="file-tree">
      <ul>
        <li
          v-for="file in files"
          :key="file.name"
          :class="{ active: currentFile === file.name }"
          @click="$emit('loadFile', file.name)"
          class="file-item"
          :title="file.name"
        >
          <span class="file-icon">📄</span>
          <span v-if="!collapsed" class="file-label">
            {{ file.name }}
            <span class="file-type">{{ file.type }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  files: Array,
  currentFile: String,
  collapsed: Boolean,
});

defineEmits([
  'toggle-sidebar',
  'load-file',
]);
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  gap: 8px;
}

.header-title {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--accent);
  text-transform: uppercase;
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  color: var(--fg);
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background: var(--hover-bg);
}

.file-tree {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.file-tree ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: background 0.15s;
}

.file-item:hover {
  background: var(--hover-bg);
}

.file-item.active {
  background: var(--accent);
  background-color: rgba(88, 166, 255, 0.15);
  border-left-color: var(--accent);
  color: var(--accent);
}

.file-icon {
  flex-shrink: 0;
}

.file-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.file-type {
  font-size: 11px;
  color: var(--fg-muted);
  font-weight: 400;
}

.file-tree::-webkit-scrollbar {
  width: 8px;
}

.file-tree::-webkit-scrollbar-track {
  background: transparent;
}

.file-tree::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.file-tree::-webkit-scrollbar-thumb:hover {
  background: var(--fg-muted);
}

@media (max-width: 800px) {
  .sidebar {
    width: 0;
    border-right: none;
  }

  .sidebar:not(.collapsed) {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 10;
  }
}

</style>
