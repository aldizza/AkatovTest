import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: string
  image: string
  liked: boolean
  title: string
  description: string
}

interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
  initialized: boolean
}

const PRODUCTS_KEY = 'allProducts'

const saveProductsToLocalStorage = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

const loadProductsFromLocalStorage = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY)
  return data ? JSON.parse(data) : []
}

// Первичная загрузка
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
  const data = await response.json()
  return data.map((item: any, index: number) => ({
    id: item.id,
    image: item.url,
    liked: false,
    title: `Котик id ${item.id}`,
    description: `Милый котик принесет радость и удачу в ваш дом. Кошки, которых любят, приносят счастье.`,
  }))
})

// Принудительное обновление карточек
export const refreshProducts = createAsyncThunk('products/refreshProducts', async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
  const data = await response.json()
  return data.map((item: any, index: number) => ({
    id: item.id,
    image: item.url,
    liked: false,
    title: `Котик id ${item.id}`,
    description: `Милый котик принесет радость и удачу в ваш дом. Кошки, которых любят, приносят счастье.`,
  }))
})

const initialState: ProductsState = {
  products: loadProductsFromLocalStorage(),
  loading: false,
  error: null,
  initialized: false,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload)
      if (product) {
        product.liked = !product.liked
        saveProductsToLocalStorage(state.products)
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
      saveProductsToLocalStorage(state.products)
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload)
      saveProductsToLocalStorage(state.products)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (!state.initialized) {
          state.products = action.payload
          state.initialized = true
          saveProductsToLocalStorage(state.products)
        }
      })
      .addCase(refreshProducts.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(refreshProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.loading = false
        saveProductsToLocalStorage(state.products)
      })
      .addCase(refreshProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to refresh products'
      })
  },
})

export const { toggleLike, deleteProduct, addProduct } = productsSlice.actions
export default productsSlice.reducer

