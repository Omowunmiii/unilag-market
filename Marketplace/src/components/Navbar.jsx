import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { cartCount } = useCart()
  const { currentUser } = useAuth()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">UnilagMarket</Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {currentUser && (
          <>
            <Link to="/sell">Sell</Link>
            <Link to="/my-listings">My Listings</Link>
          </>
        )}

        <Link to="/cart">Cart ({cartCount})</Link>

        {currentUser ? (
          <>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/profile" className="navbar-avatar">
              {currentUser.name.charAt(0).toUpperCase()}
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}