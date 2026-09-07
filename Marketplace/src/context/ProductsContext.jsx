import { createContext, useContext, useState } from 'react'
import { products as initialProducts } from '../data/products'

const ProductsContext = createContext()

export const CURRENT_USER = 'You'

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(initialProducts)

  function addProduct(product) {
    const newProduct = {
      ...product,
      id: Date.now(), // simple unique id for now
      seller: CURRENT_USER,
      inStock: true,
    }
    setProducts((prev) => [newProduct, ...prev])
  }

  function deleteProduct(productId) {
    setProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const myListings = products.filter((p) => p.seller === CURRENT_USER)

  return (
    <ProductsContext.Provider value={{ products, addProduct, deleteProduct, myListings }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductsContext)
}