import { useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = products.find((p) => p.id === Number(id))
  const { products } = useProducts()

  if (!product) return <h1>Product not found</h1>

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p className="price">₦{product.price.toLocaleString()}</p>
      <p>{product.description}</p>
      <p>Seller: {product.seller}</p>

      {product.inStock ? (
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      ) : (
        <p className="out-of-stock">Out of stock</p>
      )}
    </div>
  )
}