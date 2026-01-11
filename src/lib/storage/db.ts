import { openDB } from "idb";

const DB_NAME = "resume_builder";
const STORE_NAME = "profiles";
const DB_VERSION = 1;

export function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "profileId" });
      }
    },
  });
}

export const dbConfig = {
  DB_NAME,
  STORE_NAME,
  DB_VERSION,
};
