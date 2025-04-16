import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../../features/products/productsSlice'
import { generateId } from '../../utils/generateId'

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !image.trim()) {
      setError('Требуется заполнить все поля')
      return
    }

    dispatch(
      addProduct({
        id: generateId(),
        title,
        description,
        image,
        liked: false,
      })
    )
    navigate('/products')
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Создание продукта</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
        /><br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateProduct
