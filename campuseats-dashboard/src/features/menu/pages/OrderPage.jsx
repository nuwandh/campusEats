import { useState } from "react";

function OrderPage() {
  const [form, setForm] = useState({ name: "", email: "", qty: 1 });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function validate(v) {
    const e = {};
    if (v.name.trim().length < 2) e.name = "Name too short";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) e.email = "Enter a valid email";
    if (Number(v.qty) < 1) e.qty = "Qty must be ≥ 1";
    return e;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setDone(true);
  }

  if (done) return <p>Thanks, {form.name}! Order received.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Place Your Order</h2>

      {/* 1. Name Section */}
      <div>
        <label htmlFor="name">Name: </label>
        <input 
          id="name"
          name="name" 
          placeholder="Enter your name"
          value={form.name} 
          onChange={handleChange} 
        />
        {errors.name && <span style={{ color: "red" }}> {errors.name}</span>}
      </div>

      <br />

      {/* 2. Email Section */}
      <div>
        <label htmlFor="email">Email: </label>
        <input 
          id="email"
          name="email" 
          placeholder="Enter your email"
          value={form.email} 
          onChange={handleChange} 
        />
        {errors.email && <span style={{ color: "red" }}> {errors.email}</span>}
      </div>

      <br />

      {/* 3. Quantity Section */}
      <div>
        <label htmlFor="qty">Quantity: </label>
        <input 
          id="qty"
          name="qty" 
          type="number" 
          value={form.qty} 
          onChange={handleChange} 
        />
        {errors.qty && <span style={{ color: "red" }}> {errors.qty}</span>}
      </div>

      <br />

      <button type="submit">Place order</button>
    </form>
  );
}

export default OrderPage;