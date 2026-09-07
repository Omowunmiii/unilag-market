import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('currentUser')
    if (saved) setCurrentUser(JSON.parse(saved))
  }, [])

  function signup({ name, email, password }) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    if (users.find((u) => u.email === email)) {
      throw new Error('An account with this email already exists.')
    }

    const newUser = { name, email, password }
    localStorage.setItem('users', JSON.stringify([...users, newUser]))

    const { password: _pw, ...safeUser } = newUser
    setCurrentUser(safeUser)
    localStorage.setItem('currentUser', JSON.stringify(safeUser))
  }

  function login({ email, password }) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const match = users.find((u) => u.email === email && u.password === password)

    if (!match) {
      throw new Error('Invalid email or password.')
    }

    const { password: _pw, ...safeUser } = match
    setCurrentUser(safeUser)
    localStorage.setItem('currentUser', JSON.stringify(safeUser))
  }

  function logout() {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}