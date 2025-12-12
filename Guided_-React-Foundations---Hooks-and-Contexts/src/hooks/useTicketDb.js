import { useState, useEffect } from "react";
import { wrap } from "idb";
import { openDB } from "idb";

export function useTicketDb() {
  const [db, setDb] = useState();

  useEffect(() => {
    openDB("GlobomanticsHelpDesk", 2, {
      upgrade(db) {
        db.createObjectStore("tickets", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    }).then(
      (result) => {
        console.info("Successfully connected to IndexedDB", result);
        setDb(result);
      },
      (err) => {
        console.error("Failed to connect to IndexedDB", err);
      }
    );
  }, []);

  return {
    db,
    async addTicket(ticket) {
      const idb = wrap(db);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return idb.add("tickets", ticket);
    },
    updateTicket(ticket) {
      const idb = wrap(db);
      return idb.put("tickets", ticket);
    },
    getTicket(id) {
      if (!db) return Promise.resolve(null);
      const idb = wrap(db);
      return idb.get("tickets", id);
    },
    getAllTickets() {
      if (!db) return Promise.resolve([]);
      const idb = wrap(db);
      return idb.getAll("tickets");
    },
  };
}
