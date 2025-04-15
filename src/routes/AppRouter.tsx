import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductList from '../components/ProductList/ProductList'
// import ProductDetail from '../components/ProductDetail'  // Если есть, например, страница для подробного просмотра продукта
// import CreateProduct from '../components/CreateProduct'  // Если есть, например, страница создания продукта

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Маршрут для главной страницы */}
      <Route path="/" element={<ProductList />} />
      
      {/* Другие маршруты */}
      <Route path="/products" element={<ProductList />} />
    </Routes>
  )
}

export default AppRouter
