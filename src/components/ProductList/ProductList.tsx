import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaHeart, FaTrashAlt } from 'react-icons/fa'
import './ProductList.css'

import {
  toggleLike,
  deleteProduct,
  fetchProducts,
} from '../../features/products/productsSlice'
import { RootState } from '../../app/store'

const ProductList: React.FC = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state: RootState) => state.products)
  const [showFavorites, setShowFavorites] = React.useState(false)

  useEffect(() => {
    dispatch(fetchProducts() as any)
  }, [dispatch])

  const handleLike = (id: string) => {
    dispatch(toggleLike(id))
  }

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id))
  }

  const handleFilterToggle = () => {
    setShowFavorites(!showFavorites)
  }

  const filteredProducts = showFavorites
    ? products.filter((product) => product.liked)
    : products

  return (
    <div>
      <button onClick={handleFilterToggle}>
        {showFavorites ? 'Показать все' : 'Показать избранные'}
      </button>

      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`} className="card-link">
              <img src={product.image} alt="cat" />
              <h3>Котик id {product.id}</h3>
              <p>Пушистый комочек счастья, который принесет радость в ваш дом</p>
            </Link>
            <div className="actions">
              
            <FaHeart
              className={`like-icon ${product.liked ? 'liked' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                handleLike(product.id)
                }}
            />
            <FaTrashAlt
              className="trash-icon"
              onClick={() => handleDelete(product.id)}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList

