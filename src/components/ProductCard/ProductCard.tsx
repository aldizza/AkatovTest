import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleLike, deleteProduct } from '../../features/products/productsSlice'
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './ProductCard.css'

interface ProductCardProps {
  id: string
  image: string
  liked: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, liked }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(toggleLike(id)) 
  }

  const handleRemove = () => {
    dispatch(deleteProduct(id))  
  }

  return (
    <div className="product-card">
      <Link to={`/products/${id}`}>
        <img src={image} alt="Product" />
        <div className="description">
          Описание продукта...
        </div>
      </Link>
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
