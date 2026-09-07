import { useState } from 'react'
import { categories } from '../data/products'
import { useProducts } from '../context/ProductsContext'
import { useAuth } from '../context/AuthContext'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { products } = useProducts()
  const { currentUser } = useAuth()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="home">
      {currentUser && <p className="home-greeting">Hi, {currentUser.name.split(' ')[0]}</p>}
      

      <input
        type="text"
        className="search-bar"
        placeholder="Search for books, gadgets, food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === activeCategory ? 'active' : ''}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="no-results">No items match your search.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}