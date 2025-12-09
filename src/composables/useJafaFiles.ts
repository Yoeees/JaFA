// src/composables/useJafaFiles.ts
import { ref } from 'vue';
import localforage from 'localforage';

const files = ref<{ name: string; type: string }[]>([]);
const STORAGE_KEY = 'jafa_files';

localforage.config({ name: 'JaFA_IDE', storeName: 'files' });

export function useJafaFiles() {
  // Load file list from storage (must be called!)
  const loadFilesList = async () => {
    const stored = (await localforage.getItem(STORAGE_KEY)) as any[] | null;
    if (stored && stored.length > 0) {
      files.value = stored;
    } else {
      // First time — create default file
      await saveFile('sample.jafa', `SUGOD
// Welcome to JaFA!
// Try editing me
HUMAN`);
      files.value = [{ name: 'sample.jafa', type: '(code)' }];
      await localforage.setItem(STORAGE_KEY, files.value);
    }
  };

  const loadFile = async (fileName: string): Promise<string> => {
    const content = await localforage.getItem(`content_${fileName}`);
    return content ? String(content) : '';
  };

  const saveFile = async (fileName: string, content: string) => {
    await localforage.setItem(`content_${fileName}`, content);

    const exists = files.value.some(f => f.name === fileName);
    if (!exists) {
      files.value.push({ name: fileName, type: '(code)' });
      await localforage.setItem(STORAGE_KEY, files.value); // ← This saves the list!
    }
  };

  const createNewFile = async (fileName?: string) => {
    const name = fileName || `untitled_${Date.now()}.jafa`;
    await saveFile(name, `SUGOD\n// ${name}\nHUMAN\n`);
    return name;
  };

  // CRITICAL: Call it immediately and don't ignore the promise
  loadFilesList(); // ← This now runs and populates files.value correctly

  return {
    files: files, // ← reactive list
    loadFile,
    saveFile,
    createNewFile,
  };
}
