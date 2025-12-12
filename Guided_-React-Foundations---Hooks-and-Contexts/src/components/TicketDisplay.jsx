export const TicketDisplay = ({ summary, body, product }) => {
  return (
    <div className="ticket-display">
      <h3>Ticket: {summary}</h3>
      <h4>Product: {product}</h4>
      <h4>Additional Details:</h4>
      <div className="ticket-body">
        {body}
      </div>
    </div>
  )
}
