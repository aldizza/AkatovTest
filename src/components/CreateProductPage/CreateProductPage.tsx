// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { addProduct } from '../../features/products/productsSlice'
// import { generateId } from '../../utils/generateId'
// import Button from '../ Button/Button'
// import './CreateProductPage.css'

// const CreateProduct: React.FC = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [image, setImage] = useState('')
//   const [error, setError] = useState('')

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!title.trim() || !description.trim() || !image.trim()) {
//       setError('Требуется заполнить все поля')
//       return
//     }

//     dispatch(
//       addProduct({
//         id: generateId(),
//         title,
//         description,
//         image,
//         liked: false,
//       })
//     )
//     navigate('/products/:id')
//   }

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Создание новой карточки</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//         /><br />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//         /><br />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={image}
//           onChange={e => setImage(e.target.value)}
//         /><br />
//         <Button type="submit">Create</Button>
//       </form>
//     </div>
//   )
// }

// export default CreateProduct


import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../../features/products/productsSlice'
import { generateId } from '../../utils/generateId'
import './CreateProductPage.css'
import Button from '../ Button/Button'

const CreateProductPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    image: '',
  })

  const validate = () => {
    const newErrors = {
      title: '',
      description: '',
      image: '',
    }
    let isValid = true

    if (!title.trim()) {
      newErrors.title = 'Введите заголовок'
      isValid = false
    }

    if (!description.trim()) {
      newErrors.description = 'Введите описание'
      isValid = false
    }

    if (!image.trim()) {
      newErrors.image = 'Введите ссылку на изображение'
      isValid = false
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(image)) {
      newErrors.image = 'Введите корректную ссылку на изображение'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

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
    <div className="create-form-container">
      <h2>Создание карточки</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Заголовок</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="error-text">{errors.title}</p>}

        <label htmlFor="description">Описание</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="error-text">{errors.description}</p>}

        <label htmlFor="image">Ссылка на изображение</label>
        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {errors.image && <p className="error-text">{errors.image}</p>}

        <Button type="submit">Создать</Button>
      </form>
    </div>
  )
}

export default CreateProductPage
