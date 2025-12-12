import { createRoot } from "react-dom/client";
import { App } from "./App";
import { TicketProvider } from "./TicketContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <TicketProvider>
    <App />
  </TicketProvider>
);
