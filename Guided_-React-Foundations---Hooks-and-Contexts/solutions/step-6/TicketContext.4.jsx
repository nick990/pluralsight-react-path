import { createContext, useContext, useState } from "react";

const TicketContext = createContext({
  isCreating: false,
  selectedTicket: null
});

export function TicketProvider({ children }) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const contextValue = {
    isCreating,
    setIsCreating,
    selectedTicket,
    setSelectedTicket
  };
	
  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  )
}

export function useTicketContext() {
  return useContext(TicketContext);
}
