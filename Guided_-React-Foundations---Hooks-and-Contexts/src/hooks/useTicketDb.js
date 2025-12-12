import { useState, useEffect } from "react";
import { wrap } from "idb";

export function useTicketDb() {

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
      if (!db) return Promise.resolve(null);
      const idb = wrap(db);
      return idb.get("tickets", id);
    },
    getAllTickets() {
      if (!db) return Promise.resolve([]);
      const idb = wrap(db);
      return idb.getAll("tickets");
    }
  }
}
