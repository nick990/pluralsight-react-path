import { Header, Main } from "./components/layout";
import { TicketForm } from './components/TicketForm';
import { TicketDisplay } from './components/TicketDisplay';
import { TicketList } from './components/TicketList';
import { useTicketDb } from './hooks/useTicketDb';
import { useTicketContext } from './TicketContext';

export const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const product = urlParams.get("product");
  const { addTicket } = useTicketDb();
  const { setIsCreating, selectedTicket, setSelectedTicket } = useTicketContext();
  
  const handleTicketCreated = async (ticket) => {
    setIsCreating(true);
    await addTicket(ticket);
    setIsCreating(false);
    setSelectedTicket(ticket);
  };
  
  return (
    <div>
      <Header />
      <Main>
        <TicketForm defaultProduct={product} onTicketCreated={handleTicketCreated} />
        <TicketList />
        {selectedTicket ? <TicketDisplay
          summary={selectedTicket.summary}
          body={selectedTicket.body}
          product={selectedTicket.product}
        /> : null}
      </Main>
    </div>
  )
};
