import { useState, useEffect } from "react";
import { Header, Main } from "./components/layout";
import { TicketForm } from './components/TicketForm';
import { TicketDisplay } from './components/TicketDisplay';

export const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const product = urlParams.get("product");
  
  const [createdTicket, setCreatedTicket] = useState();
  const handleTicketCreated = (ticket) => {
    setCreatedTicket(ticket);
  };

  useEffect(() => {
    const request = window.indexedDB.open("GlobomanticsHelpDesk", 1);

    request.onerror = (e) => {
      console.error("Failed to connect to IndexedDB", e.target.errorCode);
    };

    request.onsuccess = (e) => {
      console.info("Successfully connected to IndexedDB", e.target.result);
    };
  }, []);
  
  return (
    <div>
      <Header />
      <Main>
        <TicketForm defaultProduct={product} onTicketCreated={handleTicketCreated} />
        {createdTicket ? <TicketDisplay
          summary={createdTicket.summary}
          body={createdTicket.body}
          product={createdTicket.product}
        /> : null}
      </Main>
    </div>
  )
};
