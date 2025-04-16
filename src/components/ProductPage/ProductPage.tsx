import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const product = useSelector((state: RootState) =>
    state.products.products.find(p => p.id === id)
  )

  if (!product) return <div>Продукт не найден</div>

  return (
    <div>
      <h1>Детали продукта</h1>
      <img src={product.image} alt="Product" />
      <div>Liked: {product.liked ? 'Yes' : 'No'}</div>
      <Link to="/">К списку котиков</Link>
    </div>
  )
}

export default ProductPage
