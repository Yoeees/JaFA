// src/composables/useJafaFiles.ts
import { ref } from 'vue';
import localforage from 'localforage';

const files = ref<{ name: string; type: string }[]>([]);
const STORAGE_KEY = 'jafa_files'; // Prefix for localforage

// Initialize storage
localforage.config({ name: 'JaFA_IDE', storeName: 'files' });

export function useJafaFiles() {
  // Load all files from storage on init
  const loadFilesList = async () => {
    const storedFiles = await localforage.getItem(STORAGE_KEY) || [];
    files.value = storedFiles as { name: string; type: string }[];
    if (files.value.length === 0) {
      // Seed default sample if empty
      await saveFile('sample.jafa', `SUGOD\n// Default JaFA program\nHUMAN\nEND`);
      files.value = [{ name: 'sample.jafa', type: '(code)' }];
    }
  };

  // Load file content
  const loadFile = async (fileName: string) => {
    return (await localforage.getItem(`content_${fileName}`)) || '';
  };

  // Save file content + update list
  const saveFile = async (fileName: string, content: string) => {
    await localforage.setItem(`content_${fileName}`, content);
    
    // Update files list if new
    const exists = files.value.some(f => f.name === fileName);
    if (!exists) {
      files.value.push({ name: fileName, type: '(code)' });
    }
    
    // Save updated list
    await localforage.setItem(STORAGE_KEY, files.value);
  };

  // Create new file
  const createNewFile = async (fileName: string = `untitled_${Date.now()}.jafa`) => {
    await saveFile(fileName, `SUGOD\n// New JaFA file\nHUMAN\nEND`);
    return fileName;
  };

  // Init on load
  loadFilesList();

  return { files, loadFile, saveFile, createNewFile };
}
