import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const { currentUser } = useAuth()
  const [wishlist, setWishlist] = useState([])

  // Load this user's wishlist whenever they log in (or on refresh)
  useEffect(() => {
    if (currentUser) {
      const saved = localStorage.getItem(`wishlist_${currentUser.email}`)
      setWishlist(saved ? JSON.parse(saved) : [])
    } else {
      setWishlist([])
    }
  }, [currentUser])

  function saveWishlist(updated) {
    setWishlist(updated)
    if (currentUser) {
      localStorage.setItem(`wishlist_${currentUser.email}`, JSON.stringify(updated))
    }
  }

  function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
      saveWishlist(wishlist.filter((id) => id !== productId))
    } else {
      saveWishlist([...wishlist, productId])
    }
  }

  function isWishlisted(productId) {
    return wishlist.includes(productId)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}