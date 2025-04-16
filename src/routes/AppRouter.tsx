import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductList from '../components/ProductList/ProductList'
// import ProductDetail from '../components/ProductDetail'
// import CreateProduct from '../components/CreateProduct'

const AppRouter: React.FC = () => {
  return (
    <Routes>
  
      <Route path="/" element={<ProductList />} />
      
      <Route path="/products" element={<ProductList />} />
    </Routes>
  )
}

export default AppRouter
