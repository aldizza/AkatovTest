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

  const fallbackFromLocalStorage = () => {
    const stored = localStorage.getItem('allProducts')
    if (!stored) return null
    const parsed = JSON.parse(stored)
    return parsed.find((p: any) => p.id === id)
  }

  const actualProduct = product || fallbackFromLocalStorage()

  if (!actualProduct) return <div>Котик не найден</div>

  return (
    <div style={{ padding: '1rem' }}>
      <img src={actualProduct.image} alt={actualProduct.title} style={{ width: '300px' }} />
      <h2>{actualProduct.title}</h2>
      <p>{actualProduct.description}</p>
      <button onClick={() => navigate('/products')}>К списку карточек</button>
    </div>
  )
}

export default ProductDetail
