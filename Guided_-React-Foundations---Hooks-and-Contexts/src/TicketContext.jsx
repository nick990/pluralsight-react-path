import { createContext, useState } from "react";
import { useContext } from "react";

export const TicketContext = createContext({
  isCreating: false,
});

export const useTicketContext = () => {
  return useContext(TicketContext);
};

export function TicketProvider({ children }) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const contextValue = {
    isCreating,
    setIsCreating,
    selectedTicket,
    setSelectedTicket,
  };
  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  );
}
