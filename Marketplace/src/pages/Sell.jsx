import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import { categories } from '../data/products'

export default function Sell() {
  const { addProduct } = useProducts()
  const navigate = useNavigate()

  const sellableCategories = categories.filter((c) => c !== 'All')

  const [form, setForm] = useState({
    title: '',
    price: '',
    category: sellableCategories[0],
    department: '',
    description: '',
    contact: '',
  })
  const [imagePreview, setImagePreview] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()

    addProduct({
      ...form,
      price: Number(form.price),
      image: imagePreview || `https://placehold.co/400x400?text=${encodeURIComponent(form.title)}`,
    })

    navigate('/my-listings')
  }

  return (
    <div className="sell">
      <form onSubmit={handleSubmit}>
        <label className="image-upload-label">
          {imagePreview ? 'Change photo' : 'Upload a photo'}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload-input"
          />
        </label>

        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="image-preview" />
        )}

        <input
          type="text"
          name="title"
          placeholder="Item title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (₦)"
          value={form.price}
          onChange={handleChange}
          min="0"
          required
        />

        <select name="category" value={form.category} onChange={handleChange}>
          {sellableCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          name="department"
          placeholder="Department / Hall"
          value={form.department}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          required
        />

        <input
          type="tel"
          name="contact"
          placeholder="Phone number or WhatsApp"
          value={form.contact}
          onChange={handleChange}
          required
        />

        <button type="submit">Post Listing</button>
      </form>
    </div>
  )
}