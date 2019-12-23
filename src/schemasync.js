import { openDB } from "idb";

export const SchemaSyncHandler = {
  sync() {
    openDB("VueApp", 1, upgradeDB => {
      console.log(upgradeDB);
      upgradeDB.createObjectStore("todos", { keyPath: "id" });
    });
  }
};
