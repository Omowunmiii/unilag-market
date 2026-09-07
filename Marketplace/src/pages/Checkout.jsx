import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [form, setForm] = useState({ name: '', room: '', phone: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="checkout">
        <h1>Order Placed! 🎉</h1>
        <p>Thanks, {form.name}. Your order is on its way.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return <h1>Your cart is empty.</h1>
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        {cartItems.map((item) => (
          <p key={item.id}>{item.title} × {item.quantity} — ₦{(item.price * item.quantity).toLocaleString()}</p>
        ))}
        <h2>Total: ₦{cartTotal.toLocaleString()}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="room"
          placeholder="Hostel / Room No."
          value={form.room}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Place Order (Mock)</button>
      </form>
    </div>
  )
}