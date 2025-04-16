import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaHeart, FaTrashAlt } from 'react-icons/fa'

import {
  toggleLike,
  deleteProduct,
  fetchProducts,
  refreshProducts,
} from '../../features/products/productsSlice'
import { RootState } from '../../app/store'

import './ProductList.css'
import Button from '../ Button/Button'
import { useNavigate } from 'react-router-dom'


const ProductList: React.FC = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state: RootState) => state.products)
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length])

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(toggleLike(id))
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(deleteProduct(id))
  }

  const handleFilterToggle = () => {
    setShowFavorites(!showFavorites)
  }

  const handleRefresh = () => {
    dispatch(refreshProducts())
  }


  const filteredProducts = showFavorites
    ? products.filter((product) => product.liked)
    : products

  const navigate = useNavigate()

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', padding: '0 20px' }}>
        <Button onClick={handleFilterToggle}>
          {showFavorites ? 'Показать все карточки' : 'Показать избранные'}
        </Button>
        <Button onClick={handleRefresh}>Обновить все карточки</Button>
        <Button onClick={() => navigate('/create-product')}>Создание карточки</Button>
      </div>

      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`} className="card-link">
              <img src={product.image} alt="cat" />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <div className="actions">
                <FaHeart
                  onClick={(e) => handleLike(e, product.id)}
                  className={`like-icon ${product.liked ? 'liked' : ''}`}
                />
                <FaTrashAlt
                  onClick={(e) => handleDelete(e, product.id)}
                  className="trash-icon"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
