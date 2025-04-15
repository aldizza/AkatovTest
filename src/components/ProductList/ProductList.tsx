import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../features/products/productsSlice'
import ProductCard from '../ProductCard/ProductCard'
import './ProductList.css'
import { RootState } from '../../../src/app/store'

const ProductList: React.FC = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state: RootState) => state.products)

  // Загружаем продукты при монтировании компонента
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          liked={product.liked}
        />
      ))}
    </div>
  )
}

export default ProductList
