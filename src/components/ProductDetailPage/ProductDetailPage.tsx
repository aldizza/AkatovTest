import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = useSelector((state: RootState) =>
    state.products.products.find(p => p.id === id)
  )

  if (!product) return <div>Котик не найден</div>

  return (
    <div style={{ padding: '1rem' }}>
      <img src={product.image} alt={product.title} style={{ width: '300px' }} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <button onClick={() => navigate('/')}>К списку котиков</button>
    </div>
  )
}

export default ProductDetail