import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleLike, removeProduct } from '../../features/products/productsSlice' 
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa'
import './ProductCard.css'

interface ProductCardProps {
  id: string
  image: string
  liked: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, liked }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(toggleLike(id))  // Изменяем состояние лайка
  }

  const handleRemove = () => {
    dispatch(removeProduct(id))  // Удаляем продукт
  }

  return (
    <div className="product-card">
      <img src={image} alt="Product" />
      <div className="buttons">
        
        <button onClick={handleLike} className={`like ${liked ? 'liked' : ''}`}>
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>

        
        <button onClick={handleRemove} className="remove">
          <FaTrash /> 
        </button>
      </div>
    </div>
  )
}

export default ProductCard
