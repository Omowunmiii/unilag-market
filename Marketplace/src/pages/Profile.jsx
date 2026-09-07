import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="profile">
      <h1>My Profile</h1>

      <div className="profile-card">
        <p><strong>Name:</strong> {currentUser.name}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Log Out</button>
    </div>
  )
}