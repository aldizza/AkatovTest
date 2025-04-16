import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList'
import CreateProductPage from './components/CreateProductPage/CreateProductPage'
import ProductPage from './components/ProductPage/ProductPage'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/create-product" element={<CreateProductPage />} />
      <Route path="/products/:id" element={<ProductPage />} />
    </Routes>
  )
}

export default App
