import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaTrashAlt, FaEdit } from 'react-icons/fa'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import {
  fetchProducts,
  refreshProducts,
  toggleLike,
  deleteProduct,
} from '../../features/products/productsSlice'
import { RootState } from '../../app/store'
import Button from '../ Button/Button'
import './ProductList.css'

const ITEMS_PER_PAGE = 4

const ProductList: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, loading, error } = useSelector((state: RootState) => state.products)

  const [showFavorites, setShowFavorites] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(fetchProducts() as any)
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  const handleLike = (id: string) => {
    dispatch(toggleLike(id))
  }

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id))
  }

  const handleRefresh = () => {
    dispatch(refreshProducts() as any)
    setCurrentPage(1)
  }

  const handleFilterToggle = () => {
    setShowFavorites(prev => !prev)
    setCurrentPage(1)
  }

  const filteredProducts = showFavorites
    ? products.filter(p => p.liked)
    : products

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  return (
    <div className="product-page">
      <div className="controls">
        <Button onClick={handleFilterToggle}>
          {showFavorites ? 'Показать все карточки' : 'Показать избранные'}
        </Button>
        <Button onClick={handleRefresh}>Обновить все карточки</Button>
        <Button onClick={() => navigate('/create-product')}>Создание карточки</Button>
      </div>

      {loading && <p className="loading-text">Загрузка...</p>}
      {error && <p className="error-text">Ошибка: {error}</p>}

      <div className="product-list">
        {paginatedProducts.map(product => (
          <div key={product.id} className="product-card">
            <Link
              to={`/products/${product.id}`}
              className="card-link"
              onClick={e => {
                
                if ((e.target as HTMLElement).closest('.actions')) {
                  e.preventDefault()
                }
              }}
            >
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="clamp-text">{product.description}</p>

            </Link>
            <div className="actions">
              <FaHeart
                onClick={() => handleLike(product.id)}
                className={`icon-button icon-like ${product.liked ? 'liked' : ''}`}
                title="Добавить в избранное"
              />
              <FaTrashAlt
                onClick={() => handleDelete(product.id)}
                className="icon-button icon-delete"
                title="Удалить карточку"
              />
              <Link to={`/edit-product/${product.id}`}>
              <FaEdit
                className="icon-button icon-edit"
                title="Редактировать"
              />
            </Link>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={1}
            />
          </Stack>
        </div>
      )}
    </div>
  )
}

export default ProductList
