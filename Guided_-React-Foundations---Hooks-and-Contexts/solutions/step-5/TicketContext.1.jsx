import { createContext, useState } from "react";

const TicketContext = createContext({
  isCreating: false
});

export function TicketProvider({ children }) {
  const [isCreating, setIsCreating] = useState(false);
  const contextValue = {
    isCreating,
    setIsCreating
  };
	
  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  )
}
