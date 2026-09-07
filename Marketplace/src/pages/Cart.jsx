import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div className="cart">
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div>
            <h3>{item.title}</h3>
            <p>₦{item.price.toLocaleString()}</p>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            />

            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}

      <h2>Total: ₦{cartTotal.toLocaleString()}</h2>
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  )
}