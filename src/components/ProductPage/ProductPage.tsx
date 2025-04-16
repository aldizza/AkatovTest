import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import Button from '../ Button/Button'
import './ProductPage.css'

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
    <div className="detail-container">
      <img src={actualProduct.image} alt={actualProduct.title} style={{ width: '300px' }} />
      <h2>{actualProduct.title}</h2>
      <p>{actualProduct.description}</p>
      <Button onClick={() => navigate('/products')}>К списку карточек</Button>
    </div>
  )
}

export default ProductDetail
