import { useState } from "react";
import { Header, Main } from "./components/layout";
import { TicketForm } from './components/TicketForm';
import { TicketDisplay } from './components/TicketDisplay';
import { useTicketDb } from './hooks/useTicketDb';

export const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const product = urlParams.get("product");
  const { addTicket } = useTicketDb();
  
  const [createdTicket, setCreatedTicket] = useState();
  const handleTicketCreated = async (ticket) => {
    await addTicket(ticket);
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
