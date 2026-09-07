import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'

export default function MyListings() {
  const { myListings, deleteProduct } = useProducts()

  if (myListings.length === 0) {
    return (
      <div className="my-listings">
        <h1>My Listings</h1>
        <p>You haven't posted anything yet.</p>
        <Link to="/sell">Post your first listing</Link>
      </div>
    )
  }

  return (
    <div className="my-listings">
      <h1>My Listings</h1>

      {myListings.map((item) => (
        <div key={item.id} className="listing-row">
          <img src={item.image} alt={item.title} />
          <div>
            <h3>{item.title}</h3>
            <p>₦{item.price.toLocaleString()} — {item.category}</p>
          </div>
          <button onClick={() => deleteProduct(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}