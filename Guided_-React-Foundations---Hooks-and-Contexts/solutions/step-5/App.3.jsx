import { useState, useEffect } from "react";
import { Header, Main } from "./components/layout";
import { TicketForm } from './components/TicketForm';
import { TicketDisplay } from './components/TicketDisplay';
import { useTicketDb } from './hooks/useTicketDb';
import { useTicketContext } from './TicketContext';

export const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const product = urlParams.get("product");
  const { addTicket } = useTicketDb();
  
  const [createdTicket, setCreatedTicket] = useState();
  const { isCreating, setIsCreating } = useTicketContext();
  
  const handleTicketCreated = async (ticket) => {
    setIsCreating(true);
    await addTicket(ticket);
    setIsCreating(false);
    setCreatedTicket(ticket);
  };
  
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
