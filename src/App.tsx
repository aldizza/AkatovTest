import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList'
import CreateProductPage from './components/CreateProductPage/CreateProductPage'
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/create-product" element={<CreateProductPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
    </Routes>
  )
}

export default App
