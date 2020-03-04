const dbName = 'posts-store';
const dbVersion = 1;

export function createDB(storeNames) {
  const dbPromise = indexedDB.open(dbName, dbVersion);

  dbPromise.onupgradeneeded = event => {
    const db = event.target.result;

    storeNames.forEach(store => {
      db.createObjectStore(store, { keyPath: 'name' });
    });
  };
}

export function addData(st, data) {
  return new Promise((resolve, reject) => {
    const dbPromise = indexedDB.open(dbName, dbVersion);

    dbPromise.onsuccess = event => {
      const db = event.target.result;
      const tx = db.transaction(st, 'readwrite');
      const store = tx.objectStore(st);
      const request = store.add(data);

      request.onsuccess = event => {
        resolve(event);
      };
    };
  });
}

export function readData(st) {
  return new Promise((resolve, reject) => {
    const dbPromise = indexedDB.open(dbName, dbVersion);

    dbPromise.onsuccess = event => {
      const db = event.target.result;
      const tx = db.transaction(st, 'readonly');
      const store = tx.objectStore(st);
      const request = store.getAll();

      request.onsuccess = event => {
        resolve(event.target.result);
      };
    };
  });
}

export function clearData(st) {
  return new Promise((resolve, reject) => {
    const dbPromise = indexedDB.open(dbName, dbVersion);

    dbPromise.onsuccess = event => {
      const db = event.target.result;
      const tx = db.transaction(st, 'readwrite');
      const store = tx.objectStore(st);
      const request = store.clear();

      request.onsuccess = event => {
        resolve(event);
      };
    };
  });
}
