import { useState, useEffect } from "react";
import { wrap } from "idb";

export function useTicketDb() {
  const [db, setDb] = useState();

  useEffect(() => {
    const request = window.indexedDB.open("GlobomanticsHelpDesk", 1);

    request.onerror = (e) => {
      console.error("Failed to connect to IndexedDB", e.target.errorCode);
    };

    request.onsuccess = (e) => {
      console.info("Successfully connected to IndexedDB", e.target.result);

      setDb(e.target.result);
    };
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
