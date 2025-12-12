import { useState, useEffect } from "react";
import { openDB, wrap } from "idb";

export function useTicketDb() {
  const [db, setDb] = useState();

  useEffect(() => {
    openDB("GlobomanticsHelpDesk", 2, {
      upgrade(db) {
        db.createObjectStore("tickets", {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
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
      await new Promise(resolve => setTimeout(resolve, 5000));
      return idb.add("tickets", ticket);
    },
    updateTicket(ticket) {
      const idb = wrap(db);
      return idb.put("tickets", ticket);
    },
    getTicket(id) {
      const idb = wrap(db);
      return idb.get("tickets", id);
    },
    getAllTickets() {
      const idb = wrap(db);
      return idb.getAll("tickets");
    }
  }
}
