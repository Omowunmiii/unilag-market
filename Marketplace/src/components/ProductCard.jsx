import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product }) {
  const { currentUser } = useAuth()
  const { isWishlisted, toggleWishlist } = useWishlist()

  function handleWishlistClick(e) {
    e.preventDefault() // stop the card's Link from navigating
    toggleWishlist(product.id)
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {currentUser && (
        <button
          className={`wishlist-btn ${isWishlisted(product.id) ? 'active' : ''}`}
          onClick={handleWishlistClick}
        >
          ♥
        </button>
      )}

      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">₦{product.price.toLocaleString()}</p>
      <p className="seller">{product.seller}</p>
      {!product.inStock && <p className="out-of-stock">Out of stock</p>}
    </Link>
  )
}