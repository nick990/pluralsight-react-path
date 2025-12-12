import { useEffect, useState } from "react";
import { useTicketDb } from "../hooks/useTicketDb";
import { useTicketContext } from "../TicketContext";

export const TicketList = () => {
  const { db, getAllTickets, getTicket } = useTicketDb();
  const [tickets, setTickets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { isCreating, setSelectedTicket } = useTicketContext();

  useEffect(() => {
    setIsFetching(true);
    if (!db) return;
    getAllTickets().then(
      (result) => {
        setIsFetching(false);
        setTickets(result);
      },
      (err) => {
        setIsFetching(false);
        console.error("Could not fetch tickets: ", err);
      }
    );
  }, [db, isCreating]);

  const handleTicketSelected = async (id) => {
    const ticket = await getTicket(id);
    setSelectedTicket(ticket);
  };

  if (isFetching) {
    return (
      <div className="ticket-list">
        <h2>All Tickets</h2>
        <h3>Loading ticket list...</h3>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="ticket-list">
        <h2>All Tickets</h2>
        <h3>No tickets created yet. Use the form to submit one.</h3>
      </div>
    );
  }

  return (
    <div className="ticket-list">
      <h2>All Tickets</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Summary</th>
            <th>Affected Product</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketListItem
              key={ticket.id}
              onTicketSelected={handleTicketSelected}
              {...ticket}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TicketListItem = ({ id, summary, product, onTicketSelected }) => (
  <tr>
    <td width={25}>{id}</td>
    <td>
      <button onClick={(e) => onTicketSelected(id)}>
        <strong>{summary}</strong>
      </button>
    </td>
    <td>{product}</td>
  </tr>
);
