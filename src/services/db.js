// src/services/db.js
import { encryptObject, decryptObject } from "./crypto";

const DB_NAME = "offline-app";
const STORE_NAME = "profiles";

export function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveProfile(profile) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    // Шифруем перед записью
    const encrypted = encryptObject(profile);

    store.put({ id: profile.id, data: encrypted });

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadProfile(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const request = store.get(id);

    request.onsuccess = () => {
      const record = request.result;
      if (!record) return resolve(null);

      // Расшифровываем после чтения
      const profile = decryptObject(record.data);
      resolve(profile);
    };

    request.onerror = () => reject(request.error);
  });
}
