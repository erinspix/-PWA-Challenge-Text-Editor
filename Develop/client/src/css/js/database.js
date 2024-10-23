import { openDB } from 'idb';

const initDatabase = async () => {
  // Spinning up the database like a boss
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('Database already set, let’s roll!');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Database created, we’re live!');
    },
  });
};

// Insert content into IndexedDB
export const insertContent = async (content) => {
  console.log('Adding content to IndexedDB...');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.add({ content });
  await tx.done;
};

// Fetch all content from IndexedDB
export const fetchContent = async () => {
  console.log('Fetching content from IndexedDB...');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allContent = await store.getAll();
  return allContent;
};

initDatabase();
