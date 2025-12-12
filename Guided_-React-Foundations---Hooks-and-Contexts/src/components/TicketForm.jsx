import { useState } from "react";
import { FormGroup } from './layout';

export const ProductField = ({ defaultProduct }) => {
  const products = [
    "GloboCMS", 
    "GloboFinance+", 
    "GloboHR", 
    "GloboIT Portal"
  ];

  const matchingProduct = products.find(p => p == defaultProduct);
  const [product, setProduct] = useState(matchingProduct);
  
  return (
    <FormGroup>
      <label htmlFor="product">Product:</label>
      <select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
        {products.map(name => (
          <option key={name}>{name}</option>
        ))}
      </select>
    </FormGroup>
  )
}

export const TicketForm = ({ defaultProduct, onTicketCreated }) => {
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const ticketData = {
      summary: formData.get("summary"),
      body: formData.get("body"),
      product: formData.get("product")
    };
  
    form.reset();
  
    onTicketCreated(ticketData);
  };
  
  return (
    <section className="ticket-form">
      <h2>Create a Ticket</h2>
      
      <form onSubmit={handleFormSubmit} name="create-ticket" action="/" method="post">

        <FormGroup>
          <label htmlFor="summary">Summary:</label>
          <input name="summary" id="summary" type="text" />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="body">What do you need help with?</label>
          <textarea name="body" id="body" rows="9"></textarea>
        </FormGroup>     
        
        <ProductField defaultProduct={defaultProduct} />

        <p>
          <button type="submit">Create ticket</button>
        </p>
      </form>
    </section>
  )
}
