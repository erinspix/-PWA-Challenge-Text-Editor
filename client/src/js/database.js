import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('adding content to the database');
  const db = await openDB('jate', 1);
  await db.add('jate', {content });
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('fetching content from the database');
  const db = await openDB('jate', 1);
  const allContent = await db.getAll('jate');
  return allContent;
};

initdb();