import { useProducts } from '../context/ProductsContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { products } = useProducts()
  const { wishlist } = useWishlist()

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id))

  return (
    <div className="home">
      <h1>My Wishlist</h1>

      {wishlistedProducts.length === 0 ? (
        <p className="no-results">You haven't saved anything yet.</p>
      ) : (
        <div className="product-grid">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}